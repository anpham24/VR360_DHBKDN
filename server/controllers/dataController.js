const db = require('../config/db');

/**
 * Chuyển một dòng hotspot (snake_case) sang dạng camelCase mà frontend dùng,
 * lược bỏ các trường null để gọn nhẹ.
 */
function mapHotspot(h) {
  const out = {
    hotspotId: h.hotspot_id,
    sceneId: h.scene_id,
    type: h.type,
    yaw: Number(h.yaw),
    pitch: Number(h.pitch)
  };
  if (h.label != null) out.label = h.label;
  if (h.icon != null) out.icon = h.icon;
  if (h.target_scene_id != null) out.targetSceneId = h.target_scene_id;
  if (h.target_yaw != null) out.targetYaw = Number(h.target_yaw);
  if (h.target_pitch != null) out.targetPitch = Number(h.target_pitch);
  if (h.info_title != null) out.infoTitle = h.info_title;
  if (h.info_content != null) out.infoContent = h.info_content;
  if (h.info_image != null) out.infoImage = h.info_image;
  if (h.info_url != null) out.infoUrl = h.info_url;
  return out;
}

module.exports = {
  /**
   * GET /api/data — Trả về toàn bộ dữ liệu tour (tour + locations + scenes + hotspots)
   * theo đúng cấu trúc mà viewer cần để render.
   */
  async getAll(req, res) {
    try {
      const [tours] = await db.query('SELECT * FROM tours ORDER BY created_at LIMIT 1');
      const tour = tours[0];
      if (!tour) return res.json({ tour: null, locations: [], scenes: [] });

      const [locations] = await db.query(
        'SELECT * FROM locations WHERE tour_id = ? ORDER BY order_index', [tour.tour_id]
      );
      const [scenes] = await db.query('SELECT * FROM scenes ORDER BY order_index');
      const [hotspots] = await db.query('SELECT * FROM hotspots');

      // Đếm số scene mỗi khu vực → quyết định hasScenes (marker sáng/mờ)
      const sceneCount = {};
      scenes.forEach(s => { sceneCount[s.location_id] = (sceneCount[s.location_id] || 0) + 1; });

      // Gom hotspot theo scene
      const hsByScene = {};
      hotspots.forEach(h => {
        (hsByScene[h.scene_id] = hsByScene[h.scene_id] || []).push(mapHotspot(h));
      });

      res.json({
        tour: {
          tourId: tour.tour_id,
          name: tour.name,
          description: tour.description,
          campusImage: tour.campus_image
        },
        locations: locations.map(l => ({
          locationId: l.location_id,
          tourId: l.tour_id,
          name: l.name,
          description: l.description,
          posX: Number(l.pos_x),
          posY: Number(l.pos_y),
          startSceneIndex: l.start_scene_index || 0,
          hasScenes: (sceneCount[l.location_id] || 0) > 0
        })),
        scenes: scenes.map(s => {
          const scene = {
            sceneId: s.scene_id,
            locationId: s.location_id,
            title: s.title,
            imageUrl: s.image_url,
            defaultYaw: Number(s.default_yaw),
            defaultPitch: Number(s.default_pitch),
            defaultHfov: Number(s.default_hfov),
            hotspots: hsByScene[s.scene_id] || []
          };
          if (s.thumbnail != null) scene.thumbnail = s.thumbnail;
          if (s.haov != null) scene.haov = Number(s.haov);
          if (s.vaov != null) scene.vaov = Number(s.vaov);
          if (s.v_offset != null) scene.vOffset = Number(s.v_offset);
          return scene;
        })
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

const db = require('../config/db');

const Hotspot = {
  async getAll() {
    const [rows] = await db.query('SELECT * FROM hotspots ORDER BY created_at DESC');
    return rows;
  },

  async getById(hotspotId) {
    const [rows] = await db.query('SELECT * FROM hotspots WHERE hotspot_id = ?', [hotspotId]);
    return rows[0] || null;
  },

  async getBySceneId(sceneId) {
    const [rows] = await db.query('SELECT * FROM hotspots WHERE scene_id = ?', [sceneId]);
    return rows;
  },

  async create(data) {
    const {
      hotspot_id, scene_id, type, yaw, pitch, label, icon,
      target_scene_id, target_yaw, target_pitch,
      info_title, info_content, info_image, info_url
    } = data;
    await db.query(
      `INSERT INTO hotspots (hotspot_id, scene_id, type, yaw, pitch, label, icon,
        target_scene_id, target_yaw, target_pitch,
        info_title, info_content, info_image, info_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [hotspot_id, scene_id, type, yaw, pitch, label, icon,
       target_scene_id, target_yaw, target_pitch,
       info_title, info_content, info_image, info_url]
    );
    return this.getById(hotspot_id);
  },

  async update(hotspotId, data) {
    const fields = Object.keys(data).map(k => `${k} = ?`).join(', ');
    const values = Object.values(data);
    await db.query(`UPDATE hotspots SET ${fields} WHERE hotspot_id = ?`, [...values, hotspotId]);
    return this.getById(hotspotId);
  },

  async delete(hotspotId) {
    await db.query('DELETE FROM hotspots WHERE hotspot_id = ?', [hotspotId]);
  }
};

module.exports = Hotspot;

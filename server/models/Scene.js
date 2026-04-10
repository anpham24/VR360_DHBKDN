const db = require('../config/db');

const Scene = {
  async getAll() {
    const [rows] = await db.query('SELECT * FROM scenes ORDER BY order_index');
    return rows;
  },

  async getById(sceneId) {
    const [rows] = await db.query('SELECT * FROM scenes WHERE scene_id = ?', [sceneId]);
    return rows[0] || null;
  },

  async getWithHotspots(sceneId) {
    const scene = await this.getById(sceneId);
    if (!scene) return null;
    const [hotspots] = await db.query('SELECT * FROM hotspots WHERE scene_id = ?', [sceneId]);
    return { ...scene, hotspots };
  },

  async create(data) {
    const { scene_id, location_id, title, image_url, thumbnail, default_yaw, default_pitch, default_hfov, order_index } = data;
    await db.query(
      'INSERT INTO scenes (scene_id, location_id, title, image_url, thumbnail, default_yaw, default_pitch, default_hfov, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [scene_id, location_id, title, image_url, thumbnail, default_yaw || 0, default_pitch || 0, default_hfov || 100, order_index || 0]
    );
    return this.getById(scene_id);
  },

  async update(sceneId, data) {
    const fields = Object.keys(data).map(k => `${k} = ?`).join(', ');
    const values = Object.values(data);
    await db.query(`UPDATE scenes SET ${fields} WHERE scene_id = ?`, [...values, sceneId]);
    return this.getById(sceneId);
  },

  async delete(sceneId) {
    await db.query('DELETE FROM hotspots WHERE scene_id = ?', [sceneId]);
    await db.query('DELETE FROM scenes WHERE scene_id = ?', [sceneId]);
  }
};

module.exports = Scene;

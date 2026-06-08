const db = require('../config/db');

const Location = {
  async getAll() {
    const [rows] = await db.query('SELECT * FROM locations ORDER BY order_index');
    return rows;
  },

  async getById(locationId) {
    const [rows] = await db.query('SELECT * FROM locations WHERE location_id = ?', [locationId]);
    return rows[0] || null;
  },

  async getWithScenes(locationId) {
    const location = await this.getById(locationId);
    if (!location) return null;
    const [scenes] = await db.query('SELECT * FROM scenes WHERE location_id = ? ORDER BY order_index', [locationId]);
    return { ...location, scenes };
  },

  async create(data) {
    const { location_id, tour_id, name, description, pos_x, pos_y, start_scene_index, order_index } = data;
    await db.query(
      'INSERT INTO locations (location_id, tour_id, name, description, pos_x, pos_y, start_scene_index, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [location_id, tour_id, name, description || null, pos_x ?? 50, pos_y ?? 50, start_scene_index || 0, order_index || 0]
    );
    return this.getById(location_id);
  },

  async update(locationId, data) {
    const fields = Object.keys(data).map(k => `${k} = ?`).join(', ');
    const values = Object.values(data);
    await db.query(`UPDATE locations SET ${fields} WHERE location_id = ?`, [...values, locationId]);
    return this.getById(locationId);
  },

  async delete(locationId) {
    await db.query('DELETE FROM hotspots WHERE scene_id IN (SELECT scene_id FROM scenes WHERE location_id = ?)', [locationId]);
    await db.query('DELETE FROM scenes WHERE location_id = ?', [locationId]);
    await db.query('DELETE FROM locations WHERE location_id = ?', [locationId]);
  }
};

module.exports = Location;

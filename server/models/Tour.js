const db = require('../config/db');

const Tour = {
  async getAll() {
    const [rows] = await db.query('SELECT * FROM tours ORDER BY created_at DESC');
    return rows;
  },

  async getById(tourId) {
    const [rows] = await db.query('SELECT * FROM tours WHERE tour_id = ?', [tourId]);
    return rows[0] || null;
  },

  async getWithLocations(tourId) {
    const tour = await this.getById(tourId);
    if (!tour) return null;
    const [locations] = await db.query('SELECT * FROM locations WHERE tour_id = ? ORDER BY order_index', [tourId]);
    return { ...tour, locations };
  },

  async create(data) {
    const { tour_id, name, description, campus_image, default_scene_id } = data;
    await db.query(
      'INSERT INTO tours (tour_id, name, description, campus_image, default_scene_id) VALUES (?, ?, ?, ?, ?)',
      [tour_id, name, description || null, campus_image || null, default_scene_id || null]
    );
    return this.getById(tour_id);
  },

  async update(tourId, data) {
    const fields = Object.keys(data).map(k => `${k} = ?`).join(', ');
    const values = Object.values(data);
    await db.query(`UPDATE tours SET ${fields}, updated_at = NOW() WHERE tour_id = ?`, [...values, tourId]);
    return this.getById(tourId);
  },

  async delete(tourId) {
    await db.query('DELETE FROM tours WHERE tour_id = ?', [tourId]);
  }
};

module.exports = Tour;

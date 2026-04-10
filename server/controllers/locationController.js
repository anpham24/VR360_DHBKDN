const Location = require('../models/Location');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async getById(req, res) {
    try {
      const location = await Location.getWithScenes(req.params.id);
      if (!location) return res.status(404).json({ message: 'Khu vực không tồn tại' });
      res.json(location);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const data = { ...req.body, location_id: uuidv4() };
      const location = await Location.create(data);
      res.status(201).json(location);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const location = await Location.update(req.params.id, req.body);
      res.json(location);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await Location.delete(req.params.id);
      res.json({ message: 'Đã xóa khu vực' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

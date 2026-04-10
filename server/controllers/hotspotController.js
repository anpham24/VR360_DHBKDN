const Hotspot = require('../models/Hotspot');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async create(req, res) {
    try {
      const data = { ...req.body, hotspot_id: uuidv4() };
      const hotspot = await Hotspot.create(data);
      res.status(201).json(hotspot);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const hotspot = await Hotspot.update(req.params.id, req.body);
      res.json(hotspot);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await Hotspot.delete(req.params.id);
      res.json({ message: 'Đã xóa hotspot' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

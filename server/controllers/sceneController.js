const Scene = require('../models/Scene');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async getById(req, res) {
    try {
      const scene = await Scene.getWithHotspots(req.params.id);
      if (!scene) return res.status(404).json({ message: 'Scene không tồn tại' });
      res.json(scene);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const data = { ...req.body, scene_id: uuidv4() };
      const scene = await Scene.create(data);
      res.status(201).json(scene);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const scene = await Scene.update(req.params.id, req.body);
      res.json(scene);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await Scene.delete(req.params.id);
      res.json({ message: 'Đã xóa scene' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

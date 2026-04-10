const Tour = require('../models/Tour');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async getAll(req, res) {
    try {
      const tours = await Tour.getAll();
      res.json(tours);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const tour = await Tour.getWithLocations(req.params.id);
      if (!tour) return res.status(404).json({ message: 'Tour không tồn tại' });
      res.json(tour);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async create(req, res) {
    try {
      const data = { ...req.body, tour_id: uuidv4() };
      const tour = await Tour.create(data);
      res.status(201).json(tour);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const tour = await Tour.update(req.params.id, req.body);
      res.json(tour);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await Tour.delete(req.params.id);
      res.json({ message: 'Đã xóa tour' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

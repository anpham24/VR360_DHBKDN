/**
 * Store — Nguồn dữ liệu của viewer, lấy từ API (database) thay cho file tĩnh.
 * Cung cấp các phương thức giống SampleData cũ để phần còn lại của app dùng lại.
 */
const Store = {
  tour: null,
  locations: [],
  scenes: [],

  async load() {
    const data = await API.getData();
    this.tour = data.tour;
    this.locations = data.locations || [];
    this.scenes = data.scenes || [];
    return data;
  },

  getSceneById(sceneId) {
    return this.scenes.find(s => s.sceneId === sceneId) || null;
  },

  getLocationById(locationId) {
    return this.locations.find(l => l.locationId === locationId) || null;
  },

  getScenesForLocation(locationId) {
    return this.scenes.filter(s => s.locationId === locationId);
  }
};

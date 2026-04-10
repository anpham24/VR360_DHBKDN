/**
 * API wrapper — gọi backend REST API
 * Phase 1-2: dùng sampleData.js (JSON tĩnh)
 * Phase 3+: chuyển sang gọi API thật
 */
const API = {
  baseUrl: CONFIG.API_BASE_URL,

  async _fetch(endpoint, options = {}) {
    const token = localStorage.getItem('jwt_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    };

    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, { ...options, headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err);
      throw err;
    }
  },

  // ===== PUBLIC =====
  getTours()             { return this._fetch('/tours'); },
  getTour(id)            { return this._fetch(`/tours/${id}`); },
  getLocation(id)        { return this._fetch(`/locations/${id}`); },
  getScene(id)           { return this._fetch(`/scenes/${id}`); },

  // ===== ADMIN AUTH =====
  login(username, password) {
    return this._fetch('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  },

  // ===== ADMIN CRUD =====
  getDashboard()         { return this._fetch('/admin/dashboard'); },

  createTour(data)       { return this._fetch('/admin/tours', { method: 'POST', body: JSON.stringify(data) }); },
  updateTour(id, data)   { return this._fetch(`/admin/tours/${id}`, { method: 'PUT', body: JSON.stringify(data) }); },
  deleteTour(id)         { return this._fetch(`/admin/tours/${id}`, { method: 'DELETE' }); },

  createLocation(data)   { return this._fetch('/admin/locations', { method: 'POST', body: JSON.stringify(data) }); },
  updateLocation(id, d)  { return this._fetch(`/admin/locations/${id}`, { method: 'PUT', body: JSON.stringify(d) }); },
  deleteLocation(id)     { return this._fetch(`/admin/locations/${id}`, { method: 'DELETE' }); },

  createScene(data)      { return this._fetch('/admin/scenes', { method: 'POST', body: JSON.stringify(data) }); },
  updateScene(id, data)  { return this._fetch(`/admin/scenes/${id}`, { method: 'PUT', body: JSON.stringify(data) }); },
  deleteScene(id)        { return this._fetch(`/admin/scenes/${id}`, { method: 'DELETE' }); },

  createHotspot(data)    { return this._fetch('/admin/hotspots', { method: 'POST', body: JSON.stringify(data) }); },
  updateHotspot(id, d)   { return this._fetch(`/admin/hotspots/${id}`, { method: 'PUT', body: JSON.stringify(d) }); },
  deleteHotspot(id)      { return this._fetch(`/admin/hotspots/${id}`, { method: 'DELETE' }); },

  // Upload dùng FormData, không dùng JSON
  async uploadPanorama(file) {
    const formData = new FormData();
    formData.append('panorama', file);
    const token = localStorage.getItem('jwt_token');
    const res = await fetch(`${this.baseUrl}/admin/upload/panorama`, {
      method: 'POST',
      headers: { ...(token && { 'Authorization': `Bearer ${token}` }) },
      body: formData
    });
    return await res.json();
  }
};

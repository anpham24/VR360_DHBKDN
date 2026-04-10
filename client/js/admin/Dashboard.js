/**
 * Dashboard — Trang thống kê tổng quan admin
 */
const Dashboard = {
  async render(container) {
    container.innerHTML = `
      <div class="toolbar">
        <h2>Dashboard</h2>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Tours</h3>
          <div class="stat-number" id="stat-tours">--</div>
        </div>
        <div class="stat-card">
          <h3>Khu vực</h3>
          <div class="stat-number" id="stat-locations">--</div>
        </div>
        <div class="stat-card">
          <h3>Scenes</h3>
          <div class="stat-number" id="stat-scenes">--</div>
        </div>
        <div class="stat-card">
          <h3>Hotspots</h3>
          <div class="stat-number" id="stat-hotspots">--</div>
        </div>
      </div>

      <div class="admin-table">
        <h3 style="padding: 16px;">Hướng dẫn nhanh</h3>
        <div style="padding: 0 16px 16px;">
          <p>1. Tạo <strong>Tour</strong> → 2. Thêm <strong>Khu vực</strong> → 3. Upload <strong>Scene</strong> (ảnh 360) → 4. Gắn <strong>Hotspot</strong></p>
        </div>
      </div>
    `;

    this._loadStats();
  },

  async _loadStats() {
    try {
      const stats = await API.getDashboard();
      Helpers.$('#stat-tours').textContent = stats.tours || 0;
      Helpers.$('#stat-locations').textContent = stats.locations || 0;
      Helpers.$('#stat-scenes').textContent = stats.scenes || 0;
      Helpers.$('#stat-hotspots').textContent = stats.hotspots || 0;
    } catch {
      // TODO: Phase 3 — kết nối API
    }
  }
};

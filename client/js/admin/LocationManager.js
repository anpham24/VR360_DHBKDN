/**
 * LocationManager — CRUD quản lý khu vực + đặt marker trên bản đồ
 */
const LocationManager = {
  render(container) {
    container.innerHTML = `
      <div class="toolbar">
        <h2>Quản lý Khu vực</h2>
        <button class="btn-primary" id="btn-add-location">+ Thêm Khu vực</button>
      </div>

      <div class="admin-table">
        <table>
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Mô tả</th>
              <th>Tọa độ</th>
              <th>Scenes</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody id="location-table-body">
            <tr><td colspan="6" style="text-align:center;padding:24px;">Đang tải...</td></tr>
          </tbody>
        </table>
      </div>
    `;

    this._bindEvents();
    this._loadLocations();
  },

  _bindEvents() {
    Helpers.$('#btn-add-location')?.addEventListener('click', () => {
      // TODO: Mở modal thêm location kèm bản đồ chọn vị trí
      Helpers.toast('Chức năng thêm khu vực — sẽ hoàn thiện ở Phase 4', 'warning');
    });
  },

  async _loadLocations() {
    // TODO: Phase 3 — gọi API
    const tbody = Helpers.$('#location-table-body');
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:24px;">Chưa kết nối API</td></tr>';
  }
};

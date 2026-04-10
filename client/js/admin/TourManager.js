/**
 * TourManager — CRUD quản lý tour
 */
const TourManager = {
  render(container) {
    container.innerHTML = `
      <div class="toolbar">
        <h2>Quản lý Tour</h2>
        <button class="btn-primary" id="btn-add-tour">+ Thêm Tour</button>
      </div>

      <div class="admin-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên tour</th>
              <th>Mô tả</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody id="tour-table-body">
            <tr><td colspan="5" style="text-align:center;padding:24px;">Đang tải...</td></tr>
          </tbody>
        </table>
      </div>
    `;

    this._bindEvents();
    this._loadTours();
  },

  _bindEvents() {
    Helpers.$('#btn-add-tour')?.addEventListener('click', () => {
      // TODO: Mở modal thêm tour
      Helpers.toast('Chức năng thêm tour — sẽ hoàn thiện ở Phase 4', 'warning');
    });
  },

  async _loadTours() {
    // TODO: Phase 3 — gọi API.getTours()
    const tbody = Helpers.$('#tour-table-body');
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:24px;">Chưa kết nối API</td></tr>';
  }
};

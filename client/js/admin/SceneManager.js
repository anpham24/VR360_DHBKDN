/**
 * SceneManager — CRUD quản lý scene + upload ảnh 360
 */
const SceneManager = {
  render(container) {
    container.innerHTML = `
      <div class="toolbar">
        <h2>Quản lý Scene (Ảnh 360°)</h2>
        <button class="btn-primary" id="btn-add-scene">+ Thêm Scene</button>
      </div>

      <div class="admin-table">
        <table>
          <thead>
            <tr>
              <th>Preview</th>
              <th>Tên scene</th>
              <th>Khu vực</th>
              <th>Hotspots</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody id="scene-table-body">
            <tr><td colspan="5" style="text-align:center;padding:24px;">Đang tải...</td></tr>
          </tbody>
        </table>
      </div>
    `;

    this._bindEvents();
    this._loadScenes();
  },

  _bindEvents() {
    Helpers.$('#btn-add-scene')?.addEventListener('click', () => {
      // TODO: Modal thêm scene + upload ảnh 360
      Helpers.toast('Chức năng thêm scene — sẽ hoàn thiện ở Phase 4', 'warning');
    });
  },

  async _loadScenes() {
    // TODO: Phase 3 — gọi API
    const tbody = Helpers.$('#scene-table-body');
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:24px;">Chưa kết nối API</td></tr>';
  }
};

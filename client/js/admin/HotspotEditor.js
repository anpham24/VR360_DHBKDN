/**
 * HotspotEditor — Tạo/sửa hotspot bằng cách click lên VR360 preview
 */
const HotspotEditor = {
  previewViewer: null,

  render(container) {
    container.innerHTML = `
      <div class="toolbar">
        <h2>Quản lý Hotspot</h2>
      </div>

      <p style="margin-bottom:16px;color:var(--text-light);">
        Chọn scene → Click lên ảnh 360° để lấy tọa độ → Nhập thông tin hotspot → Lưu
      </p>

      <div class="form-group">
        <label>Chọn Scene</label>
        <select id="hotspot-scene-select">
          <option value="">-- Chọn scene --</option>
        </select>
      </div>

      <div id="hotspot-preview" style="width:100%;height:400px;border-radius:8px;overflow:hidden;background:#000;margin-bottom:16px;"></div>

      <div id="hotspot-form" class="hidden">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div class="form-group">
            <label>Yaw (ngang)</label>
            <input type="number" id="hs-yaw" step="0.1" readonly>
          </div>
          <div class="form-group">
            <label>Pitch (dọc)</label>
            <input type="number" id="hs-pitch" step="0.1" readonly>
          </div>
        </div>
        <div class="form-group">
          <label>Loại hotspot</label>
          <select id="hs-type">
            <option value="nav">Navigation (chuyển scene)</option>
            <option value="info">Information (hiển thị thông tin)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Label</label>
          <input type="text" id="hs-label" placeholder="Tên hiển thị khi hover">
        </div>

        <div id="nav-fields">
          <div class="form-group">
            <label>Scene đích</label>
            <select id="hs-target-scene">
              <option value="">-- Chọn scene đích --</option>
            </select>
          </div>
        </div>

        <div id="info-fields" class="hidden">
          <div class="form-group">
            <label>Tiêu đề popup</label>
            <input type="text" id="hs-info-title" placeholder="Tiêu đề">
          </div>
          <div class="form-group">
            <label>Nội dung</label>
            <textarea id="hs-info-content" rows="3" placeholder="Nội dung thông tin"></textarea>
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn-primary" id="btn-save-hotspot">Lưu Hotspot</button>
        </div>
      </div>

      <div class="admin-table" style="margin-top:24px;">
        <h3 style="padding:16px;">Danh sách Hotspot</h3>
        <table>
          <thead>
            <tr>
              <th>Label</th>
              <th>Loại</th>
              <th>Yaw</th>
              <th>Pitch</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody id="hotspot-table-body">
            <tr><td colspan="5" style="text-align:center;padding:24px;">Chọn scene để xem hotspot</td></tr>
          </tbody>
        </table>
      </div>
    `;

    this._bindEvents();
  },

  _bindEvents() {
    Helpers.$('#hs-type')?.addEventListener('change', (e) => {
      const isNav = e.target.value === 'nav';
      isNav ? Helpers.show('#nav-fields') : Helpers.hide('#nav-fields');
      isNav ? Helpers.hide('#info-fields') : Helpers.show('#info-fields');
    });

    Helpers.$('#btn-save-hotspot')?.addEventListener('click', () => {
      // TODO: Phase 4 — lưu hotspot qua API
      Helpers.toast('Chức năng lưu hotspot — sẽ hoàn thiện ở Phase 4', 'warning');
    });
  }
};

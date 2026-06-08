/**
 * LocationManager — CRUD quản lý khu vực (marker trên bản đồ campus)
 */
const LocationManager = {
  _tourId: null,
  _scenes: [],

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
              <th>Tên</th>
              <th>Mô tả</th>
              <th>Vị trí (X%, Y%)</th>
              <th>Số scene</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody id="location-table-body">
            <tr><td colspan="5" style="text-align:center;padding:24px;">Đang tải...</td></tr>
          </tbody>
        </table>
      </div>
    `;

    Helpers.$('#btn-add-location')?.addEventListener('click', () => this._openForm());
    this._loadLocations();
  },

  async _loadLocations() {
    const tbody = Helpers.$('#location-table-body');
    try {
      const data = await API.getData();
      this._tourId = data.tour?.tourId || null;
      this._scenes = data.scenes || [];

      if (!data.locations.length) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:24px;">Chưa có khu vực nào</td></tr>';
        return;
      }

      tbody.innerHTML = data.locations.map(l => {
        const sceneCount = this._scenes.filter(s => s.locationId === l.locationId).length;
        return `
          <tr>
            <td><strong>${l.name}</strong></td>
            <td>${l.description || ''}</td>
            <td>${l.posX}%, ${l.posY}%</td>
            <td>${sceneCount}</td>
            <td>
              <button class="btn-sm" data-edit="${l.locationId}">Sửa</button>
              <button class="btn-sm btn-danger" data-del="${l.locationId}">Xóa</button>
            </td>
          </tr>`;
      }).join('');

      tbody.querySelectorAll('[data-edit]').forEach(b =>
        b.addEventListener('click', () => {
          const loc = data.locations.find(x => x.locationId === b.dataset.edit);
          this._openForm(loc);
        }));
      tbody.querySelectorAll('[data-del]').forEach(b =>
        b.addEventListener('click', () => this._delete(b.dataset.del)));
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:24px;color:red;">Lỗi tải dữ liệu: ${err.message}</td></tr>`;
    }
  },

  _openForm(loc = null) {
    const isEdit = !!loc;
    const overlay = Helpers.openModal(isEdit ? 'Sửa Khu vực' : 'Thêm Khu vực', `
      <div class="form-group">
        <label>Tên khu vực *</label>
        <input type="text" id="loc-name" value="${loc?.name || ''}" placeholder="VD: Khu A">
      </div>
      <div class="form-group">
        <label>Mô tả</label>
        <textarea id="loc-desc" rows="2">${loc?.description || ''}</textarea>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div class="form-group">
          <label>Vị trí X (% chiều ngang ảnh)</label>
          <input type="number" id="loc-posx" step="0.1" value="${loc?.posX ?? 50}">
        </div>
        <div class="form-group">
          <label>Vị trí Y (% chiều dọc ảnh)</label>
          <input type="number" id="loc-posy" step="0.1" value="${loc?.posY ?? 50}">
        </div>
      </div>
      <div class="modal-actions" style="text-align:right;margin-top:12px;">
        <button class="btn-primary" id="loc-save">${isEdit ? 'Cập nhật' : 'Thêm'}</button>
      </div>
    `);

    overlay.querySelector('#loc-save').addEventListener('click', async () => {
      const payload = {
        name: overlay.querySelector('#loc-name').value.trim(),
        description: overlay.querySelector('#loc-desc').value.trim(),
        pos_x: parseFloat(overlay.querySelector('#loc-posx').value) || 0,
        pos_y: parseFloat(overlay.querySelector('#loc-posy').value) || 0
      };
      if (!payload.name) { Helpers.toast('Vui lòng nhập tên khu vực', 'warning'); return; }

      try {
        if (isEdit) {
          await API.updateLocation(loc.locationId, payload);
          Helpers.toast('Đã cập nhật khu vực');
        } else {
          payload.tour_id = this._tourId;
          await API.createLocation(payload);
          Helpers.toast('Đã thêm khu vực');
        }
        overlay.remove();
        this._loadLocations();
      } catch (err) {
        Helpers.toast('Lỗi: ' + err.message, 'error');
      }
    });
  },

  async _delete(id) {
    if (!confirm('Xóa khu vực này sẽ xóa luôn các scene và hotspot bên trong. Tiếp tục?')) return;
    try {
      await API.deleteLocation(id);
      Helpers.toast('Đã xóa khu vực');
      this._loadLocations();
    } catch (err) {
      Helpers.toast('Lỗi: ' + err.message, 'error');
    }
  }
};

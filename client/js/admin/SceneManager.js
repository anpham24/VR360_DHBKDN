/**
 * SceneManager — CRUD quản lý scene (ảnh 360°) + upload ảnh
 */
const SceneManager = {
  _locations: [],

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
              <th>Tên scene</th>
              <th>Khu vực</th>
              <th>Ảnh</th>
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

    Helpers.$('#btn-add-scene')?.addEventListener('click', () => this._openForm());
    this._loadScenes();
  },

  async _loadScenes() {
    const tbody = Helpers.$('#scene-table-body');
    try {
      const data = await API.getData();
      this._locations = data.locations || [];
      const locName = id => (this._locations.find(l => l.locationId === id) || {}).name || '—';

      if (!data.scenes.length) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:24px;">Chưa có scene nào</td></tr>';
        return;
      }

      tbody.innerHTML = data.scenes.map(s => `
        <tr>
          <td><strong>${s.title}</strong></td>
          <td>${locName(s.locationId)}</td>
          <td><span style="font-size:12px;color:#888;">${s.imageUrl}</span></td>
          <td>${(s.hotspots || []).length}</td>
          <td>
            <button class="btn-sm" data-edit="${s.sceneId}">Sửa</button>
            <button class="btn-sm btn-danger" data-del="${s.sceneId}">Xóa</button>
          </td>
        </tr>`).join('');

      tbody.querySelectorAll('[data-edit]').forEach(b =>
        b.addEventListener('click', () => {
          const scene = data.scenes.find(x => x.sceneId === b.dataset.edit);
          this._openForm(scene);
        }));
      tbody.querySelectorAll('[data-del]').forEach(b =>
        b.addEventListener('click', () => this._delete(b.dataset.del)));
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:24px;color:red;">Lỗi: ${err.message}</td></tr>`;
    }
  },

  _openForm(scene = null) {
    const isEdit = !!scene;
    const locOptions = this._locations.map(l =>
      `<option value="${l.locationId}" ${scene?.locationId === l.locationId ? 'selected' : ''}>${l.name}</option>`
    ).join('');

    const overlay = Helpers.openModal(isEdit ? 'Sửa Scene' : 'Thêm Scene', `
      <div class="form-group">
        <label>Khu vực *</label>
        <select id="sc-loc"><option value="">-- Chọn khu vực --</option>${locOptions}</select>
      </div>
      <div class="form-group">
        <label>Tên scene *</label>
        <input type="text" id="sc-title" value="${scene?.title || ''}" placeholder="VD: Khu A - Sảnh chính">
      </div>
      <div class="form-group">
        <label>Ảnh 360° ${isEdit ? '(để trống nếu giữ ảnh cũ)' : '*'}</label>
        <input type="file" id="sc-file" accept="image/*">
        <p style="font-size:12px;color:#888;margin-top:4px;">${scene?.imageUrl || ''}</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
        <div class="form-group"><label>Yaw</label><input type="number" id="sc-yaw" value="${scene?.defaultYaw ?? 0}"></div>
        <div class="form-group"><label>Pitch</label><input type="number" id="sc-pitch" value="${scene?.defaultPitch ?? 0}"></div>
        <div class="form-group"><label>Hfov</label><input type="number" id="sc-hfov" value="${scene?.defaultHfov ?? 100}"></div>
      </div>
      <div class="modal-actions" style="text-align:right;margin-top:12px;">
        <button class="btn-primary" id="sc-save">${isEdit ? 'Cập nhật' : 'Thêm'}</button>
      </div>
    `);

    overlay.querySelector('#sc-save').addEventListener('click', async () => {
      const saveBtn = overlay.querySelector('#sc-save');
      const locationId = overlay.querySelector('#sc-loc').value;
      const title = overlay.querySelector('#sc-title').value.trim();
      const file = overlay.querySelector('#sc-file').files[0];

      if (!locationId) { Helpers.toast('Vui lòng chọn khu vực', 'warning'); return; }
      if (!title) { Helpers.toast('Vui lòng nhập tên scene', 'warning'); return; }
      if (!isEdit && !file) { Helpers.toast('Vui lòng chọn ảnh 360°', 'warning'); return; }

      saveBtn.disabled = true;
      saveBtn.textContent = 'Đang lưu...';
      try {
        let imageUrl = scene?.imageUrl;
        if (file) {
          const up = await API.uploadPanorama(file);
          if (!up.url) throw new Error(up.message || 'Upload thất bại');
          imageUrl = up.url;
        }
        const payload = {
          location_id: locationId,
          title,
          image_url: imageUrl,
          default_yaw: parseFloat(overlay.querySelector('#sc-yaw').value) || 0,
          default_pitch: parseFloat(overlay.querySelector('#sc-pitch').value) || 0,
          default_hfov: parseFloat(overlay.querySelector('#sc-hfov').value) || 100
        };
        if (isEdit) {
          await API.updateScene(scene.sceneId, payload);
          Helpers.toast('Đã cập nhật scene');
        } else {
          await API.createScene(payload);
          Helpers.toast('Đã thêm scene');
        }
        overlay.remove();
        this._loadScenes();
      } catch (err) {
        Helpers.toast('Lỗi: ' + err.message, 'error');
        saveBtn.disabled = false;
        saveBtn.textContent = isEdit ? 'Cập nhật' : 'Thêm';
      }
    });
  },

  async _delete(id) {
    if (!confirm('Xóa scene này (và các hotspot của nó)?')) return;
    try {
      await API.deleteScene(id);
      Helpers.toast('Đã xóa scene');
      this._loadScenes();
    } catch (err) {
      Helpers.toast('Lỗi: ' + err.message, 'error');
    }
  }
};

/**
 * HotspotEditor — Tạo/sửa hotspot bằng cách click lên VR360 preview
 */
const HotspotEditor = {
  previewViewer: null,
  _scenes: [],
  _currentSceneId: null,

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
        <h3 style="padding:16px;">Danh sách Hotspot của scene</h3>
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
    this._loadScenes();
  },

  async _loadScenes() {
    try {
      const data = await API.getData();
      this._scenes = data.scenes || [];
      const sel = Helpers.$('#hotspot-scene-select');
      const target = Helpers.$('#hs-target-scene');
      const opts = this._scenes.map(s => `<option value="${s.sceneId}">${s.title}</option>`).join('');
      sel.innerHTML = '<option value="">-- Chọn scene --</option>' + opts;
      target.innerHTML = '<option value="">-- Chọn scene đích --</option>' + opts;
    } catch (err) {
      Helpers.toast('Lỗi tải scene: ' + err.message, 'error');
    }
  },

  _bindEvents() {
    Helpers.$('#hotspot-scene-select')?.addEventListener('change', (e) => {
      this._selectScene(e.target.value);
    });

    Helpers.$('#hs-type')?.addEventListener('change', (e) => {
      const isNav = e.target.value === 'nav';
      isNav ? Helpers.show('#nav-fields') : Helpers.hide('#nav-fields');
      isNav ? Helpers.hide('#info-fields') : Helpers.show('#info-fields');
    });

    Helpers.$('#btn-save-hotspot')?.addEventListener('click', () => this._saveHotspot());
  },

  _selectScene(sceneId) {
    this._currentSceneId = sceneId;
    if (!sceneId) {
      Helpers.hide('#hotspot-form');
      return;
    }
    const scene = this._scenes.find(s => s.sceneId === sceneId);
    if (!scene) return;

    // Khởi tạo preview Pannellum
    if (this.previewViewer) { this.previewViewer.destroy(); this.previewViewer = null; }
    this.previewViewer = pannellum.viewer('hotspot-preview', {
      type: 'equirectangular',
      panorama: scene.imageUrl,
      autoLoad: true,
      hfov: scene.defaultHfov || CONFIG.DEFAULT_HFOV,
      haov: scene.haov || CONFIG.DEFAULT_HAOV,
      vaov: scene.vaov || CONFIG.DEFAULT_VAOV,
      showControls: false
    });

    // Click lên ảnh → lấy tọa độ yaw/pitch
    this.previewViewer.on('mousedown', (event) => {
      const coords = this.previewViewer.mouseEventToCoords(event);
      if (coords) {
        Helpers.$('#hs-pitch').value = coords[0].toFixed(2);
        Helpers.$('#hs-yaw').value = coords[1].toFixed(2);
        Helpers.show('#hotspot-form');
      }
    });

    this._renderHotspotList();
  },

  _renderHotspotList() {
    const scene = this._scenes.find(s => s.sceneId === this._currentSceneId);
    const tbody = Helpers.$('#hotspot-table-body');
    const list = scene?.hotspots || [];
    if (!list.length) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:24px;">Chưa có hotspot</td></tr>';
      return;
    }
    tbody.innerHTML = list.map(h => `
      <tr>
        <td>${h.label || ''}</td>
        <td>${h.type === 'nav' ? 'Chuyển scene' : 'Thông tin'}</td>
        <td>${h.yaw}</td>
        <td>${h.pitch}</td>
        <td><button class="btn-sm btn-danger" data-del="${h.hotspotId}">Xóa</button></td>
      </tr>`).join('');
    tbody.querySelectorAll('[data-del]').forEach(b =>
      b.addEventListener('click', () => this._deleteHotspot(b.dataset.del)));
  },

  async _saveHotspot() {
    if (!this._currentSceneId) { Helpers.toast('Chưa chọn scene', 'warning'); return; }
    const yaw = parseFloat(Helpers.$('#hs-yaw').value);
    const pitch = parseFloat(Helpers.$('#hs-pitch').value);
    if (Number.isNaN(yaw) || Number.isNaN(pitch)) {
      Helpers.toast('Hãy click lên ảnh để lấy tọa độ trước', 'warning');
      return;
    }
    const type = Helpers.$('#hs-type').value;
    const payload = {
      scene_id: this._currentSceneId,
      type, yaw, pitch,
      label: Helpers.$('#hs-label').value.trim() || null
    };
    if (type === 'nav') {
      payload.target_scene_id = Helpers.$('#hs-target-scene').value || null;
      if (!payload.target_scene_id) { Helpers.toast('Chọn scene đích', 'warning'); return; }
    } else {
      payload.info_title = Helpers.$('#hs-info-title').value.trim() || null;
      payload.info_content = Helpers.$('#hs-info-content').value.trim() || null;
    }

    try {
      await API.createHotspot(payload);
      Helpers.toast('Đã lưu hotspot');
      Helpers.$('#hs-label').value = '';
      Helpers.$('#hs-info-title') && (Helpers.$('#hs-info-title').value = '');
      Helpers.$('#hs-info-content') && (Helpers.$('#hs-info-content').value = '');
      await this._loadScenes();
      this._renderHotspotList();
    } catch (err) {
      Helpers.toast('Lỗi: ' + err.message, 'error');
    }
  },

  async _deleteHotspot(id) {
    if (!confirm('Xóa hotspot này?')) return;
    try {
      await API.deleteHotspot(id);
      Helpers.toast('Đã xóa hotspot');
      await this._loadScenes();
      this._renderHotspotList();
    } catch (err) {
      Helpers.toast('Lỗi: ' + err.message, 'error');
    }
  }
};

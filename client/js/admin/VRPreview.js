/**
 * VRPreview — Admin xem trước tour (panorama + điều hướng hotspot)
 */
const VRPreview = {
  viewer: null,
  _scenes: [],

  render(container) {
    container.innerHTML = `
      <div class="toolbar">
        <h2>Xem trước Tour</h2>
      </div>

      <div class="form-group">
        <label>Chọn Scene bắt đầu</label>
        <select id="preview-scene-select">
          <option value="">-- Chọn scene --</option>
        </select>
      </div>

      <div id="preview-panorama" style="width:100%;height:500px;border-radius:8px;overflow:hidden;background:#000;"></div>

      <p style="margin-top:12px;color:var(--text-light);font-size:13px;">
        Dùng chuột để xoay, scroll để zoom. Click hotspot (mũi tên) để chuyển scene.
      </p>
    `;

    Helpers.$('#preview-scene-select')?.addEventListener('change', (e) => this._show(e.target.value));
    this._load();
  },

  async _load() {
    try {
      const data = await API.getData();
      this._scenes = data.scenes || [];
      const sel = Helpers.$('#preview-scene-select');
      sel.innerHTML = '<option value="">-- Chọn scene --</option>' +
        this._scenes.map(s => `<option value="${s.sceneId}">${s.title}</option>`).join('');
    } catch (err) {
      Helpers.toast('Lỗi tải dữ liệu: ' + err.message, 'error');
    }
  },

  _show(sceneId) {
    if (!sceneId) return;
    const scene = this._scenes.find(s => s.sceneId === sceneId);
    if (!scene) return;

    if (this.viewer) { this.viewer.destroy(); this.viewer = null; }

    const hotSpots = (scene.hotspots || []).map(h => ({
      id: h.hotspotId,
      yaw: h.yaw,
      pitch: h.pitch,
      type: 'info',
      text: h.label || (h.type === 'nav' ? 'Chuyển scene' : 'Thông tin'),
      clickHandlerFunc: () => {
        if (h.type === 'nav' && h.targetSceneId) {
          Helpers.$('#preview-scene-select').value = h.targetSceneId;
          this._show(h.targetSceneId);
        }
      }
    }));

    this.viewer = pannellum.viewer('preview-panorama', {
      type: 'equirectangular',
      panorama: scene.imageUrl,
      autoLoad: true,
      yaw: scene.defaultYaw || 0,
      pitch: scene.defaultPitch || 0,
      hfov: scene.defaultHfov || CONFIG.DEFAULT_HFOV,
      haov: scene.haov || CONFIG.DEFAULT_HAOV,
      vaov: scene.vaov || CONFIG.DEFAULT_VAOV,
      showControls: false,
      hotSpots
    });
  }
};

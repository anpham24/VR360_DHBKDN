/**
 * VRPreview — Admin xem tour hoàn chỉnh (preview trước khi publish)
 */
const VRPreview = {
  render(container) {
    container.innerHTML = `
      <div class="toolbar">
        <h2>Xem trước Tour</h2>
      </div>

      <div class="form-group">
        <label>Chọn Tour</label>
        <select id="preview-tour-select">
          <option value="">-- Chọn tour --</option>
        </select>
      </div>

      <div id="preview-panorama" style="width:100%;height:500px;border-radius:8px;overflow:hidden;background:#000;"></div>

      <p style="margin-top:12px;color:var(--text-light);font-size:13px;">
        Sử dụng chuột để xoay, scroll để zoom. Click hotspot để chuyển scene.
      </p>
    `;

    // TODO: Phase 4 — load danh sách tour, khởi tạo VR preview
  }
};

/**
 * TourManager — Xem & cập nhật thông tin tour
 */
const TourManager = {
  render(container) {
    container.innerHTML = `
      <div class="toolbar">
        <h2>Quản lý Tour</h2>
      </div>

      <div class="admin-table">
        <table>
          <thead>
            <tr>
              <th>Tên tour</th>
              <th>Mô tả</th>
              <th>Ảnh bản đồ</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody id="tour-table-body">
            <tr><td colspan="4" style="text-align:center;padding:24px;">Đang tải...</td></tr>
          </tbody>
        </table>
      </div>
    `;
    this._loadTours();
  },

  async _loadTours() {
    const tbody = Helpers.$('#tour-table-body');
    try {
      const tours = await API.getTours();
      if (!tours.length) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:24px;">Chưa có tour</td></tr>';
        return;
      }
      tbody.innerHTML = tours.map(t => `
        <tr>
          <td><strong>${t.name}</strong></td>
          <td>${t.description || ''}</td>
          <td><span style="font-size:12px;color:#888;">${t.campus_image || ''}</span></td>
          <td><button class="btn-sm" data-edit="${t.tour_id}">Sửa</button></td>
        </tr>`).join('');

      tbody.querySelectorAll('[data-edit]').forEach(b =>
        b.addEventListener('click', () => {
          const tour = tours.find(x => x.tour_id === b.dataset.edit);
          this._openForm(tour);
        }));
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:24px;color:red;">Lỗi: ${err.message}</td></tr>`;
    }
  },

  _openForm(tour) {
    const overlay = Helpers.openModal('Sửa Tour', `
      <div class="form-group">
        <label>Tên tour *</label>
        <input type="text" id="tour-name" value="${tour.name || ''}">
      </div>
      <div class="form-group">
        <label>Mô tả</label>
        <textarea id="tour-desc" rows="3">${tour.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Đường dẫn ảnh bản đồ campus</label>
        <input type="text" id="tour-img" value="${tour.campus_image || ''}" placeholder="assets/panoramas/congchinh.png">
      </div>
      <div class="modal-actions" style="text-align:right;margin-top:12px;">
        <button class="btn-primary" id="tour-save">Cập nhật</button>
      </div>
    `);

    overlay.querySelector('#tour-save').addEventListener('click', async () => {
      const payload = {
        name: overlay.querySelector('#tour-name').value.trim(),
        description: overlay.querySelector('#tour-desc').value.trim(),
        campus_image: overlay.querySelector('#tour-img').value.trim()
      };
      if (!payload.name) { Helpers.toast('Nhập tên tour', 'warning'); return; }
      try {
        await API.updateTour(tour.tour_id, payload);
        Helpers.toast('Đã cập nhật tour');
        overlay.remove();
        this._loadTours();
      } catch (err) {
        Helpers.toast('Lỗi: ' + err.message, 'error');
      }
    });
  }
};

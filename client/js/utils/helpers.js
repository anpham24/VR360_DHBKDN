/**
 * Hàm tiện ích dùng chung
 */
const Helpers = {
  $(selector) {
    return document.querySelector(selector);
  },

  $$(selector) {
    return document.querySelectorAll(selector);
  },

  show(el) {
    if (typeof el === 'string') el = this.$(el);
    if (el) el.classList.remove('hidden');
  },

  hide(el) {
    if (typeof el === 'string') el = this.$(el);
    if (el) el.classList.add('hidden');
  },

  toggle(el) {
    if (typeof el === 'string') el = this.$(el);
    if (el) el.classList.toggle('hidden');
  },

  toast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  },

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  /**
   * Mở một hộp thoại (modal) đơn giản dùng cho trang Admin.
   * @param {string} title - Tiêu đề
   * @param {string} innerHtml - Nội dung HTML bên trong (form...)
   * @returns {HTMLElement} phần tử overlay (gọi .remove() để đóng)
   */
  openModal(title, innerHtml) {
    const overlay = document.createElement('div');
    overlay.style.cssText =
      'position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;' +
      'align-items:center;justify-content:center;z-index:9999;padding:16px;';
    overlay.innerHTML = `
      <div style="background:#fff;border-radius:10px;max-width:520px;width:100%;
                  max-height:90vh;overflow:auto;box-shadow:0 10px 40px rgba(0,0,0,.3);">
        <div style="display:flex;justify-content:space-between;align-items:center;
                    padding:16px 20px;border-bottom:1px solid #eee;">
          <h3 style="margin:0;font-size:18px;">${title}</h3>
          <button data-modal-close style="background:none;border:none;font-size:24px;
                  cursor:pointer;line-height:1;color:#888;">×</button>
        </div>
        <div style="padding:20px;">${innerHtml}</div>
      </div>`;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.querySelector('[data-modal-close]').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    return overlay;
  }
};

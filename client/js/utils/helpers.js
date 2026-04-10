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
  }
};

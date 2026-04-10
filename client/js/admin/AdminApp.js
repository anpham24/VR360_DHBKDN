/**
 * AdminApp — Layout chính admin panel, điều hướng giữa các trang
 */
const AdminApp = {
  currentPage: 'dashboard',

  init() {
    if (!Auth.isLoggedIn()) {
      this._showLogin();
      return;
    }
    this._showPanel();
    this._bindEvents();
    this.navigate('dashboard');
  },

  _showLogin() {
    Helpers.show('#login-view');
    Helpers.hide('#admin-panel');

    Helpers.$('#login-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = Helpers.$('#username').value;
      const password = Helpers.$('#password').value;
      try {
        await Auth.login(username, password);
        this._showPanel();
        this.navigate('dashboard');
      } catch (err) {
        const errorEl = Helpers.$('#login-error');
        errorEl.textContent = err.message || 'Sai tài khoản hoặc mật khẩu';
        Helpers.show(errorEl);
      }
    });
  },

  _showPanel() {
    Helpers.hide('#login-view');
    Helpers.show('#admin-panel');
    Helpers.$('#admin-name').textContent = `Xin chào, ${Auth.getAdminName()}`;
  },

  _bindEvents() {
    Helpers.$('#btn-logout')?.addEventListener('click', () => Auth.logout());

    Helpers.$$('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        this.navigate(page);
      });
    });
  },

  navigate(page) {
    this.currentPage = page;

    Helpers.$$('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });

    const content = Helpers.$('#admin-content');

    switch (page) {
      case 'dashboard':  Dashboard.render(content); break;
      case 'tours':      TourManager.render(content); break;
      case 'locations':  LocationManager.render(content); break;
      case 'scenes':     SceneManager.render(content); break;
      case 'hotspots':   HotspotEditor.render(content); break;
      case 'preview':    VRPreview.render(content); break;
      default:           Dashboard.render(content);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => AdminApp.init());

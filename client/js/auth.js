/**
 * Xử lý đăng nhập / đăng xuất admin (JWT)
 */
const Auth = {
  isLoggedIn() {
    return !!localStorage.getItem('jwt_token');
  },

  getToken() {
    return localStorage.getItem('jwt_token');
  },

  saveToken(token) {
    localStorage.setItem('jwt_token', token);
  },

  getAdminName() {
    return localStorage.getItem('admin_name') || 'Admin';
  },

  saveAdminName(name) {
    localStorage.setItem('admin_name', name);
  },

  async login(username, password) {
    const data = await API.login(username, password);
    if (data.token) {
      this.saveToken(data.token);
      this.saveAdminName(data.displayName || username);
      return true;
    }
    throw new Error(data.message || 'Đăng nhập thất bại');
  },

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('admin_name');
    location.reload();
  }
};

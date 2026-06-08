/**
 * MapView — Hiển thị ảnh campus với hotspot markers overlay
 * Thay thế Leaflet bằng ảnh tĩnh + CSS positioned hotspots
 */
class MapView {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.markers = [];
  }

  init(campusImage) {
    this.container.innerHTML = `
      <div class="campus-map-wrapper">
        <img src="${campusImage}" alt="Bản đồ campus ĐH Bách Khoa Đà Nẵng" class="campus-map-img" id="campus-img">
        <div class="campus-markers" id="campus-markers"></div>
      </div>
    `;
    this._initCoordDebug();
  }

  /**
   * Chế độ debug lấy toạ độ: bấm phím "D" để bật/tắt.
   * Khi bật, click vào bản đồ sẽ hiện posX/posY (%) — copy luôn vào clipboard.
   * Dùng để căn vị trí marker cho đúng toà nhà.
   */
  _initCoordDebug() {
    const wrapper = this.container.querySelector('.campus-map-wrapper');
    if (!wrapper) return;

    const badge = document.createElement('div');
    badge.className = 'coord-debug-badge';
    badge.style.display = 'none';
    wrapper.appendChild(badge);

    document.addEventListener('keydown', (e) => {
      // Bỏ qua nếu đang xem VR 360 hoặc đang gõ trong ô input
      if (!document.getElementById('map-view') ||
          document.getElementById('map-view').classList.contains('hidden')) return;
      if (e.key !== 'd' && e.key !== 'D') return;
      const on = wrapper.classList.toggle('coord-debug-on');
      badge.style.display = on ? 'block' : 'none';
      badge.textContent = on
        ? 'Debug toạ độ: BẬT — click vào bản đồ để lấy posX/posY'
        : '';
    });

    wrapper.addEventListener('click', (e) => {
      if (!wrapper.classList.contains('coord-debug-on')) return;
      const rect = wrapper.getBoundingClientRect();
      const posX = ((e.clientX - rect.left) / rect.width) * 100;
      const posY = ((e.clientY - rect.top) / rect.height) * 100;
      const text = `posX: ${posX.toFixed(1)}, posY: ${posY.toFixed(1)}`;
      badge.textContent = text + '  (đã copy)';
      console.log('[coord-debug]', text);
      if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
    }, true);
  }

  addMarker(location, onClick) {
    const marker = new MapMarker(this.container, location, onClick);
    this.markers.push(marker);
    return marker;
  }

  clearMarkers() {
    this.markers.forEach(m => m.remove());
    this.markers = [];
  }

  destroy() {
    this.container.innerHTML = '';
    this.markers = [];
  }
}

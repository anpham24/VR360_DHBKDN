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

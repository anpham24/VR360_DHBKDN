/**
 * MapView — Quản lý bản đồ Leaflet hiển thị campus
 */
class MapView {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.markers = [];
  }

  init(center, zoom) {
    this.map = L.map(this.containerId).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);
  }

  addMarker(location, onClick) {
    const marker = new MapMarker(this.map, location, onClick);
    this.markers.push(marker);
    return marker;
  }

  clearMarkers() {
    this.markers.forEach(m => m.remove());
    this.markers = [];
  }

  flyTo(lat, lng, zoom = 18) {
    this.map.flyTo([lat, lng], zoom);
  }

  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}

/**
 * Minimap — Bản đồ nhỏ hiển thị vị trí hiện tại khi xem VR360
 */
class Minimap {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.currentMarker = null;
  }

  init(center, zoom) {
    this.map = L.map(this.containerId, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false
    }).setView(center, zoom || 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);
  }

  updatePosition(lat, lng, label) {
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }

    const icon = L.divIcon({
      className: 'minimap-marker',
      html: '<div style="width:12px;height:12px;background:#ea4335;border:2px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>',
      iconSize: [12, 12]
    });

    this.currentMarker = L.marker([lat, lng], { icon }).addTo(this.map);
    this.map.setView([lat, lng]);
  }

  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}

/**
 * MapMarker — Tạo & quản lý marker trên bản đồ Leaflet
 */
class MapMarker {
  constructor(map, location, onClick) {
    this.map = map;
    this.location = location;
    this.onClick = onClick;
    this.leafletMarker = null;

    this._create();
  }

  _create() {
    const { markerLat, markerLng, name, description, thumbnail } = this.location;

    this.leafletMarker = L.marker([markerLat, markerLng]).addTo(this.map);

    const popupHtml = `
      <div class="marker-popup">
        <img src="${thumbnail}" alt="${name}">
        <h3>${name}</h3>
        <p>${description}</p>
        <button class="btn-explore" data-location-id="${this.location.locationId}">
          Tham quan 360°
        </button>
      </div>
    `;

    this.leafletMarker.bindPopup(popupHtml);
    this.leafletMarker.on('click', () => this.leafletMarker.openPopup());

    this.leafletMarker.on('popupopen', () => {
      const btn = document.querySelector(`[data-location-id="${this.location.locationId}"]`);
      if (btn) {
        btn.addEventListener('click', () => this.onClick(this.location));
      }
    });
  }

  highlight() {
    this.leafletMarker.openPopup();
  }

  remove() {
    if (this.leafletMarker) {
      this.map.removeLayer(this.leafletMarker);
    }
  }
}

/**
 * MapMarker — Tạo hotspot marker overlay trên ảnh campus
 */
class MapMarker {
  constructor(mapContainer, location, onClick) {
    this.mapContainer = mapContainer;
    this.location = location;
    this.onClick = onClick;
    this.element = null;

    this._create();
  }

  _create() {
    const { posX, posY, name, description, hasScenes } = this.location;
    const markersContainer = this.mapContainer.querySelector('#campus-markers');

    this.element = document.createElement('div');
    this.element.className = `campus-hotspot ${hasScenes ? 'active' : 'inactive'}`;
    this.element.style.left = `${posX}%`;
    this.element.style.top = `${posY}%`;

    this.element.innerHTML = `
      <div class="hotspot-pin">
        <div class="hotspot-ping"></div>
        <div class="hotspot-dot"></div>
      </div>
      <div class="hotspot-label">${name}</div>
      <div class="hotspot-popup">
        <h3>${name}</h3>
        <p>${description}</p>
        <button class="btn-explore" ${!hasScenes ? 'disabled' : ''}>
          ${hasScenes ? '🔭 Tham quan 360°' : '🚧 Sắp có'}
        </button>
      </div>
    `;

    this.element.addEventListener('click', (e) => {
      // Close other popups
      markersContainer.querySelectorAll('.campus-hotspot.show-popup').forEach(el => {
        if (el !== this.element) el.classList.remove('show-popup');
      });
      this.element.classList.toggle('show-popup');
      e.stopPropagation();
    });

    const btn = this.element.querySelector('.btn-explore');
    if (hasScenes) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.onClick(this.location);
      });
    }

    // Close popup when clicking outside
    document.addEventListener('click', () => {
      this.element.classList.remove('show-popup');
    });

    markersContainer.appendChild(this.element);
  }

  highlight() {
    this.element.classList.add('show-popup');
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
}

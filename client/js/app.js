/**
 * App — Điều phối chính: routing giữa Map View ↔ VR View
 */
const App = {
  mapView: null,
  vrViewer: null,
  hotspotManager: null,
  sceneLoader: null,
  minimap: null,

  init() {
    this._initMap();
    this._initVR();
    this._bindEvents();
  },

  _initMap() {
    this.mapView = new MapView('map');
    this.mapView.init(CONFIG.MAP_CENTER, CONFIG.MAP_ZOOM);

    SampleData.locations.forEach(loc => {
      this.mapView.addMarker(loc, (location) => this._openVR(location));
    });

    this._renderSidebar();
  },

  _initVR() {
    this.vrViewer = new VRViewer('panorama');
    this.hotspotManager = new HotspotManager(this.vrViewer);
    this.sceneLoader = new SceneLoader(this.vrViewer, this.hotspotManager);

    this.minimap = new Minimap('minimap');
    this.minimap.init(CONFIG.MAP_CENTER, 16);

    this.sceneLoader.onSceneChange = (scene) => {
      const location = SampleData.getLocationById(scene.locationId);
      if (location) {
        this.minimap.updatePosition(location.markerLat, location.markerLng, location.name);
      }
    };
  },

  _renderSidebar() {
    const list = Helpers.$('#location-list');
    if (!list) return;

    list.innerHTML = SampleData.locations.map(loc => `
      <div class="location-card" data-location-id="${loc.locationId}">
        <img class="location-card-thumb" src="${loc.thumbnail}" alt="${loc.name}">
        <div class="location-card-info">
          <h3>${loc.name}</h3>
          <p>${loc.description}</p>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.location-card').forEach(card => {
      card.addEventListener('click', () => {
        const locId = card.dataset.locationId;
        const location = SampleData.getLocationById(locId);
        if (location) this._openVR(location);
      });
    });
  },

  _openVR(location) {
    const scenes = SampleData.getScenesForLocation(location.locationId);
    if (!scenes.length) {
      Helpers.toast('Chưa có ảnh 360° cho khu vực này', 'warning');
      return;
    }

    Helpers.hide('#map-view');
    Helpers.show('#vr-view');

    this.sceneLoader.loadScene(scenes[0]);
  },

  _closeVR() {
    Helpers.show('#map-view');
    Helpers.hide('#vr-view');
    this.vrViewer.destroy();
    setTimeout(() => this.mapView.map.invalidateSize(), 100);
  },

  _bindEvents() {
    Helpers.$('#btn-back-map')?.addEventListener('click', () => this._closeVR());

    Helpers.$('#btn-fullscreen')?.addEventListener('click', () => {
      this.vrViewer.toggleFullscreen();
    });

    Helpers.$('#info-close')?.addEventListener('click', () => {
      Helpers.hide('#info-popup');
    });

    Helpers.$('#info-popup')?.addEventListener('click', (e) => {
      if (e.target.id === 'info-popup') Helpers.hide('#info-popup');
    });
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());

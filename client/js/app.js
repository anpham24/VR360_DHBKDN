/**
 * App — Điều phối chính: routing giữa Map View ↔ VR View
 */
const App = {
  mapView: null,
  vrViewer: null,
  hotspotManager: null,
  sceneLoader: null,

  async init() {
    try {
      await Store.load();
    } catch (err) {
      console.error('Store.load error:', err);
      Helpers.toast('Không tải được dữ liệu từ máy chủ. Hãy kiểm tra MySQL / kết nối.', 'error', 6000);
      return;
    }
    this._initMap();
    this._initVR();
    this._bindEvents();
  },

  _initMap() {
    this.mapView = new MapView('campus-map');
    this.mapView.init(Store.tour.campusImage);

    Store.locations.forEach(loc => {
      this.mapView.addMarker(loc, (location) => this._openVR(location));
    });

    this._renderSidebar();
  },

  _initVR() {
    this.vrViewer = new VRViewer('panorama');
    this.hotspotManager = new HotspotManager(this.vrViewer);
    this.sceneLoader = new SceneLoader(this.vrViewer, this.hotspotManager);
  },

  _renderSidebar() {
    const list = Helpers.$('#location-list');
    if (!list) return;

    list.innerHTML = Store.locations.map(loc => `
      <div class="location-card ${loc.hasScenes ? '' : 'disabled'}" data-location-id="${loc.locationId}">
        <div class="location-card-icon">${loc.hasScenes ? '🔭' : '🚧'}</div>
        <div class="location-card-info">
          <h3>${loc.name}</h3>
          <p>${loc.description}</p>
          ${!loc.hasScenes ? '<span class="badge-coming">Sắp có</span>' : ''}
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.location-card').forEach(card => {
      card.addEventListener('click', () => {
        const locId = card.dataset.locationId;
        const location = Store.getLocationById(locId);
        if (location) this._openVR(location);
      });
    });
  },

  _openVR(location) {
    const scenes = Store.getScenesForLocation(location.locationId);
    if (!scenes.length) {
      Helpers.toast('Chưa có ảnh 360° cho khu vực này. Sắp cập nhật!', 'warning');
      return;
    }

    Helpers.hide('#map-view');
    Helpers.show('#vr-view');

    // Load scene list for sequential navigation.
    // Một số location mở ở ảnh giữa (vd Khu F mở ở anh19) qua startSceneIndex.
    const startIndex = Number.isInteger(location.startSceneIndex)
      ? Math.max(0, Math.min(location.startSceneIndex, scenes.length - 1))
      : 0;
    this.sceneLoader.loadSceneList(scenes, startIndex);
  },

  _closeVR() {
    Helpers.show('#map-view');
    Helpers.hide('#vr-view');
    this.vrViewer.destroy();
    this.sceneLoader.reset();
  },

  _bindEvents() {
    Helpers.$('#btn-back-map')?.addEventListener('click', () => this._closeVR());

    Helpers.$('#btn-fullscreen')?.addEventListener('click', () => {
      this.vrViewer.toggleFullscreen();
    });

    Helpers.$('#btn-prev-scene')?.addEventListener('click', () => this.sceneLoader.loadPrev());
    Helpers.$('#btn-next-scene')?.addEventListener('click', () => this.sceneLoader.loadNext());

    Helpers.$('#info-close')?.addEventListener('click', () => {
      Helpers.hide('#info-popup');
    });

    Helpers.$('#info-popup')?.addEventListener('click', (e) => {
      if (e.target.id === 'info-popup') Helpers.hide('#info-popup');
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (Helpers.$('#vr-view')?.classList.contains('hidden')) return;
      if (e.key === 'ArrowRight') this.sceneLoader.loadNext();
      if (e.key === 'ArrowLeft') this.sceneLoader.loadPrev();
      if (e.key === 'Escape') this._closeVR();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());

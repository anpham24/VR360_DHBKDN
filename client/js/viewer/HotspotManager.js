/**
 * HotspotManager — Tạo và quản lý hotspot trên VR360
 */
class HotspotManager {
  constructor(vrViewer) {
    this.vrViewer = vrViewer;
  }

  renderHotspots(hotspots, onNavClick, onInfoClick) {
    if (!hotspots || !hotspots.length) return;

    hotspots.forEach(hs => {
      if (hs.type === CONFIG.HOTSPOT_TYPE.NAV) {
        this._addNavHotspot(hs, onNavClick);
      } else if (hs.type === CONFIG.HOTSPOT_TYPE.INFO) {
        this._addInfoHotspot(hs, onInfoClick);
      }
    });
  }

  _addNavHotspot(hs, onClick) {
    this.vrViewer.addHotspot({
      id: hs.hotspotId,
      pitch: hs.pitch,
      yaw: hs.yaw,
      type: 'custom',
      cssClass: 'custom-hotspot-nav',
      createTooltipFunc: (div) => {
        const tooltip = document.createElement('span');
        tooltip.className = 'hotspot-tooltip';
        tooltip.textContent = hs.label;
        div.appendChild(tooltip);
      },
      clickHandlerFunc: () => onClick(hs)
    });
  }

  _addInfoHotspot(hs, onClick) {
    this.vrViewer.addHotspot({
      id: hs.hotspotId,
      pitch: hs.pitch,
      yaw: hs.yaw,
      type: 'custom',
      cssClass: 'custom-hotspot-info',
      createTooltipFunc: (div) => {
        const tooltip = document.createElement('span');
        tooltip.className = 'hotspot-tooltip';
        tooltip.textContent = hs.label;
        div.appendChild(tooltip);
      },
      clickHandlerFunc: () => onClick(hs)
    });
  }

  clear() {
    this.vrViewer.removeAllHotspots();
  }
}

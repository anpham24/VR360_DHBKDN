/**
 * HotspotManager — Tạo và quản lý hotspot trên VR360
 * Nav hotspot kiểu Google Street View (mũi tên trên mặt đất)
 * Mũi tên tự xoay theo hướng di chuyển (dựa trên yaw)
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

  /**
   * Tính góc xoay của mũi tên dựa trên yaw hotspot so với camera.
   * Nếu hotspot ở yaw=0 (phía trước) → mũi tên chỉ lên (0deg).
   * Nếu hotspot ở yaw=180 (phía sau) → mũi tên chỉ xuống (180deg).
   */
  _calcArrowRotation(hsYaw) {
    const viewerYaw = this.vrViewer.getYaw();
    let diff = hsYaw - viewerYaw;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    return diff;
  }

  _addNavHotspot(hs, onClick) {
    this.vrViewer.addHotspot({
      id: hs.hotspotId,
      pitch: hs.pitch,
      yaw: hs.yaw,
      type: 'custom',
      cssClass: 'streetview-arrow',
      createTooltipFunc: (div) => {
        const rotation = this._calcArrowRotation(hs.yaw);

        div.innerHTML = `
          <div class="sv-arrow-inner">
            <div class="sv-arrow-ring"></div>
            <div class="sv-arrow-chevron" style="transform: rotate(${rotation}deg)">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4 L20 18 L12 14 L4 18 Z"/>
              </svg>
            </div>
          </div>
          <span class="sv-arrow-tooltip">${hs.label}</span>
        `;
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

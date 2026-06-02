/**
 * VRViewer — Khởi tạo và điều khiển Pannellum VR360
 */
class VRViewer {
  constructor(containerId) {
    this.containerId = containerId;
    this.viewer = null;
    this.currentScene = null;
  }

  loadScene(scene) {
    this.currentScene = scene;

    if (this.viewer) {
      this.viewer.destroy();
    }

    this.viewer = pannellum.viewer(this.containerId, {
      type: 'equirectangular',
      panorama: scene.imageUrl,
      autoLoad: CONFIG.PANNELLUM_AUTO_LOAD,
      autoRotate: CONFIG.PANNELLUM_AUTO_ROTATE,
      yaw: scene.defaultYaw || CONFIG.DEFAULT_YAW,
      pitch: scene.defaultPitch || CONFIG.DEFAULT_PITCH,
      hfov: scene.defaultHfov || CONFIG.DEFAULT_HFOV,
      minHfov: CONFIG.MIN_HFOV,
      maxHfov: CONFIG.MAX_HFOV,
      // Ảnh là panorama 360° ngang nhưng giới hạn chiều dọc (tỉ lệ ~5.6:1).
      // Khai báo đúng góc phủ để Pannellum KHÔNG kéo giãn dọc lên 180° → ảnh nét
      // và đúng tỉ lệ. Có thể override theo từng scene nếu cần.
      haov: scene.haov || CONFIG.DEFAULT_HAOV,
      vaov: scene.vaov || CONFIG.DEFAULT_VAOV,
      vOffset: scene.vOffset || 0,
      compass: false,
      showControls: false,
      mouseZoom: true,
      draggable: true
    });

    return this.viewer;
  }

  addHotspot(hotspotConfig) {
    if (!this.viewer) return;
    this.viewer.addHotSpot(hotspotConfig);
  }

  removeAllHotspots() {
    if (!this.viewer) return;
    const hotspots = this.viewer.getConfig().hotSpots || [];
    hotspots.forEach(hs => {
      try { this.viewer.removeHotSpot(hs.id); } catch (e) { /* ignore */ }
    });
  }

  getYaw() {
    return this.viewer ? this.viewer.getYaw() : 0;
  }

  getPitch() {
    return this.viewer ? this.viewer.getPitch() : 0;
  }

  getHfov() {
    return this.viewer ? this.viewer.getHfov() : CONFIG.DEFAULT_HFOV;
  }

  lookAt(yaw, pitch, hfov) {
    if (this.viewer) {
      this.viewer.lookAt(pitch, yaw, hfov);
    }
  }

  toggleFullscreen() {
    if (this.viewer) {
      this.viewer.toggleFullscreen();
    }
  }

  onLoad(callback) {
    if (this.viewer) {
      this.viewer.on('load', callback);
    }
  }

  onError(callback) {
    if (this.viewer) {
      this.viewer.on('error', callback);
    }
  }

  /**
   * Lấy tọa độ yaw/pitch từ vị trí click — dùng cho Hotspot Editor (Admin)
   */
  onMouseClick(callback) {
    if (!this.viewer) return;
    this.viewer.on('mousedown', (event) => {
      const coords = this.viewer.mouseEventToCoords(event);
      if (coords) {
        callback({ yaw: coords[1], pitch: coords[0] });
      }
    });
  }

  destroy() {
    if (this.viewer) {
      this.viewer.destroy();
      this.viewer = null;
      this.currentScene = null;
    }
  }
}

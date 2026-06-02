/**
 * SceneLoader — Load và chuyển đổi giữa các scene VR360
 * Hiệu ứng chuyển cảnh kiểu Google Street View:
 *   1. Zoom vào hướng hotspot được click
 *   2. Blur + fade to black
 *   3. Load scene mới
 *   4. Fade in scene mới
 */
class SceneLoader {
  constructor(vrViewer, hotspotManager) {
    this.vrViewer = vrViewer;
    this.hotspotManager = hotspotManager;
    this.sceneList = [];
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.onSceneChange = null;
  }

  loadSceneList(scenes, startIndex = 0) {
    this.sceneList = scenes;
    this.currentIndex = startIndex;
    this._directLoadScene(this.sceneList[this.currentIndex]);
  }

  loadNext() {
    if (this.isTransitioning) return;
    if (this.currentIndex < this.sceneList.length - 1) {
      this.currentIndex++;
      this._transitionToScene(this.sceneList[this.currentIndex], 0, -20);
    }
  }

  loadPrev() {
    if (this.isTransitioning) return;
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this._transitionToScene(this.sceneList[this.currentIndex], 180, -20);
    }
  }

  /**
   * Chuyển cảnh kiểu Google Street View
   * @param {Object} scene - Scene đích
   * @param {number} dirYaw - Hướng yaw mà camera zoom vào (hướng hotspot)
   * @param {number} dirPitch - Hướng pitch mà camera zoom vào
   */
  _transitionToScene(scene, dirYaw, dirPitch) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    const overlay = Helpers.$('#transition-overlay');

    // Tính vị trí zoom trên màn hình từ hướng yaw/pitch của hotspot
    const zoomPos = this._calcScreenPosition(dirYaw, dirPitch);
    overlay.style.setProperty('--zoom-x', `${zoomPos.x}%`);
    overlay.style.setProperty('--zoom-y', `${zoomPos.y}%`);

    // Phase 1: Zoom camera vào hướng hotspot + overlay tối dần
    this.vrViewer.lookAt(dirYaw, dirPitch - 5, 60);
    overlay.className = 'transition-overlay zoom-forward';

    setTimeout(() => {
      // Phase 2: Load scene mới (overlay đã phủ kín)
      this._directLoadScene(scene);

      // Phase 3: Fade in scene mới
      setTimeout(() => {
        overlay.className = 'transition-overlay fade-in';
        setTimeout(() => {
          overlay.className = 'transition-overlay';
          this.isTransitioning = false;
        }, 600);
      }, 250);
    }, 500);
  }

  /**
   * Chuyển vị trí yaw/pitch thành tọa độ % trên màn hình
   * để radial-gradient zoom vào đúng hướng
   */
  _calcScreenPosition(targetYaw, targetPitch) {
    const currentYaw = this.vrViewer.getYaw();
    const currentPitch = this.vrViewer.getPitch();

    let diffYaw = targetYaw - currentYaw;
    while (diffYaw > 180) diffYaw -= 360;
    while (diffYaw < -180) diffYaw += 360;

    const hfov = this.vrViewer.getHfov();
    const x = 50 + (diffYaw / hfov) * 100;
    const y = 50 - ((targetPitch - currentPitch) / (hfov * 0.6)) * 100;

    return {
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y))
    };
  }

  _directLoadScene(scene) {
    if (!scene) return;
    this._showLoading();
    this.vrViewer.loadScene(scene);

    this.vrViewer.onLoad(() => {
      this.hotspotManager.renderHotspots(
        scene.hotspots,
        (hs) => this._handleNavClick(hs),
        (hs) => this._handleInfoClick(hs)
      );
      this._hideLoading();
    });

    this.vrViewer.onError(() => {
      this._hideLoading();
      this.isTransitioning = false;
      Helpers.toast('Không thể tải ảnh 360°', 'error');
    });

    this._updateTitle(scene.title);
    this._updateSceneCounter();

    if (this.onSceneChange) {
      this.onSceneChange(scene);
    }
  }

  _handleNavClick(hotspot) {
    if (this.isTransitioning) return;

    const targetScene = SampleData.getSceneById(hotspot.targetSceneId);
    if (!targetScene) {
      Helpers.toast('Không tìm thấy scene đích', 'error');
      return;
    }

    if (hotspot.targetYaw !== undefined) {
      targetScene.defaultYaw = hotspot.targetYaw;
    }
    if (hotspot.targetPitch !== undefined) {
      targetScene.defaultPitch = hotspot.targetPitch;
    }

    // Cập nhật index trong scene list (nếu có)
    const idx = this.sceneList.findIndex(s => s.sceneId === hotspot.targetSceneId);
    if (idx >= 0) {
      this.currentIndex = idx;
    } else {
      this.sceneList.push(targetScene);
      this.currentIndex = this.sceneList.length - 1;
    }

    // Chuyển cảnh với hiệu ứng, zoom vào hướng hotspot
    this._transitionToScene(targetScene, hotspot.yaw, hotspot.pitch);
  }

  _handleInfoClick(hotspot) {
    const popup = Helpers.$('#info-popup');
    const title = Helpers.$('#info-title');
    const content = Helpers.$('#info-content');
    const image = Helpers.$('#info-image');
    const url = Helpers.$('#info-url');

    title.textContent = hotspot.infoTitle || hotspot.label;
    content.textContent = hotspot.infoContent || '';

    if (hotspot.infoImage) {
      image.src = hotspot.infoImage;
      Helpers.show(image);
    } else {
      Helpers.hide(image);
    }

    if (hotspot.infoUrl) {
      url.href = hotspot.infoUrl;
      Helpers.show(url);
    } else {
      Helpers.hide(url);
    }

    Helpers.show(popup);
  }

  _updateSceneCounter() {
    const counter = Helpers.$('#scene-counter');
    const prevBtn = Helpers.$('#btn-prev-scene');
    const nextBtn = Helpers.$('#btn-next-scene');

    const multi = this.sceneList.length > 1;
    Helpers[multi ? 'show' : 'hide'](counter);
    Helpers[multi ? 'show' : 'hide'](prevBtn);
    Helpers[multi ? 'show' : 'hide'](nextBtn);

    if (!multi) return;

    if (counter) counter.textContent = `${this.currentIndex + 1} / ${this.sceneList.length}`;
    if (prevBtn) prevBtn.disabled = this.currentIndex === 0;
    if (nextBtn) nextBtn.disabled = this.currentIndex === this.sceneList.length - 1;
  }

  reset() {
    this.sceneList = [];
    this.currentIndex = 0;
    this.isTransitioning = false;
    Helpers.hide('#scene-counter');
    Helpers.hide('#btn-prev-scene');
    Helpers.hide('#btn-next-scene');
  }

  _showLoading() {
    Helpers.show('#loading-overlay');
  }

  _hideLoading() {
    Helpers.hide('#loading-overlay');
  }

  _updateTitle(title) {
    const el = Helpers.$('#vr-title');
    if (el) el.textContent = title;
  }
}

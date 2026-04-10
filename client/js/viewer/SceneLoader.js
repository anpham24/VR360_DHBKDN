/**
 * SceneLoader — Load và chuyển đổi giữa các scene VR360
 */
class SceneLoader {
  constructor(vrViewer, hotspotManager) {
    this.vrViewer = vrViewer;
    this.hotspotManager = hotspotManager;
    this.currentSceneId = null;
    this.onSceneChange = null;
  }

  async loadScene(scene) {
    this._showLoading();
    this.currentSceneId = scene.sceneId;

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
      Helpers.toast('Không thể tải ảnh 360°', 'error');
    });

    this._updateTitle(scene.title);

    if (this.onSceneChange) {
      this.onSceneChange(scene);
    }
  }

  _handleNavClick(hotspot) {
    const targetScene = SampleData.getSceneById(hotspot.targetSceneId);
    if (targetScene) {
      if (hotspot.targetYaw !== undefined) {
        targetScene.defaultYaw = hotspot.targetYaw;
      }
      if (hotspot.targetPitch !== undefined) {
        targetScene.defaultPitch = hotspot.targetPitch;
      }
      this.loadScene(targetScene);
    } else {
      Helpers.toast('Không tìm thấy scene đích', 'error');
    }
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

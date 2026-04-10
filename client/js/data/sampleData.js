/**
 * Dữ liệu mẫu — dùng tạm ở Phase 1-2 trước khi có backend
 * Phase 3 sẽ thay bằng gọi API thật
 */
const SampleData = {
  tour: {
    tourId: 'tour-001',
    name: 'Đại học Bách khoa - Đại học Đà Nẵng',
    description: 'Tham quan thực tế ảo khuôn viên Đại học Bách khoa Đà Nẵng',
    mapCenter: { lat: 16.0748, lng: 108.1510 },
    mapZoom: 17,
    defaultSceneId: 'scene-001'
  },

  locations: [
    {
      locationId: 'loc-001',
      tourId: 'tour-001',
      name: 'Cổng chính',
      description: 'Cổng chính Đại học Bách khoa Đà Nẵng - 54 Nguyễn Lương Bằng',
      thumbnail: 'assets/images/placeholder.jpg',
      markerLat: 16.0740,
      markerLng: 108.1498,
      scenes: ['scene-001']
    },
    {
      locationId: 'loc-002',
      tourId: 'tour-001',
      name: 'Thư viện',
      description: 'Thư viện trung tâm - nơi học tập và nghiên cứu',
      thumbnail: 'assets/images/placeholder.jpg',
      markerLat: 16.0755,
      markerLng: 108.1515,
      scenes: ['scene-002']
    },
    {
      locationId: 'loc-003',
      tourId: 'tour-001',
      name: 'Giảng đường A',
      description: 'Tòa nhà giảng đường chính với các phòng học lớn',
      thumbnail: 'assets/images/placeholder.jpg',
      markerLat: 16.0752,
      markerLng: 108.1505,
      scenes: ['scene-003']
    },
    {
      locationId: 'loc-004',
      tourId: 'tour-001',
      name: 'Sân trường',
      description: 'Khuôn viên trung tâm - nơi tổ chức các hoạt động',
      thumbnail: 'assets/images/placeholder.jpg',
      markerLat: 16.0748,
      markerLng: 108.1510,
      scenes: ['scene-004']
    },
    {
      locationId: 'loc-005',
      tourId: 'tour-001',
      name: 'Nhà ăn sinh viên',
      description: 'Căn tin phục vụ ăn uống cho sinh viên và giảng viên',
      thumbnail: 'assets/images/placeholder.jpg',
      markerLat: 16.0742,
      markerLng: 108.1520,
      scenes: ['scene-005']
    }
  ],

  scenes: [
    {
      sceneId: 'scene-001',
      locationId: 'loc-001',
      title: 'Cổng chính - Nhìn vào trường',
      imageUrl: 'https://pannellum.org/images/alma.jpg',
      thumbnail: 'assets/images/placeholder.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-001',
          sceneId: 'scene-001',
          type: 'nav',
          yaw: 50,
          pitch: -5,
          label: 'Đi đến Sân trường',
          targetSceneId: 'scene-004',
          targetYaw: 180,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-002',
          sceneId: 'scene-001',
          type: 'info',
          yaw: -30,
          pitch: 0,
          label: 'Bảng tên trường',
          infoTitle: 'Đại học Bách khoa - ĐH Đà Nẵng',
          infoContent: 'Trường Đại học Bách khoa, thành lập năm 1975, là trường đào tạo kỹ thuật hàng đầu miền Trung.',
          infoImage: '',
          infoUrl: ''
        }
      ]
    },
    {
      sceneId: 'scene-002',
      locationId: 'loc-002',
      title: 'Thư viện - Tầng 1',
      imageUrl: 'https://pannellum.org/images/cerro-toco-0.jpg',
      thumbnail: 'assets/images/placeholder.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-003',
          sceneId: 'scene-002',
          type: 'nav',
          yaw: 120,
          pitch: -10,
          label: 'Ra Sân trường',
          targetSceneId: 'scene-004',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-004',
          sceneId: 'scene-002',
          type: 'info',
          yaw: -60,
          pitch: 5,
          label: 'Phòng đọc',
          infoTitle: 'Phòng đọc tự do',
          infoContent: 'Mở cửa từ 7:00 - 21:00 hàng ngày. Sức chứa 200 chỗ ngồi.',
          infoImage: '',
          infoUrl: ''
        }
      ]
    },
    {
      sceneId: 'scene-003',
      locationId: 'loc-003',
      title: 'Giảng đường A - Sảnh',
      imageUrl: 'https://pannellum.org/images/alma.jpg',
      thumbnail: 'assets/images/placeholder.jpg',
      defaultYaw: 90,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-005',
          sceneId: 'scene-003',
          type: 'nav',
          yaw: -90,
          pitch: -5,
          label: 'Ra Sân trường',
          targetSceneId: 'scene-004',
          targetYaw: 90,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-004',
      locationId: 'loc-004',
      title: 'Sân trường - Trung tâm',
      imageUrl: 'https://pannellum.org/images/cerro-toco-0.jpg',
      thumbnail: 'assets/images/placeholder.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 110,
      hotspots: [
        {
          hotspotId: 'hs-006',
          sceneId: 'scene-004',
          type: 'nav',
          yaw: 0,
          pitch: -5,
          label: 'Đi đến Cổng chính',
          targetSceneId: 'scene-001',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-007',
          sceneId: 'scene-004',
          type: 'nav',
          yaw: 90,
          pitch: -5,
          label: 'Đi đến Thư viện',
          targetSceneId: 'scene-002',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-008',
          sceneId: 'scene-004',
          type: 'nav',
          yaw: -90,
          pitch: -5,
          label: 'Đi đến Giảng đường A',
          targetSceneId: 'scene-003',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-009',
          sceneId: 'scene-004',
          type: 'nav',
          yaw: 180,
          pitch: -5,
          label: 'Đi đến Nhà ăn',
          targetSceneId: 'scene-005',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-005',
      locationId: 'loc-005',
      title: 'Nhà ăn sinh viên',
      imageUrl: 'https://pannellum.org/images/alma.jpg',
      thumbnail: 'assets/images/placeholder.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-010',
          sceneId: 'scene-005',
          type: 'nav',
          yaw: 0,
          pitch: -5,
          label: 'Ra Sân trường',
          targetSceneId: 'scene-004',
          targetYaw: 180,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-011',
          sceneId: 'scene-005',
          type: 'info',
          yaw: 90,
          pitch: 0,
          label: 'Thực đơn',
          infoTitle: 'Nhà ăn sinh viên',
          infoContent: 'Phục vụ bữa sáng, trưa, tối. Giá từ 15.000 - 30.000 VNĐ.',
          infoImage: '',
          infoUrl: ''
        }
      ]
    }
  ],

  getSceneById(sceneId) {
    return this.scenes.find(s => s.sceneId === sceneId) || null;
  },

  getLocationById(locationId) {
    return this.locations.find(l => l.locationId === locationId) || null;
  },

  getScenesForLocation(locationId) {
    return this.scenes.filter(s => s.locationId === locationId);
  }
};

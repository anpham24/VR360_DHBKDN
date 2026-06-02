/**
 * Dữ liệu mẫu — dùng cho VR360 campus tour
 * Mỗi location có posX, posY (%) xác định vị trí hotspot trên ảnh campus
 *   → Toạ độ tính theo % KÍCH THƯỚC ẢNH bản đồ (không phụ thuộc khung hiển thị)
 * Mỗi scene có nav hotspots kiểu Google Street View (mũi tên trên mặt đất)
 */
const SampleData = {
  tour: {
    tourId: 'tour-001',
    name: 'Đại học Bách khoa - Đại học Đà Nẵng',
    description: 'Tham quan thực tế ảo khuôn viên Đại học Bách khoa Đà Nẵng',
    campusImage: 'assets/panoramas/congchinh.png'
  },

  locations: [
    {
      locationId: 'loc-congchinh',
      tourId: 'tour-001',
      name: 'Cổng Chính',
      description: 'Cổng chính Đại học Bách khoa Đà Nẵng - 54 Nguyễn Lương Bằng',
      posX: 43,
      posY: 84,
      scenes: ['scene-cc-01', 'scene-cc-02', 'scene-cc-03', 'scene-cc-04'],
      hasScenes: true
    },
    {
      locationId: 'loc-hoitruongkhuf',
      tourId: 'tour-001',
      name: 'Hội Trường Khu F',
      description: 'Hội trường lớn khu F - nơi tổ chức sự kiện',
      posX: 46,
      posY: 23,
      scenes: [],
      hasScenes: false
    },
    {
      locationId: 'loc-khuf',
      tourId: 'tour-001',
      name: 'Khu F',
      description: 'Tòa nhà khu F - giảng đường và phòng thực hành',
      posX: 44,
      posY: 16,
      scenes: [],
      hasScenes: false
    },
    {
      locationId: 'loc-khua',
      tourId: 'tour-001',
      name: 'Khu A',
      description: 'Khu A - Giảng đường chính',
      posX: 61,
      posY: 16,
      scenes: [],
      hasScenes: false
    },
    {
      locationId: 'loc-khub',
      tourId: 'tour-001',
      name: 'Khu B',
      description: 'Khu B - Phòng học và thí nghiệm',
      posX: 57,
      posY: 37,
      scenes: [],
      hasScenes: false
    },
    {
      locationId: 'loc-khuc',
      tourId: 'tour-001',
      name: 'Khu C',
      description: 'Khu C',
      posX: 75,
      posY: 31,
      scenes: [],
      hasScenes: false
    },
    {
      locationId: 'loc-khue',
      tourId: 'tour-001',
      name: 'Khu E',
      description: 'Khu E',
      posX: 82,
      posY: 10,
      scenes: [],
      hasScenes: false
    },
    {
      locationId: 'loc-khuh',
      tourId: 'tour-001',
      name: 'Khu H',
      description: 'Tòa nhà khu H - giảng đường và phòng thực hành',
      posX: 39.5,
      posY: 18,
      scenes: ['scene-kh-01', 'scene-kh-02', 'scene-kh-03', 'scene-kh-04', 'scene-kh-05', 'scene-kh-06', 'scene-kh-07'],
      hasScenes: true
    },
    {
      locationId: 'loc-nhaxekhub',
      tourId: 'tour-001',
      name: 'Nhà Xe Khu B',
      description: 'Nhà xe khu B - bãi gửi xe sinh viên',
      posX: 35.6,
      posY: 38,
      scenes: [],
      hasScenes: false
    },
    {
      locationId: 'loc-trungtamhoclieu',
      tourId: 'tour-001',
      name: 'Trung Tâm Học Liệu',
      description: 'Trung tâm học liệu - thư viện và tài liệu',
      posX: 45,
      posY: 45,
      scenes: [],
      hasScenes: false
    },
    {
      locationId: 'loc-congphu',
      tourId: 'tour-001',
      name: 'Cổng Phụ',
      description: 'Cổng phụ',
      posX: 66,
      posY: 39,
      scenes: [],
      hasScenes: false
    },
    {
      locationId: 'loc-loivaocongphu',
      tourId: 'tour-001',
      name: 'Lối Vào Cổng Phụ',
      description: 'Lối vào cổng phụ',
      posX: 82,
      posY: 43,
      scenes: [],
      hasScenes: false
    },
    {
      locationId: 'loc-toanhathongminh',
      tourId: 'tour-001',
      name: 'Tòa Nhà Thông Minh',
      description: 'Tòa nhà thông minh',
      posX: 77.5,
      posY: 7,
      scenes: [],
      hasScenes: false
    }
  ],

  scenes: [
    // ====================== CỔNG CHÍNH (anh1 → anh4) ======================
    {
      sceneId: 'scene-cc-01',
      locationId: 'loc-congchinh',
      title: 'Cổng Chính - Ảnh 1/4',
      imageUrl: 'assets/panoramas/CongChinh/anh1.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-cc01-next',
          sceneId: 'scene-cc-01',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-cc-02',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-cc-02',
      locationId: 'loc-congchinh',
      title: 'Cổng Chính - Ảnh 2/4',
      imageUrl: 'assets/panoramas/CongChinh/anh2.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-cc02-prev',
          sceneId: 'scene-cc-02',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-cc-01',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-cc02-next',
          sceneId: 'scene-cc-02',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-cc-03',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-cc-03',
      locationId: 'loc-congchinh',
      title: 'Cổng Chính - Ảnh 3/4',
      imageUrl: 'assets/panoramas/CongChinh/anh3.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-cc03-prev',
          sceneId: 'scene-cc-03',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-cc-02',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-cc03-next',
          sceneId: 'scene-cc-03',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-cc-04',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-cc-04',
      locationId: 'loc-congchinh',
      title: 'Cổng Chính - Ảnh 4/4',
      imageUrl: 'assets/panoramas/CongChinh/anh4.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-cc04-prev',
          sceneId: 'scene-cc-04',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-cc-03',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },

    // ====================== KHU H (anh5 → anh11) ======================
    {
      sceneId: 'scene-kh-01',
      locationId: 'loc-khuh',
      title: 'Khu H - Ảnh 1/7',
      imageUrl: 'assets/panoramas/KhuH/anh5.jpeg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-kh01-next',
          sceneId: 'scene-kh-01',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-kh-02',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-kh-02',
      locationId: 'loc-khuh',
      title: 'Khu H - Ảnh 2/7',
      imageUrl: 'assets/panoramas/KhuH/anh6.jpeg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-kh02-prev',
          sceneId: 'scene-kh-02',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-kh-01',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-kh02-next',
          sceneId: 'scene-kh-02',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-kh-03',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-kh-03',
      locationId: 'loc-khuh',
      title: 'Khu H - Ảnh 3/7',
      imageUrl: 'assets/panoramas/KhuH/anh7.jpeg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-kh03-prev',
          sceneId: 'scene-kh-03',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-kh-02',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-kh03-next',
          sceneId: 'scene-kh-03',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-kh-04',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-kh-04',
      locationId: 'loc-khuh',
      title: 'Khu H - Ảnh 4/7',
      imageUrl: 'assets/panoramas/KhuH/anh8.jpeg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-kh04-prev',
          sceneId: 'scene-kh-04',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-kh-03',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-kh04-next',
          sceneId: 'scene-kh-04',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-kh-05',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-kh-05',
      locationId: 'loc-khuh',
      title: 'Khu H - Ảnh 5/7',
      imageUrl: 'assets/panoramas/KhuH/anh9.jpeg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-kh05-prev',
          sceneId: 'scene-kh-05',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-kh-04',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-kh05-next',
          sceneId: 'scene-kh-05',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-kh-06',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-kh-06',
      locationId: 'loc-khuh',
      title: 'Khu H - Ảnh 6/7',
      imageUrl: 'assets/panoramas/KhuH/anh10.jpeg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-kh06-prev',
          sceneId: 'scene-kh-06',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-kh-05',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-kh06-next',
          sceneId: 'scene-kh-06',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-kh-07',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-kh-07',
      locationId: 'loc-khuh',
      title: 'Khu H - Ảnh 7/7',
      imageUrl: 'assets/panoramas/KhuH/anh11.jpeg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-kh07-prev',
          sceneId: 'scene-kh-07',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-kh-06',
          targetYaw: 0,
          targetPitch: 0
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

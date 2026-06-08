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
      posX: 42.9,
      posY: 86.4,
      scenes: ['scene-cc-01', 'scene-cc-02', 'scene-cc-03', 'scene-cc-04'],
      hasScenes: true
    },
    {
      locationId: 'loc-hoitruongkhuf',
      tourId: 'tour-001',
      name: 'Hội Trường Khu F',
      description: 'Hội trường lớn khu F - nơi tổ chức sự kiện',
      posX: 52.0,
      posY: 29.8,
      scenes: ['scene-htf-01'],
      hasScenes: true
    },
    {
      locationId: 'loc-khuf',
      tourId: 'tour-001',
      name: 'Khu F',
      description: 'Tòa nhà khu F - giảng đường và phòng thực hành',
      posX: 45.9,
      posY: 22.7,
      scenes: ['scene-kf-01', 'scene-kf-02', 'scene-kf-03'],
      hasScenes: true,
      startSceneIndex: 1
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
      scenes: ['scene-kb-01'],
      hasScenes: true
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
      posX: 84,
      posY: 20,
      scenes: ['scene-ke-01', 'scene-ke-02', 'scene-ke-03', 'scene-ke-04', 'scene-ke-05'],
      hasScenes: true
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
      scenes: ['scene-tthl-01'],
      hasScenes: true
    },
    {
      locationId: 'loc-congphu',
      tourId: 'tour-001',
      name: 'Cổng Phụ',
      description: 'Cổng phụ',
      posX: 66,
      posY: 39,
      scenes: ['scene-cp-01'],
      hasScenes: true
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
      posX: 78.5,
      posY: 11.5,
      scenes: ['scene-tn-01', 'scene-tn-02', 'scene-tn-03', 'scene-tn-04', 'scene-tn-05'],
      hasScenes: true
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
    },

    // ============ TÒA NHÀ THÔNG MINH (anh12 → anh16) ============
    {
      sceneId: 'scene-tn-01',
      locationId: 'loc-toanhathongminh',
      title: 'Tòa Nhà Thông Minh - Ảnh 1/5',
      imageUrl: 'assets/panoramas/ToaNhaKhuE/anh12.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-tn01-next',
          sceneId: 'scene-tn-01',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-tn-02',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-tn-02',
      locationId: 'loc-toanhathongminh',
      title: 'Tòa Nhà Thông Minh - Ảnh 2/5',
      imageUrl: 'assets/panoramas/ToaNhaKhuE/anh13.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-tn02-prev',
          sceneId: 'scene-tn-02',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-tn-01',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-tn02-next',
          sceneId: 'scene-tn-02',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-tn-03',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-tn-03',
      locationId: 'loc-toanhathongminh',
      title: 'Tòa Nhà Thông Minh - Ảnh 3/5',
      imageUrl: 'assets/panoramas/ToaNhaKhuE/anh14.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-tn03-prev',
          sceneId: 'scene-tn-03',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-tn-02',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-tn03-next',
          sceneId: 'scene-tn-03',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-tn-04',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-tn-04',
      locationId: 'loc-toanhathongminh',
      title: 'Tòa Nhà Thông Minh - Ảnh 4/5',
      imageUrl: 'assets/panoramas/ToaNhaKhuE/anh15.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-tn04-prev',
          sceneId: 'scene-tn-04',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-tn-03',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-tn04-next',
          sceneId: 'scene-tn-04',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-tn-05',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-tn-05',
      locationId: 'loc-toanhathongminh',
      title: 'Tòa Nhà Thông Minh - Ảnh 5/5',
      imageUrl: 'assets/panoramas/ToaNhaKhuE/anh16.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-tn05-prev',
          sceneId: 'scene-tn-05',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-tn-04',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },

    // ============ KHU E (anh16 → anh12, đảo ngược) ============
    {
      sceneId: 'scene-ke-01',
      locationId: 'loc-khue',
      title: 'Khu E - Ảnh 1/5',
      imageUrl: 'assets/panoramas/ToaNhaKhuE/anh16.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-ke01-next',
          sceneId: 'scene-ke-01',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-ke-02',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-ke-02',
      locationId: 'loc-khue',
      title: 'Khu E - Ảnh 2/5',
      imageUrl: 'assets/panoramas/ToaNhaKhuE/anh15.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-ke02-prev',
          sceneId: 'scene-ke-02',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-ke-01',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-ke02-next',
          sceneId: 'scene-ke-02',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-ke-03',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-ke-03',
      locationId: 'loc-khue',
      title: 'Khu E - Ảnh 3/5',
      imageUrl: 'assets/panoramas/ToaNhaKhuE/anh14.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-ke03-prev',
          sceneId: 'scene-ke-03',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-ke-02',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-ke03-next',
          sceneId: 'scene-ke-03',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-ke-04',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-ke-04',
      locationId: 'loc-khue',
      title: 'Khu E - Ảnh 4/5',
      imageUrl: 'assets/panoramas/ToaNhaKhuE/anh13.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-ke04-prev',
          sceneId: 'scene-ke-04',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-ke-03',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-ke04-next',
          sceneId: 'scene-ke-04',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-ke-05',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-ke-05',
      locationId: 'loc-khue',
      title: 'Khu E - Ảnh 5/5',
      imageUrl: 'assets/panoramas/ToaNhaKhuE/anh12.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-ke05-prev',
          sceneId: 'scene-ke-05',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-ke-04',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },

    // ====================== HỘI TRƯỜNG KHU F (anh17) ======================
    {
      sceneId: 'scene-htf-01',
      locationId: 'loc-hoitruongkhuf',
      title: 'Hội Trường Khu F',
      imageUrl: 'assets/panoramas/HoiTruongKhuF/anh17.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: []
    },

    // ====================== KHU F (anh18 → anh20, mở ở anh19) ======================
    {
      sceneId: 'scene-kf-01',
      locationId: 'loc-khuf',
      title: 'Khu F - Ảnh 1/3',
      imageUrl: 'assets/panoramas/KhuF/anh18.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-kf01-next',
          sceneId: 'scene-kf-01',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-kf-02',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-kf-02',
      locationId: 'loc-khuf',
      title: 'Khu F - Ảnh 2/3',
      imageUrl: 'assets/panoramas/KhuF/anh19.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-kf02-prev',
          sceneId: 'scene-kf-02',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-kf-01',
          targetYaw: 0,
          targetPitch: 0
        },
        {
          hotspotId: 'hs-kf02-next',
          sceneId: 'scene-kf-02',
          type: 'nav',
          yaw: 0,
          pitch: -30,
          label: 'Đi tiếp',
          targetSceneId: 'scene-kf-03',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },
    {
      sceneId: 'scene-kf-03',
      locationId: 'loc-khuf',
      title: 'Khu F - Ảnh 3/3',
      imageUrl: 'assets/panoramas/KhuF/anh20.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: [
        {
          hotspotId: 'hs-kf03-prev',
          sceneId: 'scene-kf-03',
          type: 'nav',
          yaw: 180,
          pitch: -30,
          label: 'Quay lại',
          targetSceneId: 'scene-kf-02',
          targetYaw: 0,
          targetPitch: 0
        }
      ]
    },

    // ====================== KHU B (anh21) ======================
    {
      sceneId: 'scene-kb-01',
      locationId: 'loc-khub',
      title: 'Khu B',
      imageUrl: 'assets/panoramas/KhuB/anh21.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: []
    },

    // ====================== TRUNG TÂM HỌC LIỆU (anh22) ======================
    {
      sceneId: 'scene-tthl-01',
      locationId: 'loc-trungtamhoclieu',
      title: 'Trung Tâm Học Liệu',
      imageUrl: 'assets/panoramas/TrungTamHocLieu/anh22.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: []
    },

    // ====================== CỔNG PHỤ (anh23) ======================
    {
      sceneId: 'scene-cp-01',
      locationId: 'loc-congphu',
      title: 'Cổng Phụ',
      imageUrl: 'assets/panoramas/CongPhu/anh23.jpg',
      defaultYaw: 0,
      defaultPitch: 0,
      defaultHfov: 100,
      hotspots: []
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

import type { Snap, Channel, User, ApiResponse } from "../types";

// Mock data for development when backend is unavailable
export const mockUser: User = {
  id: 1,
  email: "test@example.com",
  name: "테스트 사용자",
  avatar: "/avatar.png",
  gender: "MALE",
  isActive: true,
  isVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  followings: [],
};

export const mockChannels: Channel[] = [
  {
    id: 1,
    name: "현호세상",
    avatar: "/avatar.png",
    instruction: "현호의 세상에 오신 것을 환영합니다",
    authorId: 1,
    author: mockUser,
    followers: [mockUser],
    snaps: []
  },
  {
    id: 2,
    name: "일상 이야기",
    avatar: "/avatar.png",
    instruction: "일상의 소소한 이야기들",
    authorId: 2,
    followers: [],
    snaps: []
  }
];

export const mockSnaps: Snap[] = [
  {
    id: 1,
    title: "사랑을 위해 17대 1을 한다",
    duration: 180,
    views: 1200,
    audio: "/audio/sample1.mp3",
    streamUrl: "/audio/sample1.mp3",
    channelId: 1,
    authorId: 1,
    channel: mockChannels[0],
    author: mockUser,
    tags: [
      { id: 1, name: "연애", snaps: [] },
      { id: 2, name: "현피", snaps: [] }
    ],
    contexts: [
      {
        id: 1,
        roles: [
          {
            id: 1,
            name: "호스트",
            type: "HOST",
            personality: "친근한 진행자",
            volume_db: 0,
          }
        ],
        message: "안녕하세요, 오늘은 연애 이야기를 해보겠습니다.",
        timeline: 0,
        snapId: 1
      },
      {
        id: 2,
        roles: [
          {
            id: 2,
            name: "게스트",
            type: "CHARACTER",
            personality: "경험이 많은 조언자",
            volume_db: -2,
          }
        ],
        message: "17대 1이라니, 정말 치열한 경쟁이네요!",
        timeline: 30,
        snapId: 1
      }
    ]
  },
  {
    id: 2,
    title: "직장 생활의 고충",
    duration: 240,
    views: 890,
    audio: "/audio/sample2.mp3",
    streamUrl: "/audio/sample2.mp3",
    channelId: 1,
    authorId: 1,
    channel: mockChannels[0],
    author: mockUser,
    tags: [
      { id: 3, name: "직장", snaps: [] },
      { id: 4, name: "스트레스", snaps: [] }
    ],
    contexts: []
  },
  {
    id: 3,
    title: "맛집 탐방기",
    duration: 200,
    views: 650,
    audio: "/audio/sample3.mp3",
    streamUrl: "/audio/sample3.mp3",
    channelId: 2,
    authorId: 2,
    channel: mockChannels[1],
    tags: [
      { id: 5, name: "음식", snaps: [] },
      { id: 6, name: "여행", snaps: [] }
    ],
    contexts: []
  }
];

// Update channel snaps references
mockChannels[0].snaps = [mockSnaps[0], mockSnaps[1]];
mockChannels[1].snaps = [mockSnaps[2]];

export const createMockApiResponse = <T>(data: T): ApiResponse<T> => ({
  data,
  success: true,
  timestamp: new Date().toISOString()
});

export const mockApiDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));
import { ChatMessage } from '../../../domain/entities/ChatMessage';

export const SUGGESTED_PROMPTS = [
  {
    id: '1',
    icon: '🗺️',
    title: 'Lập lịch trình',
    prompt:
      'Lập lịch trình du lịch Phú Quốc 4 ngày 3 đêm, ngân sách 15 triệu, thích lặn biển và ăn hải sản',
  },
  {
    id: '2',
    icon: '🤖',
    title: 'Smart Plan',
    prompt: 'smartplan:Đà Nẵng:2025-12-20:3:10000000:personal', // ✅ MỚI: SPECIAL FORMAT
  },
  {
    id: '3',
    icon: '📍',
    title: 'Gợi ý điểm đến',
    prompt:
      'Gợi ý điểm đến phù hợp với leo núi, không khí lạnh, săn mây, ngân sách tiết kiệm, đi 3 ngày',
  },
  {
    id: '4',
    icon: '📝',
    title: 'Viết blog',
    prompt:
      'Viết blog về Top 5 quán cà phê đẹp nhất Đà Lạt, phong cách thơ mộng',
  },
];

export const MOCK_CHAT_HISTORY: ChatMessage[] = [
  {
    id: '1',
    text: 'Xin chào! 👋 Tôi là trợ lý AI du lịch.\n\nTôi có thể giúp bạn:\n\n🗺️ Lập lịch trình du lịch chi tiết\n🤖 Tạo Smart Plan (lịch trình thông minh)\n📍 Gợi ý điểm đến phù hợp\n✈️ Tìm vé máy bay, khách sạn\n📝 Viết blog, review du lịch\n\nBạn muốn tìm hiểu về điều gì?',
    sender: 'ai',
    timestamp: new Date(Date.now() - 60000),
  },
];

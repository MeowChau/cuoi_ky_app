// --- AI Services ---

export const AI_PLAN_TRIP = `${BASE_URL}/ai/plan-trip`; // POST
/*
Request body
    {
        "destination": "Phú Quốc",
        "duration": "4 ngày 3 đêm",
        "budget": "15 triệu",
        "interests": [
            "lặn biển",
            "hải sản",
            "ngắm hoàng hôn"
        ],
        "travelStyle": "nghỉ dưỡng",
        "groupSize": "2 người lớn",
        "startDate": "2025-07-20"
    }
Response body (200 - OK)
    {
        "success": true,
        "message": "Tạo lịch trình thành công",
        "plan": "# Lịch trình du lịch Phú Quốc 4 ngày 3 đêm\n\n## Ngày 1 (20/07/2025 - Chủ Nhật)\n### Buổi sáng:\n- **Hoạt động chính:** Đến Phú Quốc...",
        "usage": {
            "prompt_tokens": 442,
            "completion_tokens": 1546,
            "total_tokens": 1988
        },
        "metadata": {
            "destination": "Phú Quốc",
            "duration": "4 ngày 3 đêm",
            "budget": "15 triệu",
            "generatedAt": "2025-12-07T14:07:43.061Z"
        }
    }
*/

export const AI_GENERATE_CONTENT = `${BASE_URL}/ai/generate-content`; // POST
/*
Request body
    {
        "type": "blog",
        "topic": "Top 5 quán cà phê đẹp nhất",
        "destination": "Đà Lạt",
        "length": "medium",
        "style": "Thơ mộng, chill",
        "language": "Vietnamese"
    }
Response body (200 - OK)
    {
        "success": true,
        "message": "Sinh nội dung thành công",
        "content": "# Top 5 Quán Cà Phê Mộng Mơ Tại Đà Lạt\n\nĐà Lạt không chỉ có sương mù...",
        "usage": {
            "prompt_tokens": 0,
            "completion_tokens": 0,
            "total_tokens": 0
        },
        "timestamp": "2025-12-13T04:47:51.166Z"
    }
*/

export const AI_RECOMMENDATIONS = `${BASE_URL}/ai/recommendations`; // POST
/*
Request body
    {
        "preferences": [
            "leo núi",
            "không khí lạnh",
            "săn mây"
        ],
        "budget": "Tiết kiệm",
        "duration": "3 ngày",
        "season": "Tháng 11",
        "previousDestinations": [
            "Sapa",
            "Đà Lạt"
        ]
    }
Response body (200 - OK)
    {
        "success": true,
        "message": "Gợi ý điểm đến thành công",
        "recommendations": "```json\n[\n  {\n    \"Tên điểm đến\": \"Mù Cang Chải\",\n    \"Quốc gia/Thành phố\": \"Việt Nam\",\n    \"Lý do phù hợp\": \"Mù Cang Chải nổi tiếng với...\",\n    \"Chi phí ước tính\": \"2.500.000 VND\"\n  }\n]\n```",
        "usage": {
            "prompt_tokens": 279,
            "completion_tokens": 1146,
            "total_tokens": 1425
        },
        "metadata": {
            "budget": "Tiết kiệm",
            "duration": "3 ngày",
            "season": "Tháng 11",
            "generatedAt": "2025-12-07T14:09:13.465Z"
        }
    }
*/

export const AI_CHAT = `${BASE_URL}/ai/chat`; // POST
/*
Request body
    {
        "message": "Tìm vé máy bay từ Hà Nội đi Đà Nẵng ngày 20/12/2025",
        "conversationHistory": []
    }
Response body (200 - OK)
    {
        "success": true,
        "message": "Phản hồi AI thành công",
        "response": "```json\n{\n \"type\": \"flight_results\",\n \"summary\": \"Tìm thấy 5 chuyến bay...\"\n}\n```",
        "usage": {
            "prompt_tokens": 825,
            "completion_tokens": 406,
            "total_tokens": 1231
        },
        "timestamp": "2025-12-07T10:59:08.565Z"
    }
*/

export const AI_CONVERSATION_MANAGER = `${BASE_URL}/ai/conversation`; // POST
/*
Request body
    {
        "action": "start",
        "value": "string"
    }
Response body (200 - OK)
    (Response structure not fully shown in image, implies success status)
*/
export const AI_SMART_PLAN = `${BASE_URL}/ai/smart-plan`; // POST
/*
Request body
    {
        "destination": "Đà Nẵng",
        "startDate": "2025-11-29",
        "duration": 3,
        "budget": 15000000,
        "transportMode": "personal"
    }
Response body (200 - OK)
    {
        "_id": "69231020ea53ddab8f5d3e84",
        "title": "Du lịch Đà Nẵng 3 ngày",
        "description": "Chuyến đi tự túc 3 ngày tại Đà Nẵng",
        "userId": "691d62b39db2948be42a7403",
        "startDate": "2025-11-29T00:00:00.000Z",
        "endDate": "2025-12-02T00:00:00.000Z",
        "transportMode": "personal",
        "destinations": [
            {
                "name": "Đà Nẵng",
                "arrivalDate": "2025-11-29T00:00:00.000Z",
                "departureDate": "2025-12-02T00:00:00.000Z",
                "hotels": ["Tan Vinh"],
                "restaurants": ["Cafe Win", "CafeKhanh Ly", "CaPhe Lang Tien"],
                "attractions": [],
                "_id": "69231020ea53ddab8f5d3e85"
            }
        ],
        "itinerary": [
            {
                "day": 1,
                "date": "2025-11-29T00:00:00.000Z",
                "_id": "69231020ea53ddab8f5d3e86",
                "activities": [
                    {
                        "time": "14:00",
                        "type": "checkin",
                        "title": "🏨 Check-in: Tan Vinh",
                        "duration": "1h",
                        "cost": 600000,
                        "selected": true,
                        "_id": "69231020ea53ddab8f5d3e87"
                    },
                    {
                        "time": "12:00",
                        "type": "meal",
                        "title": "🍽️ Ăn trưa: Cafe Win",
                        "cost": 150000,
                        "selected": true,
                        "_id": "69231020ea53ddab8f5d3e88"
                    },
                    {
                        "time": "19:00",
                        "type": "meal",
                        "title": "🍽️ Ăn tối: CafeKhanh Ly",
                        "cost": 300000,
                        "selected": true,
                        "_id": "69231020ea53ddab8f5d3e89"
                    }
                ]
            },
            {
                "day": 2,
                "date": "2025-11-30T00:00:00.000Z",
                "_id": "69231020ea53ddab8f5d3e8a",
                "activities": [
                    {
                        "time": "12:00",
                        "type": "meal",
                        "title": "🍽️ Ăn trưa: CafeKhanh Ly",
                        "cost": 150000,
                        "_id": "69231020ea53ddab8f5d3e8b"
                    },
                    {
                        "time": "19:00",
                        "type": "meal",
                        "title": "🍽️ Ăn tối: CaPhe Lang Tien",
                        "cost": 300000,
                        "_id": "69231020ea53ddab8f5d3e8c"
                    }
                ]
            },
            {
                "day": 3,
                "date": "2025-12-01T00:00:00.000Z",
                "_id": "69231020ea53ddab8f5d3e8d",
                "activities": [
                    {
                        "time": "12:00",
                        "type": "meal",
                        "title": "🍽️ Ăn trưa: CaPhe Lang Tien",
                        "cost": 150000,
                        "_id": "69231020ea53ddab8f5d3e8e"
                    },
                    {
                        "time": "10:00",
                        "type": "checkout",
                        "title": "🏨 Check-out & Ra sân bay",
                        "cost": 0,
                        "_id": "69231020ea53ddab8f5d3e8f"
                    }
                ]
            }
        ],
        "budget": {
            "total": 15000000,
            "spent": 0,
            "currency": "VND",
            "breakdown": {
                "flights": 2500000,
                "accommodation": 1500000,
                "food": 1050000,
                "activities": 0,
                "transport": 450000,
                "others": 500000
            }
        },
        "travelers": [
            {
                "name": "Du khách 1",
                "_id": "69231020ea53ddab8f5d3e90"
            }
        ],
        "status": "planning",
        "tags": ["ai-generated"],
        "createdAt": "2025-11-23T13:46:08.278Z",
        "updatedAt": "2025-11-23T13:46:08.278Z"
    }
*/

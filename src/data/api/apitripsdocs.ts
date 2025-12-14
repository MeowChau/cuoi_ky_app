export const CREATE_TRIP = `${BASE_URL}/trips`; // POST
/*
Request body:
    {
        "title": "Chuyến đi tự túc",
        "startDate": "2025-12-01",
        "endDate": "2025-12-05",
        "origin": "Hà Nội",
        "transportMode": "personal",
        "destinations": [],
        "budget": { "total": 5000000 }
    }
Response (201):
    {
        "message": "Tạo kế hoạch thành công",
        "trip": { ... }
    }
*/

export const SAVE_TRIP_FROM_AI = `${BASE_URL}/trips/from-ai`; // POST
/*
Request body:
    {
        "itineraryData": {
            "title": "Chuyến đi Đà Nẵng 3 ngày",
            "description": "Lịch trình tự động",
            "startDate": "2025-12-20",
            "endDate": "2025-12-23",
            "budget": { "total": 5000000 }
        },
        "costEstimate": {
            "flights": 2000000,
            "hotels": 1500000,
            "food": 1000000,
            "activities": 500000,
            "transport": 0,
            "others": 0
        }
    }
Response (201):
    {
        "success": true,
        "message": "Đã lưu lịch trình vào Dashboard!",
        "trip": { ... }
    }
*/

// Endpoint này dùng path param: /trips/{id}
export const TRIP_DETAIL = `${BASE_URL}/trips`; // GET, PUT, DELETE
/*
--- GET /trips/{id} ---
Response (200):
    {
        "trip": {
            "_id": "6932af102cc07d04bbd37d65",
            "title": "Chuyến đi Đà Nẵng",
            "itinerary": [ ... ],
            ...
        }
    }

--- PUT /trips/{id} ---
Request body:
    {
        "title": "Chuyến đi Đà Nẵng (Đã sửa)",
        "startDate": "2025-12-02",
        "endDate": "2025-12-06",
        "budget": {},
        "destinations": []
    }
Response (200): { "message": "Cập nhật thành công", "trip": {} }

--- DELETE /trips/{id} ---
Response (200): { "message": "Xóa thành công" }
*/

export const SEARCH_FLIGHTS = `${BASE_URL}/trips/search-flights`; // GET
/*
Query Params:
    - origin (required): Mã sân bay đi (VD: HAN)
    - destination (required): Mã sân bay đến (VD: DAD)
    - date (required): YYYY-MM-DD
    - returnDate (optional): YYYY-MM-DD
Response (200):
    {
        "flights": [
            {
                "airline": "Vietravel Airlines",
                "departureTime": "2025-12-20T06:25:00",
                "returnTime": null,
                "price": 1138640.22,
                "type": "oneway"
            }
        ]
    }
*/

// OpenStreetMap (OSM)

export const OSM_AUTOCOMPLETE = `${BASE_URL}/osm/autocomplete`; // GET
/*
Request URL: ${BASE_URL}/osm/autocomplete?q={keyword}
Parameters:
    - q (query): Từ khóa tìm kiếm (VD: Hồ Gươm)
Response body (200 - Success)
    [
        {
            "description": "Hồ Hoàn Kiếm, Phường Hoàn Kiếm, Hà Nội, 11024, Việt Nam",
            "secondary_description": "Hà Nội, Việt Nam",
            "place_id": "400283330",
            "locationId": "21.0288313,105.8525357",
            "resultType": "lake",
            "lat": 21.0288313,
            "lng": 105.8525357
        }
    ]
*/

// Endpoint này cần truyền {type} vào path: /osm/search/{type}
export const OSM_SEARCH = `${BASE_URL}/osm/search`; // GET
/*
Request URL: ${BASE_URL}/osm/search/{type}?q={keyword}
Parameters:
    - type (path): Loại địa điểm (hotels, restaurants, attractions, cafes)
    - q (query): Từ khóa tìm kiếm (VD: Highlands Coffee)
Response body (200 - Success)
    [
        {
            "description": "Highlands Coffee, Great Views, Phố Cầu Gỗ, Khu phố cổ, Phường Hoàn Kiếm, Hà Nội, 11024, Việt Nam",
            "secondary_description": "Hà Nội, Việt Nam",
            "place_id": "216992602",
            "locationId": "21.0323571,105.8515799",
            "resultType": "restaurant",
            "lat": 21.0323571,
            "lng": 105.8515799
        }
    ]
*/

// Endpoint này cần truyền {type} vào path: /osm/nearby/{type}
export const OSM_NEARBY = `${BASE_URL}/osm/nearby`; // GET
/*
Request URL: ${BASE_URL}/osm/nearby/{type}?lat={lat}&lng={lng}&radius={radius}
Parameters:
    - type (path): Loại địa điểm (hotels, restaurants, attractions)
    - lat (query): Vĩ độ (Example: 16.0544)
    - lng (query): Kinh độ (Example: 108.2022)
    - radius (query): Bán kính tìm kiếm bằng mét (Default: 2000)
Response body (200 - Success)
    [
        {
            "place_id": 409377103,
            "name": "Nhà Khách Quân Chủng Phòng Không- Không Quân",
            "rating": null,
            "user_ratings_total": 0,
            "vicinity": "Đường Duy Tân, Phường Hòa Cường",
            "lat": 16.0516072,
            "lng": 108.2059173,
            "photo": "https://images.pexels.com/photos/5273872/pexels-photo-5273872.jpeg",
            "types": [],
            "tags": {}
        }
    ]
*/

// Endpoint này cần truyền {placeId} vào path: /osm/details/{placeId}
export const OSM_DETAILS = `${BASE_URL}/osm/details`; // GET
/*
Request URL: ${BASE_URL}/osm/details/{placeId}
Parameters:
    - placeId (path): ID của địa điểm (Lấy từ kết quả tìm kiếm/nearby) (Example: 409377103)
Response body (200 - Success)
    {
        "place_id": 409377103,
        "name": "Nhà Khách Quân Chủng Phòng Không- Không Quân",
        "lat": 16.0516072,
        "lng": 108.2059173,
        "vicinity": "Đường Duy Tân, Phường Hòa Cường",
        "tags": {
            "phone": "+84 123 456 789",
            "website": "http://example.com"
        }
    }
*/

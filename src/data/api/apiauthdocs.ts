export const REGISTER_NEW_USER = `${BASE_URL}/auth/register`; // POST
/*
Request body
    {
        "name": "Nguyen Van A",
        "email": "test@example.com",
        "password": "password123",
        "phone": "0987654321"
    }
Response body (201 - Created)
    {
        "message": "Đăng ký thành công",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
            "id": "6932ac962cc07d04bbd37d5e",
            "email": "test@example.com",
            "name": "Nguyen Van A",
            "phone": "0987654321"
        }
    }
Response body (400 - Error)
    {
        "message": "Email đã được sử dụng"
    }
*/

export const LOGIN_USER = `${BASE_URL}/auth/login`; // POST
/*
Request body
    {
        "email": "test@example.com",
        "password": "password123"
    }
Response body (200 - Success)
    {
        "message": "Đăng nhập thành công",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
            "id": "6932ac962cc07d04bbd37d5e",
            "email": "test@example.com",
            "name": "Nguyen Van A",
            "phone": "0987654321"
        }
    }
Response body (401 - Error)
    {
        "message": "Email hoặc mật khẩu không đúng"
    }
*/

export const LOGIN_GOOGLE = `${BASE_URL}/auth/google`; // POST
/*
Request body
    {
        "token": "ya29.a0Aa..."
    }
Response body (200 - Success)
    {
        "message": "Đăng nhập thành công",
        "token": "...",
        "user": { ... }
    }
*/

export const FORGOT_PASSWORD = `${BASE_URL}/auth/forgot-password`; // POST
/*
Request body
    {
        "email": "user@example.com"
    }
Response body (200 - Success)
    {
        "message": "Nếu email tồn tại, một mã đặt lại mật khẩu đã được gửi đi."
    }
Response body (500 - Error)
    {
        "message": "Lỗi server khi xử lý quên mật khẩu hoặc gửi email thất bại."
    }
*/

// Lưu ý: Endpoint này cần truyền token vào path: /auth/reset-password/{token}
export const RESET_PASSWORD = `${BASE_URL}/auth/reset-password`; // PATCH
/*
Request URL: ${BASE_URL}/auth/reset-password/{token}
Request body
    {
        "newPassword": "NewSecurePassword123"
    }
Response body (200 - Success)
    {
        "message": "Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại."
    }
Response body (400 - Error)
    {
        "message": "Mã xác nhận không hợp lệ hoặc đã hết hạn."
    }
*/

export const GET_CURRENT_USER = `${BASE_URL}/auth/me`; // GET
/*
Headers: { Authorization: "Bearer {token}" }
Response body (200 - Success)
    {
        "user": {
            "preferences": { ... },
            "_id": "6932ac962cc07d04bbd37d5e",
            "email": "test@example.com",
            "name": "Nguyen Van A",
            "phone": "0987654321",
            "avatar": null,
            "isActive": true,
            ...
        }
    }
Response body (401 - Error)
    {
        "message": "Token không hợp lệ"
    }
*/

export const GET_USER_PROFILE = `${BASE_URL}/auth/profile`; // GET
/*
Response body (200 - Success)
    {
        "user": { ... } // Trả về thông tin user chi tiết
    }
Response body (401 - Error)
    {
        "message": "Chưa đăng nhập (Thiếu hoặc sai Token)"
    }
*/

export const UPDATE_USER_PROFILE = `${BASE_URL}/auth/profile`; // PUT
/*
Request body
    {
        "name": "string",
        "phone": "string",
        "email": "string",
        "password": "string"
    }
Response body (200 - Success)
    {
        "message": "Cập nhật thành công"
    }
Response body (400 - Error)
    {
        "message": "Email trùng lặp hoặc mật khẩu không hợp lệ"
    }
*/


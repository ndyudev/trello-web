# Trello Web

## Giới thiệu

**Trello Web** là một ứng dụng quản lý dự án dựa trên ý tưởng của Trello, được xây dựng bằng công nghệ MERN (MongoDB, Express, React, Node.js). Ứng dụng này giúp các nhóm làm việc hiệu quả hơn bằng cách cung cấp một nền tảng trực quan để quản lý bảng, danh sách và thẻ công việc.

## Tính năng

- **Xác thực người dùng**: Đăng nhập và đăng ký an toàn bằng JSON Web Tokens (JWT).
- **Quản lý bảng**: Tạo và tùy chỉnh nhiều bảng cho các dự án khác nhau.
- **Danh sách và Thẻ công việc**: Thêm danh sách vào bảng và tạo các thẻ có thể kéo thả trong mỗi danh sách.
- **Hợp tác thời gian thực**: Cập nhật ngay lập tức trên nhiều người dùng thông qua WebSocket.
- **Tìm kiếm và lọc**: Tìm nhanh các bảng, danh sách hoặc công việc cụ thể.
- **Theo dõi hoạt động**: Xem nhật ký chi tiết về các thay đổi để theo dõi tiến độ công việc.
- **Thiết kế responsive**: Tối ưu hóa cho cả giao diện máy tính để bàn và di động.

## Công nghệ sử dụng

- **Front-end**: React, Vite, CSS Modules
- **WebSocket**: Socket.io cho cập nhật thời gian thực
- **Xác thực**: JSON Web Tokens (JWT)

## Cài đặt

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 5.x)

### Bước 1: Clone repository

```bash
git clone https://github.com/ndyudev/trello-web.git
cd trello-web
```

### Bước 2: Cài đặt các phụ thuộc

```bash
npm install
```

### Bước 3: Chạy ứng dụng

```bash
npm run dev
```

Mở trình duyệt và truy cập `http://localhost:3000` để xem ứng dụng.

## Cấu trúc dự án

```
trello-web/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
├── package.json
└── README.md
```

## Đóng góp

Chúng tôi hoan nghênh mọi đóng góp từ cộng đồng. Vui lòng gửi pull request hoặc mở issue nếu bạn tìm thấy lỗi hoặc có ý tưởng cải tiến.

## Giấy phép

Dự án này được cấp phép theo Giấy phép MIT. Vui lòng xem tệp [LICENSE](LICENSE) để biết thêm chi tiết.

## Liên hệ

Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua email: chauunhatduyyit@gmail.com.

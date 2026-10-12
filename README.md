## 6. Bảng so sánh dung lượng và số lượng Layer

### 6.1. Kết quả đo thực tế

| Tiêu chí | `hw-backend:single` | `hw-backend:multistage` |
|---|---|---|
| Dockerfile sử dụng | `Dockerfile.single` | `Dockerfile` |
| Base image cuối cùng | `node:18-alpine` | `nginx:alpine` |
| Dung lượng image | Điền kết quả `docker images` | Điền kết quả `docker images` |
| Số filesystem layer | Điền kết quả `docker image inspect` | Điền kết quả `docker image inspect` |
| Môi trường Node.js trong runtime | Có | Không |
| Dependencies dùng để build | Có thể còn trong image | Không được sao chép sang runtime |
| Mã nguồn React | Có | Chỉ có sản phẩm build |
| Máy chủ phục vụ web | Node.js + `serve` | Nginx |
| Mục đích | Image đối chiếu | Production |

### 6.2. Công thức tính mức giảm dung lượng

Mức giảm dung lượng được tính theo công thức:

```text
Mức giảm (%) =
((Dung lượng single - Dung lượng multistage)
 / Dung lượng single) * 100
```

Ví dụ minh họa: nếu image single có dung lượng 180 MB và image multistage có dung lượng 50 MB thì:

```text
((180 - 50) / 180) * 100 = 72.22%
```

*Lưu ý: Đây là số liệu minh họa, không phải kết quả đo thực tế.*

### 6.3. Phân tích kết quả

- **Dung lượng:** Multi-stage Build giúp loại bỏ các thành phần không cần thiết cho runtime như môi trường build và dependencies của Node.js. Với React + Vite, image cuối chỉ cần Nginx và thư mục `dist`.
- **Số filesystem layer:** Số lượng layer được xác định bằng `docker image inspect`. Multi-stage Build không đảm bảo số layer luôn ít hơn; lợi ích chính là giảm các thành phần được giữ lại trong image cuối.
- **Layer Caching:** Việc sao chép `package.json` và `package-lock.json` trước khi chạy `npm ci` giúp Docker tái sử dụng layer cài dependencies khi mã nguồn thay đổi nhưng danh sách dependencies không đổi.
- **Production:** Image Nginx Alpine chỉ phục vụ các file tĩnh đã biên dịch, giúp tách môi trường build khỏi môi trường runtime.

### 6.4. Kết luận

Multi-stage Build giúp tối ưu Docker Image bằng cách chỉ sao chép sản phẩm build sang giai đoạn runtime. Dung lượng và số layer cần được đối chiếu bằng kết quả đo thực tế.

Mục tiêu của bài thực hành là giảm đáng kể dung lượng image production; mức giảm cụ thể phụ thuộc vào ứng dụng, dependencies và base image được sử dụng.

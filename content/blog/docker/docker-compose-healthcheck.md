---
title: 'Docker Compose: chờ database sẵn sàng bằng healthcheck'
description: 'Một lab PostgreSQL minh họa depends_on, healthcheck, DNS service và cách giữ dữ liệu khi dừng Compose.'
date: '2026-09-30'
category: Docker
tags: ['docker', 'compose', 'postgresql', 'healthcheck']
difficulty: intermediate
featured: false
draft: false
author: 'DevOps Knowledge Hub'
---

## Mở đầu: chạy được chưa chắc dùng được

Database có thể đã tạo container nhưng còn khởi tạo dữ liệu. Nếu ứng dụng kết nối ngay, lần chạy đầu thất bại còn lần sau lại thành công. Đây là một lỗi thứ tự sẵn sàng thường gặp. Compose cho phép khai báo dependency và healthcheck, giúp startup có điều kiện rõ ràng thay vì thêm một khoảng ngủ tùy ý.

Bài này tạo database thử nghiệm và một container chạy câu SQL rồi thoát. Dùng thư mục mới, không dùng volume của dự án khác. Mật khẩu minh họa chỉ dành cho lab cục bộ; database không được publish cổng ra máy chủ.

## Nền tảng: dependency và khả năng phục hồi

`depends_on` thông thường điều khiển thứ tự tạo container, không bảo đảm dịch vụ đã xử lý được yêu cầu. Với `condition: service_healthy`, Compose đợi healthcheck của dependency thành công trước khi khởi động dịch vụ phụ thuộc. Hành vi này được trình bày trong [tài liệu startup order](https://docs.docker.com/compose/how-tos/startup-order/).

Đợi lúc startup vẫn chưa giải quyết database mất kết nối về sau. Ứng dụng thực tế cần timeout, retry có giới hạn và cách báo lỗi thích hợp. Healthcheck cũng phải kiểm tra điều có ý nghĩa: cổng mở chỉ là một tín hiệu, chưa chắc schema hay tài khoản ứng dụng đã sẵn sàng.

## Thực hành: kết nối bằng tên service

Tạo `compose.yaml`:

```yaml
services:
  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: lab
      POSTGRES_USER: lab
      POSTGRES_PASSWORD: local-lab-only
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U lab -d lab"]
      interval: 5s
      timeout: 3s
      retries: 10
      start_period: 10s
  check:
    image: postgres:17-alpine
    depends_on:
      db:
        condition: service_healthy
    environment:
      PGPASSWORD: local-lab-only
    command: ["psql", "-h", "db", "-U", "lab", "-d", "lab", "-c", "SELECT 1 AS ready;"]
volumes:
  db-data:
```

Tên `db` được phân giải trong mạng mặc định của project. `localhost` trong container `check` là chính container đó, không phải database. Xem [networking trong Compose](https://docs.docker.com/compose/how-tos/networking/) để hiểu tên service và cổng nội bộ.

```bash
docker compose -p devops-health-lab config --quiet
docker compose -p devops-health-lab up -d db
docker compose -p devops-health-lab run --rm check
docker compose -p devops-health-lab ps
docker compose -p devops-health-lab logs --tail=30 db
```

Kết quả SQL cần có `ready` bằng `1`. Đó là bằng chứng client đã xác thực và thực hiện một truy vấn, mạnh hơn chỉ thấy container “running”. `pg_isready` đo khả năng nhận kết nối; câu SQL kiểm chứng thêm đường đi của client trong lab.

Dừng project khi xong:

```bash
docker compose -p devops-health-lab down
```

Named volume được giữ lại theo mặc định. Lần chạy tiếp dùng dữ liệu cũ, nên đổi biến mật khẩu không tự đổi tài khoản trong database đã khởi tạo. [Tài liệu `compose down`](https://docs.docker.com/reference/cli/docker/compose/down/) giải thích lựa chọn xóa volume; chỉ dùng lựa chọn đó khi đã xác nhận dữ liệu thử nghiệm có thể bỏ.

## Sai lầm thường gặp

- Dùng `sleep 10`: thời gian khởi tạo thay đổi theo máy và lượng dữ liệu.
- Publish cổng database dù chỉ cần giao tiếp nội bộ: tạo thêm bề mặt truy cập không cần thiết.
- Xem healthcheck thành cơ chế tự sửa mọi lỗi: cần log và khả năng reconnect của ứng dụng.
- Dùng chung tên project giữa các bài lab: dễ nhầm container và volume khi dừng môi trường.

## Tổng kết

Startup đáng tin cần điều kiện kiểm tra cụ thể và client chịu được lỗi tạm thời. Tách dữ liệu khỏi vòng đời container, đặt tên project rõ ràng và xác minh bằng truy vấn thật. Khi chuyển lên production, thiết kế thêm quản lý bí mật, backup và kiểm tra khôi phục phù hợp với dữ liệu thực tế.

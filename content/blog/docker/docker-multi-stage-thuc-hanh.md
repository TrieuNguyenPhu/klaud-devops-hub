---
title: 'Docker multi-stage: chỉ đưa thứ cần chạy vào image'
description: 'Tạo image Go hai giai đoạn, chạy bằng người dùng thường và kiểm tra kết quả trong sandbox.'
date: '2026-09-27'
category: Docker
tags: ['docker', 'container', 'multi-stage', 'build']
difficulty: intermediate
featured: true
draft: false
author: 'DevOps Knowledge Hub'
---

## Mở đầu: công cụ biên dịch không cần đi cùng ứng dụng

Một image chứa cả trình biên dịch, mã nguồn và chương trình chạy sẽ mang theo nhiều thứ không dùng lúc phục vụ người dùng. Multi-stage giúp tách môi trường build khỏi môi trường runtime trong cùng Dockerfile. Bài này dùng một chương trình Go nhỏ để thấy rõ phần nào được chuyển sang image cuối, không cần repository hoặc dịch vụ cloud.

Thực hành trong thư mục mới trên máy đã cài Docker. Lệnh build có thể tải image từ registry; hãy kiểm tra chính sách mạng của môi trường. Kết quả chỉ in một dòng rồi thoát, nên không mở cổng hoặc tạo dịch vụ chạy nền.

## Nền tảng: ranh giới giữa các stage

Mỗi `FROM` bắt đầu một stage. `COPY --from=build` lấy đúng artifact cần dùng từ stage có tên `build`. Công cụ build và những tệp khác không tự xuất hiện trong stage cuối. Đặt tên stage giúp Dockerfile dễ đọc khi thay đổi thứ tự. Đây là cơ chế được mô tả trong [hướng dẫn multi-stage của Docker](https://docs.docker.com/build/building/multi-stage/).

Image nhỏ không tự chứng minh ứng dụng an toàn. Nó vẫn cần dependency được cập nhật, quyền chạy phù hợp và nguồn image đáng tin. Với chương trình liên kết động hoặc gọi HTTPS, phải kiểm tra thư viện và chứng chỉ cần ở runtime trước khi chuyển sang base tối giản.

## Thực hành: build và quan sát artifact

Tạo `main.go`:

```go
package main

import "fmt"

func main() {
    fmt.Println("DevOps lab: image da san sang")
}
```

Tạo `Dockerfile` trong cùng thư mục:

```dockerfile
FROM golang:1.25-alpine AS build
WORKDIR /src
COPY main.go ./
RUN CGO_ENABLED=0 go build -trimpath -o /out/lab main.go

FROM alpine:3.22
COPY --from=build /out/lab /usr/local/bin/lab
USER 10001:10001
ENTRYPOINT ["/usr/local/bin/lab"]
```

Ví dụ không có thư viện ngoài và tắt CGO. Base runtime vẫn có shell để dễ quan sát trong lab. Không suy rộng cấu hình này sang ứng dụng có native dependency. Tạo `.dockerignore` để build context không mang theo nội dung ngoài ý muốn:

```text
.git
.env*
*.pem
```

Sau đó chạy:

```bash
docker build -t devops-lab:multi-stage .
docker run --rm --read-only devops-lab:multi-stage
docker image inspect devops-lab:multi-stage --format '{{.Config.User}}'
docker image ls devops-lab
```

Kết quả mong đợi là dòng thông báo và người dùng `10001:10001`. Container tự xóa sau khi kết thúc; image còn để kiểm tra. Đừng so kích thước qua hai công cụ khác cách tính mà kết luận ngay hiệu quả. Muốn đo, dùng cùng lệnh và cùng môi trường trước, sau thay đổi.

Trong dự án thật, đưa manifest dependency vào trước mã nguồn để tận dụng cache khi dependency chưa đổi. Pin digest sau khi xác minh nguồn image và có lịch cập nhật. [Docker build best practices](https://docs.docker.com/build/building/best-practices/) giải thích cách chọn base, sử dụng cache và kiểm soát cập nhật.

## Sai lầm thường gặp

- Copy toàn bộ thư mục build sang runtime: lại kéo theo mã nguồn, cache hoặc bí mật.
- Đưa token vào `ARG` hay lệnh build: cần cơ chế build secret thay vì lưu bí mật trong lịch sử image.
- Thay base mà không thử ứng dụng: binary có thể thiếu thư viện hoặc chứng chỉ.
- Chỉ đánh giá số megabyte: tốc độ startup, lỗi runtime và quy trình vá lỗi cũng cần kiểm tra.

## Tổng kết

Giữ stage build đầy đủ công cụ, stage runtime đủ để chạy đúng. Kiểm chứng đầu ra và quyền chạy trước khi tối ưu thêm. Khi build context lớn hoặc chứa tệp nhạy cảm, đọc thêm [tài liệu `.dockerignore`](https://docs.docker.com/build/concepts/context/#dockerignore-files) để xác định chính xác những gì gửi cho builder.

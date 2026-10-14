---
title: "Multi-stage build giúp gì cho image cuối?"
description: "Tách công cụ build khỏi môi trường chạy ứng dụng."
date: "2026-10-14"
category: "Docker"
tags: ["dockerfile","build"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Image chứa cả compiler và ứng dụng dù production chỉ cần binary. Bạn sửa Dockerfile theo hướng nào?

## Trả lời

Dùng một stage để build và một stage khác để chạy. Chỉ copy artifact cần thiết sang stage cuối. Docker hỗ trợ nhiều FROM và COPY --from. [Docker: multi-stage build](https://docs.docker.com/build/building/multi-stage/)

## Giải thích

Cách này giảm thành phần không cần thiết trong image chạy. Tuy nhiên artifact phải tương thích với runtime: binary liên kết động vẫn cần thư viện thích hợp. Image nhỏ không tự đảm bảo an toàn; cần theo dõi dependency và cập nhật bản nền.

Kiểm tra riêng build target trong một dự án đã có Dockerfile:

```bash
docker build --target build -t myapp:build .
docker build -t myapp:local .
docker image inspect myapp:local
```

Tên build phải khớp stage thực tế. Bài tự luyện: so sánh nội dung và kích thước image trước, sau; chạy ứng dụng để xác nhận đã copy đủ artifact.


---
title: "Image khác container ở điểm nào?"
description: "Phân biệt mẫu đóng gói với tiến trình đang chạy và lớp ghi."
date: "2026-10-14"
category: "Docker"
tags: ["image","container"]
difficulty: beginner
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Tại sao sửa tệp trong container rồi tạo container mới lại mất thay đổi?

## Trả lời

Image là mẫu đóng gói để tạo container. Container có trạng thái chạy và lớp ghi riêng. Sửa trong lớp ghi không sửa image gốc. Dữ liệu cần tồn tại qua vòng đời container phải được thiết kế với storage phù hợp. [Docker: lớp ghi và volumes](https://docs.docker.com/engine/storage/volumes/)

```bash
docker image ls
docker container ls --all
docker container inspect myapp
```

## Giải thích

Đóng gói mã và dependency vào image; đưa cấu hình runtime qua cơ chế phù hợp; lưu dữ liệu bền vững ở volume hoặc dịch vụ dữ liệu. Tránh dùng một container đã sửa tay như nguồn chân lý cho bản triển khai tiếp theo.

Bài tự luyện: trong lab, ghi tệp vào container, xóa container thử nghiệm rồi tạo mới từ cùng image. So sánh với dữ liệu ở named volume. Kiểm tra đúng volume trước mọi lệnh xóa.


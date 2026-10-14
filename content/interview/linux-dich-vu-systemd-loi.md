---
title: "Bạn chẩn đoán dịch vụ systemd thất bại theo thứ tự nào?"
description: "Đọc trạng thái, nhật ký và cấu hình trước khi khởi động lại dịch vụ."
date: "2026-10-14"
category: "Linux"
tags: ["systemd","troubleshooting"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Dịch vụ vừa triển khai không khởi động được. Bạn bắt đầu từ đâu?

## Trả lời

Đọc trạng thái và nhật ký của đúng unit trước, sau đó kiểm tra lệnh khởi động, người dùng chạy và đường dẫn cấu hình. Một lần restart không chứng minh nguyên nhân đã được sửa. [systemctl](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html)

```bash
systemctl status myapp.service --no-pager
journalctl -u myapp.service -n 80 --no-pager
systemctl cat myapp.service
```

## Giải thích

Nếu nhật ký báo thiếu tệp, kiểm tra đường dẫn thay vì sửa timeout. Nếu báo permission denied, đối chiếu User, Group và quyền thư mục. Nếu tiến trình thoát ngay, chạy bước kiểm tra cấu hình do ứng dụng cung cấp. Chỉ dùng daemon-reload khi sửa định nghĩa unit; bước này không tự khởi động lại dịch vụ.

Sau khi sửa, khởi động lại có kiểm soát trong lab và xác nhận trạng thái cùng một yêu cầu thực tế. [journalctl](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html)

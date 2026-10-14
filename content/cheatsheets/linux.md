---
title: "Linux: lệnh kiểm tra trước khi thay đổi"
description: "Tra nhanh quyền, tiến trình, tài nguyên, mạng và nhật ký trên Linux."
date: "2026-10-14"
category: "Linux"
tags: ["linux","commands","cheatsheet"]
difficulty: beginner
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Cách dùng

Các ví dụ dành cho Linux có Bash; lệnh systemctl và journalctl cần hệ thống dùng systemd. Tên myapp, myapp.service và đường dẫn /srv/app là giá trị mẫu, hãy thay theo lab. Bắt đầu bằng quan sát rồi mới thực hiện lệnh thay đổi.

## Danh tính và quyền

Kiểm tra tài khoản hiện tại và quyền từng thư mục cha khi gặp permission denied.

```bash
id
ls -ld /srv /srv/app
ls -l /srv/app
```

r, w, x trên thư mục có ý nghĩa khác tệp. [GNU: quyền truy cập](https://www.gnu.org/software/coreutils/manual/html_node/Setting-Permissions.html)

Chỉ thêm quyền thực thi cho chủ sở hữu script sau khi kiểm tra nội dung:

```bash
chmod u+x /srv/app/start.sh
```

## Tiến trình và dung lượng

Xem tiến trình, RAM và filesystem trước khi kết luận máy hết tài nguyên.

```bash
ps -eo pid,user,%cpu,%mem,comm --sort=-%cpu
free -h
df -h
du -sh /srv/app
```

df cho biết filesystem; du đo dữ liệu theo đường dẫn. Một tệp đã xóa nhưng còn mở có thể làm hai kết quả khác nhau. [GNU: df](https://www.gnu.org/software/coreutils/manual/html_node/df-invocation.html), [GNU: du](https://www.gnu.org/software/coreutils/manual/html_node/du-invocation.html)

## Kết nối

Kiểm tra địa chỉ, route và cổng đang lắng nghe. Các lệnh ip và ss thuộc iproute2.

```bash
ip address
ip route
ss -ltn
curl -I --connect-timeout 5 https://example.com
```

curl có timeout giúp tránh chờ vô hạn khi thử một kết nối. [curl manual](https://curl.se/docs/manpage.html)

## Dịch vụ và nhật ký

Xem trạng thái và giới hạn lượng logs để tìm lỗi gần đây.

```bash
systemctl status myapp.service --no-pager
journalctl -u myapp.service --since "30 minutes ago" --no-pager
systemctl cat myapp.service
```

Nếu đã sửa unit, nạp lại định nghĩa; nếu chỉ sửa cấu hình ứng dụng, xem cơ chế reload do ứng dụng hỗ trợ. [systemctl manual](https://www.freedesktop.org/software/systemd/man/latest/systemctl.html)

## Bài lab ngắn

Dựng dịch vụ lab lỗi đường dẫn, thu bằng chứng bằng ba lệnh trên và sửa đúng đường dẫn. Xác nhận bằng một request thực tế. Đọc tiếp [chẩn đoán hiệu năng Linux](/blog/linux-chan-doan-hieu-nang).

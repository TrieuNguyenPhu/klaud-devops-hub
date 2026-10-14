---
title: "Làm sao tách lỗi DNS khỏi lỗi kết nối ứng dụng?"
description: "Chẩn đoán theo lớp từ phân giải tên đến TCP và HTTP."
date: "2026-10-14"
category: "Networking"
tags: ["dns","http","troubleshooting"]
difficulty: beginner
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Người dùng báo website không mở được. Vì sao ping thành công chưa đủ?

## Trả lời

DNS trả về địa chỉ; kết nối TCP, TLS và phản hồi HTTP là các bước khác. Ping dùng ICMP nên không chứng minh cổng ứng dụng đang hoạt động. Kiểm tra từng bước để thu hẹp lỗi.

```bash
dig example.com A
dig example.com AAAA
curl -I --connect-timeout 5 https://example.com
```

## Giải thích

Tên không phân giải: kiểm tra resolver, record và cache. Có địa chỉ nhưng kết nối timeout: kiểm tra route, firewall và listener. Kết nối được nhưng HTTP trả 500: chuyển sang nhật ký ứng dụng. Một bản ghi AAAA sai cũng có thể khiến trải nghiệm khác nhau giữa các máy.

TTL hướng dẫn thời gian giữ bản ghi trong cache; thay đổi DNS không đồng nghĩa mọi client thấy ngay giá trị mới. [DNS theo RFC 1035](https://www.rfc-editor.org/rfc/rfc1035.html), [curl: tùy chọn dòng lệnh](https://curl.se/docs/manpage.html)

Bài tự luyện: ghi rõ bước nào thất bại và bằng chứng của bước đó trong một báo cáo sự cố ngắn.


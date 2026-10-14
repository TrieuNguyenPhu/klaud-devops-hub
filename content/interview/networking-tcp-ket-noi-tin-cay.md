---
title: "TCP đảm bảo điều gì và không đảm bảo điều gì?"
description: "Hiểu luồng byte tin cậy và giới hạn ở tầng ứng dụng."
date: "2026-10-14"
category: "Networking"
tags: ["tcp","networking"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Một client gửi yêu cầu tạo đơn hàng qua TCP rồi mất kết nối. Có thể kết luận đơn hàng chưa được tạo không?

## Trả lời

Không. TCP cung cấp luồng byte có thứ tự và cơ chế phát hiện, truyền lại dữ liệu mất trong một kết nối. Nó không xác nhận giao dịch nghiệp vụ đã được commit. Server có thể đã tạo đơn nhưng client chưa nhận phản hồi. [RFC 9293: TCP](https://www.rfc-editor.org/rfc/rfc9293.html)

## Giải thích

Retry yêu cầu tạo mới mà không có khóa idempotency có thể tạo bản ghi trùng. Cần thiết kế API và dữ liệu để một khóa thao tác chỉ tạo một kết quả, đồng thời cho client tra cứu trạng thái.

Để kiểm tra listener và các kết nối hiện tại trên Linux:

```bash
ss -ltn
ss -tn
```

Các lệnh chỉ phản ánh trạng thái mạng tại thời điểm quan sát. Trong phỏng vấn, hãy phân biệt xác nhận truyền dữ liệu với xác nhận nghiệp vụ, rồi nêu một cách xử lý retry an toàn. [iproute2, dự án cung cấp ss](https://www.kernel.org/pub/linux/utils/net/iproute2/)

---
title: "State locking giải quyết vấn đề gì?"
description: "Tránh nhiều người ghi state đồng thời và hiểu giới hạn backend."
date: "2026-10-14"
category: "Terraform"
tags: ["state","locking"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Hai pipeline apply vào cùng state cùng lúc có rủi ro gì?

## Trả lời

Chúng có thể dựa trên trạng thái cũ và ghi thay đổi cạnh tranh. Với backend hỗ trợ khóa, Terraform khóa state ở thao tác có thể ghi nhằm tránh hai người ghi đồng thời. Không phải backend nào cũng có khả năng này. [Terraform: state locking](https://developer.hashicorp.com/terraform/language/state/locking)

## Giải thích

Dùng backend cộng tác phù hợp, phân quyền state và kiểm soát job đang chạy. Lock không thay thế việc quản lý quyền truy cập hay review plan.

Khi thấy lỗi khóa, kiểm tra chủ thể giữ khóa và pipeline còn hoạt động hay không. Force-unlock khi có người đang ghi có thể gây nhiều người ghi đồng thời, vì vậy chỉ giải khóa của chính thao tác đã dừng sau khi xác minh.

```bash
terraform state list
```

Lệnh liệt kê địa chỉ tài nguyên giúp hiểu state hiện tại nhưng không xác nhận khóa đã bị bỏ.

Bài tự luyện: mô phỏng hai thao tác trong backend lab có hỗ trợ locking, đọc lỗi và giải thích cách xử lý.

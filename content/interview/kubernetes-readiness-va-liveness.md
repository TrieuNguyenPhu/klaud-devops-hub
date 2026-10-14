---
title: "Readiness, liveness và startup probe khác nhau thế nào?"
description: "Chọn probe theo khả năng nhận traffic, tình trạng sống và khởi động."
date: "2026-10-14"
category: "Kubernetes"
tags: ["probes","pods"]
difficulty: intermediate
featured: true
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Ứng dụng khởi động chậm bị restart liên tục. Nên xem probe nào?

## Trả lời

Readiness quyết định container đã sẵn sàng nhận traffic qua Service hay chưa. Liveness phát hiện container cần được restart. Startup probe cho phép kiểm tra quá trình khởi động; khi dùng nó, các probe kia chờ startup thành công. [Kubernetes: probes](https://kubernetes.io/docs/concepts/workloads/pods/probes/)

```bash
kubectl describe pod myapp
kubectl logs myapp --previous
```

## Giải thích

Nếu liveness quá gắt khi khởi động, tiến trình có thể bị giết trước khi sẵn sàng. Thiết kế endpoint sức khỏe theo hành vi mong muốn, rồi điều chỉnh ngưỡng theo thời gian khởi động đo được.

Tránh biến một lỗi dependency tạm thời thành vòng restart toàn hệ thống. Endpoint readiness có thể phản ánh khả năng phục vụ, trong khi liveness nên phát hiện trạng thái không thể tự phục hồi.

Bài tự luyện: làm ứng dụng lab khởi động chậm, quan sát events và chứng minh startup probe cho nó đủ thời gian.


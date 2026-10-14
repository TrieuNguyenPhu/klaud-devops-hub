---
title: "Service tồn tại nhưng không có traffic: kiểm tra gì?"
description: "Đối chiếu selector, endpoint và cổng ứng dụng theo thứ tự."
date: "2026-10-14"
category: "Kubernetes"
tags: ["service","networking"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Pod chạy và Service có ClusterIP nhưng client không nhận được phản hồi. Bạn kiểm tra thế nào?

## Trả lời

Bắt đầu từ selector của Service, labels của Pod và EndpointSlice. Sau đó kiểm tra readiness, targetPort cùng cổng ứng dụng thực sự lắng nghe. [Kubernetes: Service](https://kubernetes.io/docs/concepts/services-networking/service/)

```bash
kubectl get service myapp -o yaml
kubectl get pods --show-labels
kubectl get endpointslices -l kubernetes.io/service-name=myapp
```

## Giải thích

Service không tự sửa labels sai. port là cổng Service cung cấp; targetPort là cổng đích trên Pod. Nếu endpoints đúng, tiếp tục kiểm tra từ một Pod client trong cùng namespace, rồi xét NetworkPolicy và hạ tầng mạng.

Pod ở trạng thái Running vẫn có thể chưa Ready. Vì vậy đừng chỉ dựa vào trạng thái tiến trình. Trong phỏng vấn, đưa ra giả thuyết kèm lệnh xác minh thay vì chỉnh nhiều cấu hình cùng lúc.

Bài tự luyện: cố ý đổi label trong lab và quan sát EndpointSlice trước, sau khi sửa.


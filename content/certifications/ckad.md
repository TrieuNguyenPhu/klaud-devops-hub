---
title: "Certified Kubernetes Application Developer (CKAD)"
description: "Luyện đóng gói, triển khai và chẩn đoán ứng dụng Kubernetes."
date: "2026-10-14"
category: "Kubernetes"
tags: ["kubernetes","ckad","applications"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Tổng quan

CKAD tập trung vào xây dựng, cấu hình, expose và bảo trì ứng dụng cloud native trên Kubernetes. Bài đánh giá là thực hành dòng lệnh. [CNCF: CKAD](https://www.cncf.io/training/certification/ckad/)

## Nhóm nội dung

- Thiết kế và build ứng dụng.
- Triển khai ứng dụng.
- Quan sát và bảo trì ứng dụng.
- Môi trường, cấu hình và bảo mật.
- Service và networking.

## Chủ đề nên nắm

Image, Pod, Deployment, Job, ConfigMap, Secret, probes và Service. Hiểu cách cấu hình đi vào container và cách chọn tài nguyên cho ứng dụng.

## Cách luyện

Lấy một API nhỏ, đóng image rồi triển khai vào namespace lab. Thêm readiness và startup probe, expose bằng Service. Thực hiện một lần update lỗi và chẩn đoán bằng logs, events, labels. Sau đó đổi cấu hình mà không sửa mã ứng dụng.

Đặt giới hạn thời gian cho mỗi bài lab để luyện tìm tài liệu, nhưng luôn giữ bước xác minh kết quả.

## Tài liệu chính thức

- [CNCF curriculum](https://github.com/cncf/curriculum)
- [Kubernetes: probes](https://kubernetes.io/docs/concepts/workloads/pods/probes/)
- [Kubernetes: Service](https://kubernetes.io/docs/concepts/services-networking/service/)

Câu hỏi và lab ở đây là tài liệu tự học gốc. Không coi chúng là bản sao hoặc dự đoán đề thi; kiểm tra thông tin môi trường trên trang chính thức.


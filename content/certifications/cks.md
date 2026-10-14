---
title: "Certified Kubernetes Security Specialist (CKS)"
description: "Học bảo mật Kubernetes từ thiết lập cluster đến runtime và chuỗi cung ứng."
date: "2026-10-14"
category: "Kubernetes"
tags: ["kubernetes","cks","security"]
difficulty: advanced
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Tổng quan

CKS đánh giá thực hành bảo mật ứng dụng container và nền tảng Kubernetes. Thí sinh phải đã đỗ CKA trước khi thi CKS; CNCF hiện nêu CKA không bắt buộc còn hiệu lực cho điều kiện này. [CNCF: CKS](https://www.cncf.io/training/certification/cks/)

## Nhóm nội dung

- Thiết lập cluster.
- Gia cố cluster.
- Gia cố hệ thống.
- Giảm lỗ hổng microservice.
- Bảo mật chuỗi cung ứng.
- Giám sát, logs và bảo mật runtime.

## Chủ đề nên nắm

RBAC, danh tính workload, security context, chính sách mạng, kiểm soát image và bằng chứng runtime. NetworkPolicy cần giải pháp mạng thực thi được loại tài nguyên này. [Kubernetes: NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/)

## Cách luyện

Dùng môi trường lab riêng và chọn một đường tấn công cụ thể. Giới hạn quyền ServiceAccount, thử thao tác được phép và bị chặn. Tạo policy chặn truy cập không cần thiết, rồi kiểm chứng từ Pod nguồn. Luôn giữ lối khôi phục cấu hình để tránh tự khóa quyền quản trị.

## Tài liệu chính thức

- [CNCF curriculum](https://github.com/cncf/curriculum)
- [Kubernetes: Security](https://kubernetes.io/docs/concepts/security/)
- [Linux Foundation: handbook](https://docs.linuxfoundation.org/tc-docs/certification/lf-handbook2)

Đây là hướng dẫn học gốc, không phải đề thi thật. Kiểm tra lại điều kiện và môi trường thi trước khi đăng ký.

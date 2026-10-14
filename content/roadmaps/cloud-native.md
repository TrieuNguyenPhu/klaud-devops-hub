---
title: "Lộ trình Cloud Native: ứng dụng, Kubernetes và độ tin cậy"
description: "Năm chặng từ container đến vận hành workload Kubernetes có kiểm chứng."
date: "2026-10-14"
category: "Kubernetes"
tags: ["roadmap","cloud-native","kubernetes"]
difficulty: intermediate
featured: true
draft: false
author: "DevOps Knowledge Hub"
---

## Điều kiện bắt đầu

Bạn đã dùng Git, biết Linux cơ bản và chạy được ứng dụng trong container. Nếu chưa, bắt đầu với [lộ trình DevOps](/roadmaps/devops). Lộ trình này tập trung một workload lab; chưa cần đưa mọi công nghệ cloud native vào dự án.

## 1. Image tái tạo được

Đọc [Docker multi-stage thực hành](/blog/docker-multi-stage-thuc-hanh). Giữ mã và dependency trong image, chọn cấu hình runtime và nơi lưu dữ liệu.

**Hoàn thành khi:** build từ repo sạch, chạy một request và xác nhận phiên bản ứng dụng. [Docker: multi-stage](https://docs.docker.com/build/building/multi-stage/)

## 2. Workload Kubernetes

Tạo namespace, Deployment và Service. Đọc [probes đúng mục đích](/blog/kubernetes-probes-dung-muc-dich), rồi thêm readiness và startup phù hợp.

**Hoàn thành khi:** ứng dụng khởi động chậm vẫn được xử lý đúng; giải thích Pod Running và Ready khác nhau ra sao. [Kubernetes documentation](https://kubernetes.io/docs/home/)

## 3. Mạng, cấu hình và bảo mật

Tập theo đường request từ DNS đến Service và Pod. Đọc [DNS](/blog/dns-truy-vet-phan-giai) để giữ cách chẩn đoán theo lớp. Tách cấu hình, giới hạn ServiceAccount và thử policy mạng trong lab hỗ trợ nó.

**Hoàn thành khi:** chứng minh được một đường truy cập được phép và một đường bị chặn. [Kubernetes: NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/)

## 4. Phát hành có thể truy vết

Đọc [GitHub Actions CI an toàn](/blog/github-actions-ci-an-toan) và [Terraform state](/blog/terraform-state-va-lock). Gắn image với commit; review cấu hình và kiểm chứng update trước khi dùng chung.

**Hoàn thành khi:** biết phiên bản nào đang chạy, cách quay lại và dữ liệu nào không tự rollback theo mã.

## 5. Quan sát và khả năng phục hồi

Thu metrics, logs và traces theo câu hỏi vận hành cụ thể. Mô phỏng dependency chậm, Pod lỗi và thiếu cấu hình; viết runbook cho một tình huống. [OpenTelemetry: signals](https://opentelemetry.io/docs/concepts/signals/)

**Hoàn thành khi:** nhìn telemetry có thể khoanh vùng bước lỗi, phục hồi và xác nhận request thành công.

## Dự án kết thúc và hướng chứng chỉ

Đóng gói một dịch vụ vào repo có manifests, pipeline, tài liệu vận hành và bằng chứng lab. Chọn [CKAD](/certifications/ckad) nếu tập trung ứng dụng, [CKA](/certifications/cka) nếu tập trung quản trị, hoặc [CKS](/certifications/cks) khi đã có nền quản trị và cần bảo mật sâu hơn.

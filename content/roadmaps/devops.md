---
title: "Lộ trình DevOps: từ nền tảng đến vận hành một ứng dụng"
description: "Sáu chặng học với bài thực hành và tiêu chí hoàn thành rõ ràng."
date: "2026-10-14"
category: "DevOps"
tags: ["roadmap","devops","learning"]
difficulty: beginner
featured: true
draft: false
author: "DevOps Knowledge Hub"
---

## Cách đi theo lộ trình

Đi từng chặng theo kết quả làm được, không theo số công cụ đã cài. Mỗi lab nên có README ghi cách chạy, kiểm tra và dọn. Đây là lộ trình tự biên soạn; thời gian học tùy nền tảng của bạn.

## 1. Linux và mạng

Đọc [chẩn đoán hiệu năng Linux](/blog/linux-chan-doan-hieu-nang) và [truy vết phân giải DNS](/blog/dns-truy-vet-phan-giai). Tập kiểm tra tiến trình, quyền, route, DNS và HTTP.

**Hoàn thành khi:** giải thích được một lỗi permission và một lỗi DNS bằng bằng chứng lệnh.

## 2. Git và thay đổi nhỏ

Đọc [nhánh nhỏ, lịch sử rõ](/blog/git-nhanh-nho-lich-su-ro). Tạo nhánh, review diff, giải xung đột và revert trong repo lab.

**Hoàn thành khi:** người khác đọc README có thể chạy lại lab và hiểu lý do mỗi commit.

## 3. Container

Đọc [Docker multi-stage](/blog/docker-multi-stage-thuc-hanh) và [Compose healthcheck](/blog/docker-compose-healthcheck). Đóng gói API cùng dependency, tách cấu hình và dữ liệu khỏi image.

**Hoàn thành khi:** tạo container mới từ cùng image vẫn chạy đúng; giải thích dữ liệu nào cần volume.

## 4. CI và quyền triển khai

Đọc [GitHub Actions CI an toàn](/blog/github-actions-ci-an-toan). Tự động build, kiểm tra và tạo artifact gắn với commit. Thiết kế trust OIDC khi dùng cloud. [GitHub: OIDC](https://docs.github.com/en/actions/concepts/security/openid-connect)

**Hoàn thành khi:** pipeline phát hiện lỗi lab và tài liệu chỉ rõ quyền từng job.

## 5. Cloud và IaC

Đọc [IAM quyền tối thiểu](/blog/aws-iam-quyen-toi-thieu), [đường đi gói tin VPC](/blog/aws-vpc-duong-di-goi-tin) và [Terraform state](/blog/terraform-state-va-lock). Bắt đầu workload nhỏ, đặt ngân sách, đọc plan trước apply.

**Hoàn thành khi:** dựng lại môi trường lab từ cấu hình và dọn tài nguyên có kiểm chứng.

## 6. Vận hành và phục hồi

Đọc [probes đúng mục đích](/blog/kubernetes-probes-dung-muc-dich). Đặt một mục tiêu dịch vụ, thu logs, mô phỏng lỗi, viết runbook và postmortem. [Google SRE: SLO](https://sre.google/sre-book/service-level-objectives/)

**Hoàn thành khi:** người khác làm theo runbook có thể xác định lỗi và phục hồi ứng dụng lab.

## Dự án kết thúc

Một API nhỏ đi từ commit đến triển khai, có cách quan sát và rollback được mô tả. Chỉ thêm công cụ khi dự án xuất hiện nhu cầu cụ thể. Chứng chỉ có thể giúp hệ thống hóa kiến thức; bằng chứng thực hành vẫn là repo và kết quả lab.


---
title: "HashiCorp Certified: Terraform Associate (004)"
description: "Học workflow, cấu hình, module, state và HCP Terraform theo tài liệu hiện hành."
date: "2026-10-14"
category: "Terraform"
tags: ["terraform","004","iac"]
difficulty: beginner
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Tổng quan

Tên phiên bản hiện hành trên HashiCorp Developer là Terraform Associate (004). Nội dung bao quát Terraform Community Edition và HCP Terraform ở mức nền tảng. [HashiCorp: Terraform Associate](https://developer.hashicorp.com/certifications/terraform-associate)

## Nhóm nội dung

- IaC và nền tảng Terraform.
- Workflow init, validate, plan và apply.
- Cấu hình cùng module.
- Quản lý state và bảo trì hạ tầng.
- HCP Terraform và cộng tác.

## Chủ đề nên nắm

Phân biệt resource với data source, input với output và cấu hình với state. Hiểu kế hoạch thay đổi trước khi apply; khóa state phụ thuộc khả năng backend.

## Cách luyện

Tạo một cấu hình lab nhỏ, chia một phần thành module rồi xem plan khi thay input. Thử import một tài nguyên lab có sẵn và giải thích mối liên hệ với state. Không commit credentials, state hay plan có thông tin nhạy cảm vào Git.

Tự luyện bằng tình huống: cùng một state có hai người apply, hoặc tài nguyên bị sửa ngoài Terraform. Ghi cách phát hiện và điều phối thay đổi.

## Tài liệu chính thức

- [HashiCorp: Learning Path 004](https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-study-004)
- [Terraform: State locking](https://developer.hashicorp.com/terraform/language/state/locking)
- [State tại hub](/blog/terraform-state-va-lock)

Các câu hỏi tại hub là nội dung tự biên soạn, không phải exam dumps. Đối chiếu mục tiêu phiên bản 004 thay vì chỉ học theo hướng dẫn 003.

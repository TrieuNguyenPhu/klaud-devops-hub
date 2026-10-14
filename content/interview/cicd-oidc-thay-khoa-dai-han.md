---
title: "OIDC giúp pipeline truy cập cloud thế nào?"
description: "Dùng định danh workflow để nhận thông tin xác thực tạm thời."
date: "2026-10-14"
category: "CI/CD"
tags: ["oidc","github-actions"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Bạn muốn bỏ AWS access key dài hạn khỏi secrets của GitHub Actions. Phương án là gì?

## Trả lời

Cấu hình liên kết OIDC giữa GitHub và cloud. Workflow nhận token định danh; cloud kiểm tra claims và điều kiện trust rồi cấp credentials tạm thời cho role được phép. [GitHub: OpenID Connect](https://docs.github.com/en/actions/concepts/security/openid-connect)

## Giải thích

Giới hạn trust vào repository và nhánh hoặc environment được triển khai. Quyền id-token: write cho phép xin token OIDC, không tự cấp quyền trên tài nguyên cloud. Quyền tài nguyên nằm ở role và policy bên cloud.

Các pull request từ nguồn không tin cậy không nên nhận quyền triển khai production. Tách bước build, kiểm tra và deploy theo quyền tối thiểu.

Bài tự luyện: viết ra repository, nhánh, audience và role của một workflow lab; kiểm tra đường được phép và đường bị từ chối. Chỉ khi cả hai đúng mới coi cấu hình trust đã được kiểm chứng.


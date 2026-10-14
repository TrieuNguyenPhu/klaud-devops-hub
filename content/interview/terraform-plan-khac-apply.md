---
title: "Terraform plan và apply khác nhau thế nào?"
description: "Tách bước xem thay đổi dự kiến khỏi bước thực thi."
date: "2026-10-14"
category: "Terraform"
tags: ["plan","apply"]
difficulty: beginner
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Một pipeline chạy terraform plan thành công. Có nghĩa hạ tầng đã được cập nhật không?

## Trả lời

Không. plan tính thay đổi dự kiến dựa trên cấu hình, state và thông tin từ provider. apply mới thực thi kế hoạch. Có thể lưu plan để xem xét và dùng lại đúng artifact đã được phê duyệt. [Terraform: plan](https://developer.hashicorp.com/terraform/cli/commands/plan)

```bash
terraform fmt -check
terraform validate
terraform plan -out=lab.tfplan
terraform show lab.tfplan
```

## Giải thích

Trong một thư mục lab đã init, đọc mọi thay đổi destroy hoặc replace trước khi apply. Plan có thể chứa dữ liệu nhạy cảm nên không commit artifact này vào Git hay công khai nó.

Một plan thành công cũng không bảo đảm apply thành công: quyền, quota hoặc trạng thái bên ngoài có thể thay đổi. Khi triển khai, xác minh tài nguyên và hành vi sau apply.

Bài tự luyện: thay một giá trị cấu hình nhỏ và giải thích vì sao plan chọn update hay replace.

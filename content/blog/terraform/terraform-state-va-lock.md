---
title: 'Terraform state và locking: giữ bản đồ hạ tầng nhất quán'
description: 'Quan sát state với terraform_data trong lab cục bộ, rồi hiểu remote backend, locking và khôi phục.'
date: '2026-10-08'
category: Terraform
tags: ['terraform', 'iac', 'state', 'locking']
difficulty: intermediate
featured: false
draft: false
author: 'DevOps Knowledge Hub'
---

## Mở đầu: state không phải tệp tạm để xóa tùy ý

Terraform cần liên hệ địa chỉ resource trong cấu hình với đối tượng đã quản lý. State giữ thông tin cho công việc đó. Nếu hai người cùng thay đổi một môi trường mà không phối hợp, họ có thể dựa trên những góc nhìn khác nhau. Một backend phù hợp và locking giúp giảm nguy cơ ghi đè state, nhưng vẫn cần quy trình review và phục hồi.

Bài này dùng `terraform_data` để học trên thư mục mới, không tạo tài nguyên cloud. Terraform phiên bản hỗ trợ resource này phải được cài trước. Đừng thực hành trong thư mục đang liên kết với backend của production; kiểm tra đường dẫn và nội dung cấu hình trước khi chạy.

## Nền tảng: khóa state và khóa dependency khác nhau

State locking ngăn các thao tác cùng ghi state khi backend hỗ trợ. Terraform thường tự lấy khóa cho các thao tác có thể ghi; nếu không lấy được, nó không tiếp tục. Không nên tắt khóa để vượt một lỗi đang chưa hiểu. [Tài liệu state locking](https://developer.hashicorp.com/terraform/language/state/locking) giải thích cả trường hợp force unlock cần thận trọng.

Tệp `.terraform.lock.hcl` ghi lựa chọn dependency provider, không phải khóa chống hai người cùng apply. State và plan còn có thể chứa dữ liệu nhạy cảm. Hãy bảo vệ chúng như dữ liệu vận hành, không đưa vào Git hoặc chia sẻ công khai chỉ vì output được đánh dấu `sensitive`.

## Thực hành: nhìn state ở một lab cục bộ

Tạo `main.tf` trong thư mục hoàn toàn mới:

```hcl
terraform {
  required_version = ">= 1.4.0"
}

resource "terraform_data" "note" {
  input = "state-lab"
}

output "note" {
  value = terraform_data.note.output
}
```

Resource này được cung cấp bởi provider tích hợp; không cần gọi API cloud. Xem [tài liệu `terraform_data`](https://developer.hashicorp.com/terraform/language/resources/terraform-data) để phân biệt ví dụ học state với resource triển khai hạ tầng thật.

```bash
terraform init
terraform fmt -check
terraform validate
terraform plan -out=lab.tfplan
terraform show lab.tfplan
terraform apply lab.tfplan
terraform state list
terraform state show terraform_data.note
```

Đọc plan trước khi apply: chỉ được có resource `terraform_data.note` như cấu hình vừa tạo. Plan đã lưu là artifact được apply, vì vậy bảo vệ tệp và tránh áp dụng sau khi bối cảnh đã thay đổi. Chạy `terraform plan` lần nữa; kỳ vọng không có thay đổi nếu giữ nguyên cấu hình và state.

Với nhóm, một S3 backend có thể lưu state chung. Cấu hình minh họa sau yêu cầu bucket đã được chuẩn bị và không thuộc lab cục bộ phía trên:

```hcl
terraform {
  backend "s3" {
    bucket       = "your-existing-state-bucket"
    key          = "sandbox/app.tfstate"
    region       = "ap-southeast-1"
    encrypt      = true
    use_lockfile = true
  }
}
```

Đối chiếu phiên bản Terraform của cả nhóm trước khi dùng `use_lockfile`. [Tài liệu S3 backend](https://developer.hashicorp.com/terraform/language/backend/s3) mô tả tính năng khóa, quyền trên tệp `.tflock` và khuyến nghị bucket versioning. Credential nên đến từ cơ chế xác thực được quản lý, không ghi trực tiếp trong backend.

## Sai lầm thường gặp

- Xóa state để sửa plan bất thường: Terraform có thể mất liên hệ với tài nguyên thật.
- Force unlock khi một job vẫn chạy: mở đường cho hai thao tác ghi đồng thời.
- Đặt sandbox và production chung key: hai môi trường cùng điều khiển một bản đồ tài nguyên.
- Backup mà chưa thử khôi phục: chưa biết bản backup có đủ quyền và dữ liệu cần dùng.

## Tổng kết

Hiểu state bằng lab nhỏ rồi mới cấu hình backend cho nhóm. Khi gặp khóa, tìm chủ sở hữu và trạng thái job trước. Giữ state có phân quyền, phiên bản và quy trình khôi phục rõ ràng; locking bảo vệ việc ghi, còn quy trình vận hành bảo vệ quyết định thay đổi hạ tầng.

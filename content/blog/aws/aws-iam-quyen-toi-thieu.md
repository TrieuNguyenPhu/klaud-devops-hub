---
title: 'AWS IAM: thiết kế quyền từ một thao tác cụ thể'
description: 'Hiểu principal, action, resource và kiểm tra một policy đọc S3 bằng mô phỏng mà không tạo tài nguyên.'
date: '2026-10-04'
category: AWS
tags: ['aws', 'iam', 'security', 'least-privilege']
difficulty: intermediate
featured: true
draft: false
author: 'DevOps Knowledge Hub'
---

## Mở đầu: bắt đầu từ công việc cần làm

“Cho ứng dụng quyền S3” là yêu cầu quá rộng. Một công việc thực tế có thể chỉ cần đọc object trong thư mục báo cáo của một bucket. Viết yêu cầu thành thao tác, tài nguyên và điều kiện giúp policy dễ review, đồng thời tránh cấp quyền ghi hoặc xóa mà ứng dụng không cần.

Bài này tạo policy JSON trên máy và gửi nó đến API mô phỏng IAM. Không tạo bucket, user hay role, cũng không tải object. Bạn cần AWS CLI và profile thử nghiệm được cấp quyền gọi mô phỏng. Đừng dùng tài khoản root để xử lý lỗi thiếu quyền.

## Nền tảng: xác thực khác cấp quyền

Principal là danh tính thực hiện yêu cầu. Policy xét action, resource và có thể có condition. Explicit deny có thể chặn quyền mà một allow khác cấp. Permissions boundary và chính sách tổ chức cũng có thể giới hạn quyền; chỉ nhìn một policy chưa đủ kết luận request thật sẽ được cho phép. Xem [logic đánh giá policy của AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html).

Với người dùng, ưu tiên liên kết danh tính và credential tạm thời. Với workload, ưu tiên IAM role thay vì lưu access key lâu dài trong mã hoặc image. Những nguyên tắc này nằm trong [IAM security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html). Quyền tối thiểu cần được kiểm tra theo hành vi thật, không chỉ làm policy trông ngắn hơn.

## Thực hành: mô phỏng đúng tài nguyên

Đầu tiên xác nhận danh tính sẽ dùng:

```bash
aws sts get-caller-identity --profile sandbox --no-cli-pager
```

Đọc `Account` và `Arn`, rồi đối chiếu với môi trường thử nghiệm. [Tài liệu CLI cho lệnh này](https://docs.aws.amazon.com/cli/latest/reference/sts/get-caller-identity.html) mô tả thông tin trả về; nó không chứng minh danh tính có quyền S3.

Tạo `read-reports.json` trong thư mục lab:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::devops-example-bucket/reports/*"
    }
  ]
}
```

Tên bucket chỉ là ví dụ; tài nguyên không cần tồn tại để mô phỏng. Policy cho phép đọc object trong prefix, chưa cấp quyền liệt kê bucket. Chạy từ shell Linux hoặc Git Bash:

```bash
aws iam simulate-custom-policy \
  --profile sandbox \
  --policy-input-list file://read-reports.json \
  --action-names s3:GetObject s3:DeleteObject \
  --resource-arns arn:aws:s3:::devops-example-bucket/reports/demo.txt \
  --query 'EvaluationResults[*].[EvalActionName,EvalDecision]' \
  --output table --no-cli-pager
```

Kỳ vọng đọc được `allowed` cho GetObject và `implicitDeny` cho DeleteObject. Thử lại với object ngoài `reports/`; việc đọc cần bị từ chối trong mô phỏng policy này. Đây là hai kiểm tra tích cực và tiêu cực để chứng minh ranh giới quyền.

Mô phỏng không thực hiện các thao tác S3, nhưng cũng không phản ánh tự động toàn bộ môi trường thật. [Tài liệu `simulate-custom-policy`](https://docs.aws.amazon.com/cli/latest/reference/iam/simulate-custom-policy.html) nêu giới hạn này. Khi áp dụng vào sandbox thật, kiểm tra thêm bucket policy, quyền KMS nếu có mã hóa, và credential đang được SDK dùng.

## Sai lầm thường gặp

- Cấp `s3:*` để vượt lỗi nhanh: ứng dụng nhận thêm quyền xóa hoặc thay cấu hình ngoài nhu cầu.
- Dùng bucket ARN cho GetObject: thao tác object cần ARN đến object phù hợp.
- Chỉ kiểm tra thao tác được phép: thiếu thử nghiệm những thao tác phải bị từ chối.
- Đưa log debug chứa thông tin xác thực vào ticket công khai: cần lọc dữ liệu trước khi chia sẻ.

## Tổng kết

Viết quyền từ một công việc cụ thể, kiểm tra danh tính và thử cả đường được phép lẫn bị từ chối. Khi nhu cầu thay đổi, mở rộng policy bằng một thay đổi có review. Quyền tối thiểu là quá trình giữ policy sát công việc của ứng dụng, không phải thao tác làm một lần rồi quên.

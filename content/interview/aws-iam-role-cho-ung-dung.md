---
title: "Vì sao dùng IAM role thay cho access key trong ứng dụng?"
description: "Hiểu thông tin xác thực tạm thời và quyền tối thiểu."
date: "2026-10-14"
category: "AWS"
tags: ["iam","security"]
difficulty: beginner
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Ứng dụng trên EC2 cần đọc một bucket S3. Bạn cấp quyền thế nào?

## Trả lời

Gắn IAM role qua instance profile và giới hạn quyền vào thao tác, tài nguyên cần thiết. Role cung cấp thông tin xác thực tạm thời cho phiên, giảm nhu cầu nhúng access key dài hạn vào mã. [AWS: IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)

## Giải thích

Trust policy xác định ai được assume role; permissions policy xác định role làm được gì. Cần kiểm tra cả hai, cùng các chính sách khác ảnh hưởng quyền thực tế. Role không đồng nghĩa quyền administrator.

Để xác nhận danh tính của phiên CLI hiện tại mà không in khóa:

```bash
aws sts get-caller-identity
```

Chạy lệnh trong đúng môi trường thực thi. Nếu ứng dụng vẫn dùng credentials cũ từ biến môi trường, nó có thể không dùng role như dự kiến.

Bài tự luyện: viết policy chỉ đọc một prefix lab và kiểm tra cả yêu cầu được phép lẫn yêu cầu ngoài phạm vi.

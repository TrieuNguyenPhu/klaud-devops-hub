---
title: "AWS Certified Developer – Associate"
description: "Ôn phát triển ứng dụng AWS với quyền truy cập, triển khai và chẩn đoán lỗi."
date: "2026-10-14"
category: "AWS"
tags: ["aws","dva-c02","serverless"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Tổng quan

AWS Certified Developer – Associate (DVA-C02) dành cho kiến thức phát triển và vận hành ứng dụng tích hợp AWS. Khi học, nối một API call với quyền, hành vi lỗi và telemetry của nó. [AWS: Exam Guide](https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/)

## Nhóm nội dung

- Phát triển với dịch vụ AWS.
- Bảo mật.
- Triển khai.
- Chẩn đoán và tối ưu.

Phần triển khai bao gồm chuẩn bị artifact, kiểm thử, tự động hóa và chiến lược phát hành. [AWS: Deployment domain](https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/developer-associate-02-domain3.html)

## Chủ đề nên nắm

SDK, credentials, Lambda, API, queue và hành vi retry. Với SQS Standard, thiết kế consumer có thể xử lý việc nhận lại cùng thông điệp. [AWS: at-least-once delivery](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html)

## Cách luyện

Tạo một ứng dụng lab nhận sự kiện, xử lý và ghi kết quả. Tự gửi cùng sự kiện hai lần để kiểm tra idempotency. Ghi lỗi có context, rồi thực hành phân biệt lỗi quyền với lỗi logic. Mỗi thay đổi cần có bằng chứng từ test và logs.

## Tài liệu chính thức

- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [AWS Skill Builder](https://skillbuilder.aws/)
- [CI an toàn tại hub](/blog/github-actions-ci-an-toan)

Câu hỏi tại hub được biên soạn mới cho việc học; không sao chép đề thi hoặc hứa hẹn kết quả thi.

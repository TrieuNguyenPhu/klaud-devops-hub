---
title: "Một cảnh báo vận hành tốt cần đáp ứng gì?"
description: "Gắn cảnh báo với tác động, hướng xử lý và người nhận phù hợp."
date: "2026-10-14"
category: "Observability"
tags: ["alerting","cloudwatch"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Cảnh báo CPU luôn gửi lúc ban đêm nhưng dịch vụ vẫn tốt. Bạn xử lý thế nào?

## Trả lời

Đối chiếu tín hiệu với tác động người dùng. Một cảnh báo nên giúp người nhận thực hiện hành động rõ ràng, có cửa sổ đánh giá và hướng dẫn kiểm tra. CPU có thể hữu ích cho điều tra, nhưng ngưỡng phải phù hợp workload.

## Giải thích

Với CloudWatch, alarm đánh giá metric theo các khoảng và số datapoint đã cấu hình. Cần quyết định cách xử lý dữ liệu thiếu; missing không luôn có nghĩa hệ thống khỏe. [AWS: CloudWatch alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html)

Bài tự luyện: xây alarm lab cho tỷ lệ lỗi hoặc latency, ghi điều kiện kích hoạt, người nhận và runbook. Mô phỏng cả lỗi thực và thiếu dữ liệu để xác nhận hành vi.

Tránh tắt cảnh báo chỉ vì ồn. Tìm nguyên nhân, chỉnh điều kiện theo mục tiêu dịch vụ và giữ metric để phân tích xu hướng.

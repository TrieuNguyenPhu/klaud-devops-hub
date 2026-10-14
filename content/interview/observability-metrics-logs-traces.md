---
title: "Metrics, logs và traces bổ sung nhau thế nào?"
description: "Chọn tín hiệu theo câu hỏi cần trả lời khi vận hành."
date: "2026-10-14"
category: "Observability"
tags: ["opentelemetry","signals"]
difficulty: beginner
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

API chậm nhưng CPU bình thường. Bạn cần những tín hiệu nào?

## Trả lời

Metrics cho thấy xu hướng và mức độ ảnh hưởng. Logs ghi sự kiện chi tiết. Traces nối các span để theo đường đi một request qua nhiều thành phần. [OpenTelemetry: signals](https://opentelemetry.io/docs/concepts/signals/)

## Giải thích

Bắt đầu từ metric latency và tỷ lệ lỗi để xác định phạm vi. Dùng trace để tìm bước tiêu tốn thời gian, rồi logs để hiểu lỗi cụ thể của bước đó. Truyền trace context và ghi trace ID giúp liên kết.

Không ghi token hay dữ liệu cá nhân vào telemetry. Chọn thuộc tính có ý nghĩa và giới hạn cardinality, retention theo nhu cầu. Việc có đủ ba tín hiệu không tự chứng minh hệ thống quan sát được nếu không trả lời được câu hỏi vận hành.

Bài tự luyện: tạo một request lab chậm ở database và mô tả mỗi tín hiệu cung cấp bằng chứng gì.


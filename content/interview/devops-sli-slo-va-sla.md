---
title: "SLI, SLO và SLA khác nhau thế nào?"
description: "Liên hệ đo lường dịch vụ, mục tiêu nội bộ và cam kết."
date: "2026-10-14"
category: "DevOps"
tags: ["sre","slo"]
difficulty: beginner
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Nhóm nói hệ thống phải đạt 99,9% uptime. Bạn cần làm rõ điều gì?

## Trả lời

SLI là chỉ số đo hành vi dịch vụ. SLO là mục tiêu cho chỉ số đó trong một khoảng thời gian. SLA là thỏa thuận với hệ quả khi không đạt cam kết. [Google SRE: Service Level Objectives](https://sre.google/sre-book/service-level-objectives/)

## Giải thích

Cần định nghĩa yêu cầu nào được tính, thành công là gì và cửa sổ đo bao lâu. Đo từ phía người dùng có thể phản ánh trải nghiệm khác với việc chỉ kiểm tra tiến trình sống.

Ví dụ lab: SLI là tỷ lệ request hợp lệ trả thành công; SLO là ít nhất 99,9% trong 30 ngày. Đây là ví dụ để học, không phải mục tiêu mặc định cho mọi sản phẩm.

Bài tự luyện: viết một SLI cho API đặt hàng, gồm nguồn dữ liệu, tử số, mẫu số và các loại yêu cầu bị loại. Sau đó giải thích vì sao mục tiêu đó phù hợp nhu cầu người dùng.

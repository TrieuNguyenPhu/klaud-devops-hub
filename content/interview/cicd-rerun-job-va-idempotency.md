---
title: "Vì sao chạy lại pipeline cần quan tâm idempotency?"
description: "Thiết kế thao tác triển khai chịu được retry có kiểm soát."
date: "2026-10-14"
category: "CI/CD"
tags: ["pipeline","idempotency"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Job deploy timeout sau khi đã gửi yêu cầu. Có nên chạy lại toàn bộ workflow ngay không?

## Trả lời

Trước hết xác định hệ thống đích đã nhận và hoàn thành thao tác hay chưa. Retry có thể gửi cùng hành động hai lần. Một thao tác idempotent cho kết quả mong muốn ổn định dù lặp lại cùng yêu cầu.

## Giải thích

Gắn bản triển khai với commit hoặc artifact bất biến. Kiểm tra phiên bản đang chạy, giữ khóa triển khai khi cần và thiết kế migration để phát hiện phần đã hoàn tất. Retry build thường khác retry thao tác ghi dữ liệu.

GitHub cho phép chạy lại workflow hoặc job; việc có nút chạy lại không chứng minh mọi tác vụ bên trong đều an toàn để lặp. [GitHub: chạy lại workflows](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/re-run-workflows-and-jobs)

Bài tự luyện: với từng bước pipeline, ghi tác động bên ngoài và điều kiện để retry. Nếu không biết bước nào đã hoàn thành, thêm bằng chứng trạng thái trước khi thiết kế tự động retry.


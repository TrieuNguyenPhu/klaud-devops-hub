---
title: "Postmortem hữu ích cần ghi gì?"
description: "Biến sự cố thành bằng chứng và hành động phòng ngừa kiểm chứng được."
date: "2026-10-14"
category: "DevOps"
tags: ["incident","postmortem"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Sau khi rollback một bản triển khai lỗi, làm thế nào để sự cố không chỉ kết thúc bằng câu tránh lặp lại?

## Trả lời

Ghi tác động người dùng, timeline, cách phát hiện, cách khôi phục và những điều kiện góp phần gây sự cố. Đề xuất hành động có người chịu trách nhiệm cùng tiêu chí kiểm chứng. [Google SRE: Postmortem Culture](https://sre.google/sre-book/postmortem-culture/)

## Giải thích

Viết theo bằng chứng thay vì đổ lỗi cá nhân. Một thao tác sai có thể xảy ra vì runbook mơ hồ, kiểm tra thiếu hoặc giao diện khó hiểu. Giải pháp phải chạm nguyên nhân hệ thống phù hợp.

Ví dụ: thay vì yêu cầu cẩn thận hơn, thêm kiểm tra migration trên bản sao dữ liệu và định nghĩa điều kiện rollback. Không cần thêm quy trình nặng cho mọi sự cố nhỏ; ưu tiên tác động và khả năng tái diễn.

Bài tự luyện: viết postmortem một trang cho một lỗi lab. Với mỗi hành động, ghi cách chứng minh hành động đã làm giảm nguy cơ.

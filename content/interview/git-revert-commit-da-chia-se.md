---
title: "Hoàn tác commit đã chia sẻ bằng cách nào?"
description: "Dùng revert để giữ lịch sử kiểm chứng được của nhánh chung."
date: "2026-10-14"
category: "Git"
tags: ["revert","rollback"]
difficulty: beginner
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Một commit lỗi đã được merge vào nhánh chung. Bạn hoàn tác thế nào?

## Trả lời

Với commit thường, git revert tạo commit mới đảo ngược thay đổi của commit đã chọn. Lịch sử vẫn cho biết thay đổi ban đầu và lần hoàn tác. [git revert](https://git-scm.com/docs/git-revert)

```bash
git status
git show COMMIT_SHA
git revert COMMIT_SHA
```

## Giải thích

Thay COMMIT_SHA bằng mã đã kiểm tra. Working tree cần sạch. Revert có thể xung đột nếu mã sau đó phụ thuộc thay đổi cũ; giải quyết và chạy kiểm tra trước khi chia sẻ.

Merge commit cần xác định mainline phù hợp, vì vậy không áp dụng máy móc câu lệnh trên cho mọi commit. Hoàn tác mã cũng không tự hoàn tác dữ liệu đã ghi, migration hay tài nguyên ngoài Git. Kế hoạch rollback phải xem xét các tác động đó.

Bài tự luyện: tạo một commit nhỏ trong repo lab, revert rồi xem log để xác nhận cả hai commit còn tồn tại.


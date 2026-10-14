---
title: "Khi nào chọn merge và khi nào chọn rebase?"
description: "Hiểu ảnh hưởng lên lịch sử commit và cộng tác nhóm."
date: "2026-10-14"
category: "Git"
tags: ["merge","rebase"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Nhánh tính năng cần cập nhật từ main. Hai lựa chọn merge và rebase khác nhau thế nào?

## Trả lời

Merge nối lịch sử các nhánh, có thể tạo merge commit; nếu phù hợp có thể fast-forward. Rebase phát lại commit lên điểm gốc mới, thường tạo commit có mã mới. [git merge](https://git-scm.com/docs/git-merge), [git rebase](https://git-scm.com/docs/git-rebase)

## Giải thích

Dùng quy ước của nhóm. Rebase thuận tiện để làm sạch nhánh cá nhân trước khi chia sẻ. Viết lại nhánh đã có người dùng cần phối hợp vì họ có thể đang dựa vào các commit cũ.

Trước khi merge, bảo đảm thay đổi cục bộ đã được lưu và đọc diff:

```bash
git status
git fetch origin
git log --oneline --graph --all -12
git merge origin/main
```

Khi xung đột, sửa nội dung theo ý nghĩa chương trình rồi kiểm tra hành vi; xóa ký hiệu xung đột chưa đủ. Bài tự luyện: dựng hai nhánh trong repo lab và vẽ lịch sử sau từng cách.

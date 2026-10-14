---
title: 'Git cho nhóm nhỏ: nhánh ngắn, commit rõ, sửa lỗi an toàn'
description: 'Thực hành một vòng làm việc Git trong repository tạm, hiểu rebase, merge và cách giữ đường quay lại.'
date: '2026-09-24'
category: Git
tags: ['git', 'workflow', 'code-review', 'version-control']
difficulty: beginner
featured: false
draft: false
author: 'DevOps Knowledge Hub'
---

## Mở đầu: lịch sử cần giúp người tiếp theo

Git lưu lại thay đổi, nhưng lịch sử hữu ích cần thể hiện lý do của từng thay đổi. Một nhánh kéo dài nhiều tuần và gom cả sửa lỗi lẫn định dạng thường khó review. Với nhóm nhỏ, cách làm dễ duy trì là một nhánh cho một mục tiêu, commit đủ rõ và tích hợp sớm sau khi kiểm tra.

Bài thực hành dùng repository tạm trên Linux hoặc Git Bash. Không chạy các lệnh tạo tệp trong repository đang làm việc. Mục tiêu là quan sát nhánh và lịch sử, không chuẩn hóa toàn bộ quy trình của mọi đội. Chính sách tích hợp cuối cùng vẫn cần phù hợp với công cụ review và quy định của nhóm.

## Nền tảng: working tree, staging và commit

Working tree là tệp đang sửa; staging area chọn phần sẽ vào commit; commit ghi snapshot cùng metadata. Vì vậy `git diff` và `git diff --cached` trả lời hai câu hỏi khác nhau. Thêm tệp vào staging chưa có nghĩa nội dung đã được lưu thành commit.

Merge giữ đường lịch sử của hai nhánh. Rebase phát lại các commit trên nền mới, nên thường tạo commit có định danh khác. Với nhánh đã chia sẻ, cần phối hợp trước khi viết lại lịch sử. Các chế độ tiếp tục và hủy được giải thích ở [tài liệu `git rebase`](https://git-scm.com/docs/git-rebase).

## Thực hành: một vòng làm việc có điểm kiểm tra

```bash
lab_dir=$(mktemp -d)
cd "$lab_dir"
git init -b main
git config user.name 'DevOps Lab'
git config user.email 'lab@example.com'
printf 'Trang thai: dang hoc\n' > note.txt
git add note.txt
git commit -m 'docs: add lab note'
git switch -c docs/clarify-note
printf 'Trang thai: da kiem tra\n' >> note.txt
git diff
git add note.txt
git diff --cached
git commit -m 'docs: record verification status'
git log --oneline --graph --all
```

Ở repository thật, xem `git status` trước khi chuyển nhánh. Kiểm tra diff staged để tránh đưa tệp sinh tự động, thông tin riêng hoặc thay đổi chưa liên quan vào commit. Nếu chỉ một phần tệp thuộc mục tiêu hiện tại, `git add -p` giúp chọn từng hunk.

Trong nhóm, lấy dữ liệu từ remote bằng `git fetch`, rồi chọn merge hoặc rebase theo chính sách. Nếu đang rebase và gặp conflict, sửa nội dung theo ý nghĩa của cả hai phía, kiểm tra lại, `git add` các tệp đã giải quyết rồi dùng `git rebase --continue`. Khi chưa chắc, `git rebase --abort` quay về trước lần rebase đó.

Trước một thao tác viết lại lịch sử ở sandbox, tạo nhánh đánh dấu từ HEAD. Khi cần tìm commit vừa rời khỏi, xem `git reflog`, xác minh nội dung bằng `git show`, rồi tạo nhánh cứu hộ từ định danh đã xác nhận. [Tài liệu reflog](https://git-scm.com/docs/git-reflog) giải thích đây là nhật ký cập nhật reference cục bộ, có thời hạn lưu; nó không thay thế backup.

## Sai lầm thường gặp

- Commit mọi thứ bằng thói quen mà không xem staging: review sẽ bị lẫn nhiều mục tiêu.
- Dùng reset mạnh để “làm sạch” khi còn thay đổi chưa lưu: có thể mất công việc trong working tree.
- Giải conflict bằng cách chọn toàn bộ một phía: dễ bỏ mất sửa lỗi của đồng đội.
- Force push lên nhánh dùng chung mà không phối hợp: người khác có thể đang dựa vào lịch sử cũ.

## Tổng kết

Giữ nhánh ngắn và kiểm tra nội dung trước từng commit. Khi thao tác phức tạp, tạo điểm quay lại trước, hiểu tác động rồi mới tiếp tục. Lịch sử rõ làm việc review, tìm regression và chuyển giao dễ hơn; đó là giá trị thực tế của một workflow Git đơn giản.

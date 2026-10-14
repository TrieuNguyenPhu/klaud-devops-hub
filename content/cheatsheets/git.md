---
title: "Git: thay đổi nhỏ và lịch sử rõ ràng"
description: "Tra nhanh diff, nhánh, commit và cách hoàn tác có kiểm chứng."
date: "2026-10-14"
category: "Git"
tags: ["git","commands","cheatsheet"]
difficulty: beginner
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Cách dùng

Chạy trong repo lab hoặc repo bạn được phép sửa. origin/main, đường dẫn và mã commit là mẫu; kiểm tra remote, nhánh thực tế trước khi dùng.

## Đọc trước khi sửa

status cho biết working tree và index; diff so sánh nội dung chưa stage hoặc đã stage.

```bash
git status --short
git diff
git diff --cached
git log --oneline --graph -12
```

[git status](https://git-scm.com/docs/git-status), [git diff](https://git-scm.com/docs/git-diff)

## Tạo nhánh và commit có phạm vi

Chỉ stage các tệp thuộc thay đổi của bạn; đọc diff đã stage trước commit.

```bash
git switch -c feat/lab-note
git add docs/lab-note.md
git diff --cached
git commit -m "docs: add lab note"
```

Nếu nhánh đã tồn tại, dùng git switch với tên đó. [git switch](https://git-scm.com/docs/git-switch), [git add](https://git-scm.com/docs/git-add)

## Cập nhật nhánh

fetch lấy thông tin từ remote; merge tích hợp nhánh đã lấy.

```bash
git fetch origin
git log --oneline HEAD..origin/main
git merge origin/main
```

Lưu thay đổi cục bộ trước khi merge. Khi có xung đột, sửa theo hành vi mong muốn rồi kiểm tra. [git merge](https://git-scm.com/docs/git-merge)

## Bỏ stage nhưng giữ thay đổi

Lệnh sau chỉ bỏ tệp khỏi index, giữ phần sửa trong working tree.

```bash
git restore --staged docs/lab-note.md
```

Đừng nhầm với restore tệp trong working tree, thao tác có thể bỏ thay đổi chưa lưu. [git restore](https://git-scm.com/docs/git-restore)

## Hoàn tác commit thường đã chia sẻ

Xem commit trước; revert tạo commit đảo ngược để lưu dấu lần hoàn tác.

```bash
git show COMMIT_SHA
git revert COMMIT_SHA
```

Không áp dụng máy móc cho merge commit; cần chọn mainline đúng. [git revert](https://git-scm.com/docs/git-revert)

## Bài lab ngắn

Tạo repo thử nghiệm, sửa một tệp, stage rồi bỏ stage và xác nhận nội dung vẫn còn. Cuối cùng commit rồi revert. Đọc tiếp [nhánh nhỏ và lịch sử rõ](/blog/git-nhanh-nho-lich-su-ro).

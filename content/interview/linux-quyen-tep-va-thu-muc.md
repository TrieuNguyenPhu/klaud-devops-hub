---
title: "Quyền r, w, x trên tệp và thư mục khác nhau thế nào?"
description: "Phân biệt quyền đọc, ghi, thực thi để chẩn đoán lỗi permission denied."
date: "2026-10-14"
category: "Linux"
tags: ["permissions","interview"]
difficulty: beginner
featured: true
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Một người dùng đọc được tệp nhưng không mở được thư mục chứa nó. Bạn giải thích và kiểm tra thế nào?

## Trả lời

Trên tệp, r cho phép đọc nội dung, w cho phép sửa nội dung và x cho phép thực thi. Trên thư mục, r cho phép liệt kê tên, w cho phép thay đổi các mục và x cho phép đi qua thư mục để truy cập mục bên trong. Quyền của từng thư mục cha cũng ảnh hưởng đường dẫn. [GNU: quyền truy cập](https://www.gnu.org/software/coreutils/manual/html_node/Mode-Structure.html)

## Giải thích qua tình huống

Đừng xử lý mọi lỗi bằng chmod 777. Xác định người chạy tiến trình, nhóm sở hữu và thành phần nào của đường dẫn thiếu quyền. Ví dụ chỉ cấp quyền thực thi cho chủ sở hữu một script đã kiểm tra:

```bash
id
ls -ld /srv /srv/app
ls -l /srv/app/start.sh
chmod u+x /srv/app/start.sh
```

Bài tự luyện: tạo một thư mục trong môi trường lab, thay đổi riêng quyền x rồi so sánh khả năng liệt kê và truy cập tệp đã biết tên.

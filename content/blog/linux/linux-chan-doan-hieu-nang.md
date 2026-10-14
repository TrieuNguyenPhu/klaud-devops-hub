---
title: 'Chẩn đoán máy Linux chậm bằng bằng chứng'
description: 'Quy trình đọc CPU, bộ nhớ, ổ đĩa và tiến trình trước khi thay đổi một máy Linux đang gặp sự cố.'
date: '2026-09-18'
category: Linux
tags: ['linux', 'troubleshooting', 'performance', 'observability']
difficulty: beginner
featured: true
draft: false
author: 'DevOps Knowledge Hub'
---

## Mở đầu: máy chậm chưa phải là chẩn đoán

Một API trả lời chậm có thể do CPU bận, tiến trình chờ đĩa hoặc ứng dụng đang đợi dịch vụ khác. Khởi động lại ngay thường làm mất dấu vết và chỉ giúp tạm thời. Bài này đưa ra thứ tự quan sát trên máy Linux thử nghiệm. Các lệnh đều đọc trạng thái; không tạo tải, dừng tiến trình hoặc sửa cấu hình hệ thống.

Trước khi mở terminal, ghi thời điểm bắt đầu, chức năng bị ảnh hưởng và thay đổi gần nhất. Nếu chỉ một endpoint chậm, đừng vội kết luận toàn bộ máy thiếu tài nguyên. Một mô tả cụ thể giúp nối số liệu hệ thống với hành vi người dùng.

## Nền tảng: nhìn tài nguyên theo thời gian

Load average khác phần trăm CPU. Nó phản ánh tác vụ chạy được hoặc đang chờ không ngắt được; vì vậy load cao chưa đủ chứng minh CPU quá tải. So sánh số liệu nhiều lần và xét số CPU mà môi trường cấp cho ứng dụng. Trên container, giới hạn tài nguyên còn quan trọng hơn cấu hình máy chủ.

Linux cung cấp thông tin tiến trình và bộ nhớ qua `/proc`. Các trường như `VmRSS`, `Threads` và trạng thái tiến trình giúp đặt câu hỏi cụ thể hơn, nhưng một ảnh chụp không thể hiện xu hướng. Xem mô tả trường tại [tài liệu `/proc` của Linux kernel](https://docs.kernel.org/filesystems/proc.html).

## Thực hành: thu hẹp điểm nghẽn

Chạy trên VM hoặc WSL Linux đã có các tiện ích tương ứng:

```bash
date -Is
uptime
free -h
df -h
df -i
vmstat 1 5
ps -eo pid,comm,state,%cpu,%mem --sort=-%cpu | head -n 12
```

`df -h` kiểm tra dung lượng; `df -i` kiểm tra inode. Một ổ còn nhiều gigabyte vẫn có thể không tạo được tệp nếu hết inode. Với `vmstat`, bỏ qua kết luận vội từ dòng đầu vì nó có thể tổng hợp từ lúc khởi động; đọc những mẫu tiếp theo. Ghi lại CPU, hàng đợi và hoạt động swap cùng thời điểm lỗi.

Chọn PID từ kết quả `ps`, rồi thay `1234` bằng tiến trình cần xem:

```bash
cat /proc/1234/status
ls -l /proc/1234/fd
```

Nếu không có quyền, dùng tài khoản được cấp quyền đọc thay vì thay quyền cả cây thư mục. Không công khai kết quả chứa đường dẫn nội bộ. Kiểm tra log ứng dụng trong cùng cửa sổ thời gian. Khi nghi ổ đĩa, đối chiếu lỗi ghi tệp với dung lượng và inode; khi nghi bộ nhớ, xem tăng trưởng qua nhiều mẫu.

Một kết luận tốt có dạng: “Trong năm phút lỗi, hàng đợi tăng và tiến trình ứng dụng tiêu thụ CPU liên tục.” Kết luận này gợi ý đo đoạn xử lý ứng dụng. “Máy chậm” thì chưa chỉ ra hành động nào có thể kiểm chứng.

## Sai lầm thường gặp

- Xem bộ nhớ `free` thấp là lỗi: cache cũng sử dụng RAM; đọc cả giá trị `available` và dấu hiệu áp lực bộ nhớ.
- Xóa log để giải phóng đĩa trước khi lưu bằng chứng: có thể mất dữ liệu cần điều tra và vi phạm chính sách lưu trữ.
- Chạy công cụ tạo tải trên production: kết quả có thể gây thêm sự cố, nên tái hiện ở sandbox.
- Đổi nhiều tham số cùng lúc: không xác định được thay đổi nào cải thiện tình hình.

## Tổng kết và bước tiếp theo

Đi từ triệu chứng, thời gian đến tài nguyên, rồi đến tiến trình. Sau một thay đổi nhỏ, đo lại cùng chỉ số và cùng điều kiện. Giữ ghi chú đủ để người trực sau hiểu điều đã quan sát. Khi cần tra chính xác hành vi `df`, xem [mã tài liệu GNU Coreutils](https://github.com/coreutils/coreutils/blob/master/doc/coreutils.texi), rồi kiểm tra `df --help` trên máy đang dùng.

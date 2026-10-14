---
title: 'Truy vết DNS khi tên miền không trỏ đúng địa chỉ'
description: 'Phân biệt resolver, authoritative server, cache và lỗi kết nối bằng một quy trình DNS có thể lặp lại.'
date: '2026-09-21'
category: Networking
tags: ['dns', 'networking', 'dig', 'troubleshooting']
difficulty: beginner
featured: false
draft: false
author: 'DevOps Knowledge Hub'
---

## Mở đầu: xác định lỗi nằm ở lớp nào

Một trình duyệt báo không mở được website chưa chứng minh DNS hỏng. Tên miền có thể phân giải đúng nhưng cổng ứng dụng không mở, TLS sai hoặc máy chủ trả lỗi. Ta cần tách việc tìm địa chỉ khỏi việc kết nối. Bài này dùng `example.com`, tên miền dành cho ví dụ, và các truy vấn chỉ đọc từ máy Linux có `dig`.

Trước khi thử, ghi tên miền đầy đủ, loại bản ghi cần kiểm tra và mạng đang dùng. Máy trong VPN và máy ngoài Internet có thể nhận câu trả lời khác nhau theo thiết kế. So sánh chúng mà không ghi bối cảnh dễ dẫn đến sửa nhầm cấu hình đang hoạt động đúng.

## Nền tảng: resolver không phải nơi lưu mọi bản ghi

Ứng dụng thường hỏi resolver của hệ thống. Resolver có thể trả cache hoặc hỏi tiếp các máy chủ khác. Authoritative server quản lý câu trả lời cho zone tương ứng. `A` chứa IPv4, `AAAA` chứa IPv6, còn `CNAME` dẫn đến một tên khác. Khi chẩn đoán, kiểm tra loại ứng dụng thực sự cần thay vì chỉ nhìn một địa chỉ.

TTL ảnh hưởng thời gian cache; giảm TTL sau khi câu trả lời cũ đã được cache không làm cache đó biến mất ngay. `NXDOMAIN` khác timeout: một bên là phản hồi tên không tồn tại, một bên chưa nhận được phản hồi đúng hạn. Cú pháp và tùy chọn truy vấn được mô tả trong [manual `dig` của ISC BIND](https://bind9.readthedocs.io/en/latest/manpages.html#dig-dns-lookup-utility).

## Thực hành: so sánh câu trả lời có kiểm soát

```bash
dig example.com A
dig example.com AAAA
dig example.com NS
dig example.com A +tcp
```

Đọc `status`, phần `ANSWER`, TTL và `SERVER`, không chỉ địa chỉ cuối cùng. Truy vấn TCP hữu ích khi cần so sánh đường truyền DNS TCP với UDP. Đừng xem `+short` là đủ cho điều tra vì nó bỏ nhiều bối cảnh.

Nếu chính sách mạng cho phép dùng resolver công cộng, thử một truy vấn riêng:

```bash
dig @1.1.1.1 example.com A
dig +trace example.com A
```

Lệnh đầu chọn resolver cụ thể; lệnh sau theo dõi quá trình truy vấn từ root. Mạng doanh nghiệp có thể chặn đường này, nên `+trace` thất bại chưa chứng minh authoritative server lỗi. Không dùng resolver công cộng để hỏi tên nội bộ nhạy cảm. Hãy kiểm tra máy chủ DNS được tổ chức cho phép trước.

Tiếp theo, đối chiếu truy vấn trên máy ứng dụng với máy cá nhân. Nếu câu trả lời đúng ở cả hai, chuyển sang kiểm tra HTTP:

```bash
curl -I --connect-timeout 5 https://example.com
```

HTTP phản hồi lỗi vẫn cho biết đã đi xa hơn bước phân giải tên. Nếu cần quy trình theo lớp cho sự cố mạng, [hướng dẫn DNS của Cloudflare](https://developers.cloudflare.com/dns/troubleshooting/) bổ sung những tình huống liên quan đến cấu hình zone và DNSSEC.

## Sai lầm thường gặp

- Thay DNS cả hệ thống ngay sau một truy vấn lỗi: có thể bỏ qua split DNS hoặc chính sách VPN.
- Xem `ping` thất bại là DNS lỗi: máy chủ có thể không cho ICMP dù dịch vụ vẫn hoạt động.
- Quên IPv6: ứng dụng có thể ưu tiên `AAAA`, trong khi người vận hành chỉ kiểm tra `A`.
- Thử tên ngắn mà không xét search domain: kết quả có thể phụ thuộc cấu hình resolver của máy.

## Tổng kết

Giữ một bảng nhỏ gồm máy thử, resolver, loại bản ghi, status và thời điểm. Khi câu trả lời khác nhau, tìm lớp tạo ra khác biệt trước khi sửa. DNS trở nên dễ hiểu hơn khi mỗi phép thử trả lời một câu hỏi cụ thể, và mọi thay đổi đều được kiểm tra lại từ mạng của người dùng.

---
title: "Security group và network ACL khác nhau thế nào?"
description: "Phân biệt phạm vi và xử lý lưu lượng phản hồi trong VPC."
date: "2026-10-14"
category: "AWS"
tags: ["vpc","security-groups"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Câu hỏi

Vì sao request đi ra được nhưng response bị chặn sau khi chỉnh network ACL?

## Trả lời

Security group gắn với tài nguyên mạng, có quy tắc allow và theo dõi trạng thái kết nối. Network ACL áp dụng ở subnet, hỗ trợ allow, deny và không theo dõi trạng thái. Vì thế phải xét cả chiều đi và chiều về của NACL. [Security groups](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html), [Network ACLs](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)

## Giải thích

Quy tắc NACL được xét theo thứ tự số; một deny sớm có thể thắng allow sau. Với client TCP, lưu lượng trả về thường tới cổng tạm thời của client. Kiểm tra dải cổng thực tế của hệ điều hành và đường đi đầy đủ.

Đừng mở tất cả cổng để chữa triệu chứng. Đọc route, listener, security group, NACL và flow logs theo cùng một kết nối.

Bài tự luyện: vẽ hai chiều client–server, điền cổng nguồn, cổng đích của từng gói rồi đối chiếu quy tắc.


---
title: "AWS Certified Solutions Architect – Associate"
description: "Học cách chọn kiến trúc AWS theo bảo mật, độ bền, hiệu năng và chi phí."
date: "2026-10-14"
category: "AWS"
tags: ["aws","saa-c03","architecture"]
difficulty: intermediate
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Tổng quan

AWS Certified Solutions Architect – Associate (SAA-C03) tập trung vào thiết kế giải pháp AWS theo các ràng buộc của workload. Cần biết giải thích đánh đổi của một lựa chọn, thay vì chỉ thuộc tên dịch vụ. [AWS: Exam Guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html)

## Nhóm nội dung

- Kiến trúc bảo mật.
- Kiến trúc có khả năng phục hồi.
- Kiến trúc hiệu năng cao.
- Kiến trúc tối ưu chi phí.

## Chủ đề nên nắm

VPC, IAM, lựa chọn storage, database, cân bằng tải, scale và phục hồi dữ liệu là nền để phân tích tình huống. Với RDS, phân biệt Multi-AZ DB instance dùng standby cho failover với những mô hình có reader phục vụ đọc. [AWS: RDS Multi-AZ](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)

## Cách luyện

Vẽ kiến trúc API cho một workload nhỏ. Lần lượt thêm yêu cầu một AZ bị lỗi, dữ liệu riêng tư và lượng truy cập tăng. Mỗi vòng ghi điều gì thay đổi và vì sao. Với lab cloud, đặt ngân sách và dọn tài nguyên sau buổi học.

## Tài liệu chính thức

- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [AWS Skill Builder](https://skillbuilder.aws/)
- [Bài IAM tại hub](/blog/aws-iam-quyen-toi-thieu)

Bộ tự luyện là nội dung gốc để củng cố kiến thức, không đại diện đề thi thật. Đối chiếu phạm vi mới nhất ở exam guide.


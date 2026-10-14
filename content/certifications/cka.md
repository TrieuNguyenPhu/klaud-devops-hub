---
title: "Certified Kubernetes Administrator (CKA)"
description: "Học quản trị cluster và chẩn đoán lỗi bằng thao tác có kiểm chứng."
date: "2026-10-14"
category: "Kubernetes"
tags: ["kubernetes","cka","administration"]
difficulty: intermediate
featured: true
draft: false
author: "DevOps Knowledge Hub"
---

## Tổng quan

CKA xác nhận kỹ năng quản trị Kubernetes qua bài thực hành dòng lệnh. Bạn cần tạo, đọc và sửa tài nguyên trong cluster, đồng thời xác minh kết quả sau thao tác. [CNCF: CKA](https://www.cncf.io/training/certification/cka/)

## Nhóm nội dung

- Kiến trúc, cài đặt và cấu hình cluster.
- Workload và scheduling.
- Service và networking.
- Storage.
- Troubleshooting.

## Chủ đề nên nắm

Vai trò control plane, tài nguyên workload, labels, scheduler, Service, DNS, volume và trạng thái node. Học đọc events trước khi sửa cấu hình.

## Cách luyện

Dùng cluster lab riêng. Tạo một Deployment, expose qua Service, gắn volume và cố ý gây lỗi selector hoặc image. Với mỗi lỗi, viết giả thuyết, lệnh kiểm tra và bằng chứng phục hồi. Đừng chỉ kiểm tra lệnh trả exit code thành công: xem Pod Ready và phản hồi thực tế.

## Tài liệu chính thức

- [CNCF curriculum](https://github.com/cncf/curriculum)
- [Kubernetes documentation](https://kubernetes.io/docs/home/)
- [Linux Foundation: handbook](https://docs.linuxfoundation.org/tc-docs/certification/lf-handbook2)
- [Probes tại hub](/blog/kubernetes-probes-dung-muc-dich)

Tham khảo handbook, curriculum và FAQ hiện hành để biết môi trường cùng quy tắc thi. Các bài lab của hub được biên soạn mới, không phải nội dung lấy từ bài thi.


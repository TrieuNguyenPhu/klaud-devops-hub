---
title: 'Kubernetes probes: khởi động, nhận traffic và phát hiện treo'
description: 'Phân biệt startup, readiness và liveness; thử probe trong namespace lab mà không tạo vòng lặp restart.'
date: '2026-10-02'
category: Kubernetes
tags: ['kubernetes', 'probes', 'reliability', 'containers']
difficulty: intermediate
featured: true
draft: false
author: 'DevOps Knowledge Hub'
---

## Mở đầu: restart chưa chắc chữa được lỗi

Một ứng dụng chờ database có thể vẫn sống bình thường. Nếu liveness thất bại mỗi khi database chậm, Kubernetes liên tục restart ứng dụng, làm tải khởi động tăng đúng lúc hệ thống đang yếu. Cách thiết kế probe cần bắt đầu từ hành động mong muốn: chờ khởi động, tạm ngừng nhận traffic hoặc phục hồi tiến trình bị treo.

Bài lab dùng Nginx để quan sát hành vi HTTP probe. Chỉ thực hành trên cluster cục bộ hoặc cluster thử nghiệm đã được cho phép. Namespace riêng giúp nhìn rõ tài nguyên, nhưng không thay thế việc xác nhận context trước mọi thay đổi.

## Nền tảng: ba câu hỏi khác nhau

Startup probe xác nhận ứng dụng đã hoàn tất khởi động. Khi có startup probe, liveness và readiness chờ nó thành công. Readiness quyết định Pod có sẵn sàng nhận traffic qua Service hay không. Liveness thất bại đủ ngưỡng khiến kubelet restart container theo cấu hình liên quan. Xem [khái niệm probes](https://kubernetes.io/docs/concepts/workloads/pods/probes/) để hiểu vòng đời này.

Không dùng một endpoint kiểm tra toàn bộ dependency cho cả ba mục đích. Endpoint liveness nên trả lời ứng dụng có khả năng tự tiến triển hay không. Endpoint readiness có thể xét những điều kiện cần để phục vụ request. Một database chung ngừng hoạt động không nhất thiết cần restart mọi Pod.

## Thực hành: quan sát trước khi tăng độ phức tạp

Trước hết kiểm tra môi trường:

```bash
kubectl config current-context
kubectl get namespaces
kubectl create namespace probes-lab
```

Nếu namespace đã tồn tại, xác nhận nó thuộc lab này trước khi tiếp tục. Tạo `pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web
  namespace: probes-lab
spec:
  containers:
    - name: nginx
      image: nginx:1.28-alpine
      ports:
        - name: http
          containerPort: 80
      startupProbe:
        httpGet:
          path: /
          port: http
        periodSeconds: 2
        failureThreshold: 30
      readinessProbe:
        httpGet:
          path: /
          port: http
        periodSeconds: 5
      livenessProbe:
        httpGet:
          path: /
          port: http
        periodSeconds: 10
        failureThreshold: 3
```

```bash
kubectl apply --dry-run=server -f pod.yaml
kubectl apply -f pod.yaml
kubectl wait --for=condition=Ready pod/web -n probes-lab --timeout=90s
kubectl describe pod web -n probes-lab
kubectl logs web -n probes-lab --tail=20
```

`describe` giúp xem event, trạng thái và số restart. Để thử readiness thất bại, sửa riêng đường dẫn readiness thành `/khong-ton-tai`, rồi thay Pod lab sau khi xác nhận đúng namespace. Kỳ vọng Pod không Ready; liveness tại `/` vẫn thành công. Không thử thay đổi này trên workload đang phục vụ người dùng.

Nginx dùng cùng `/` trong ví dụ để minh họa cấu hình, không mô phỏng đầy đủ sức khỏe ứng dụng. Với dịch vụ thật, xây endpoint riêng và đo thời gian khởi động xấu nhất. Chọn ngưỡng từ số liệu thay vì sao chép một bộ số. [Hướng dẫn cấu hình probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/) có chi tiết timeout, threshold và các loại probe.

## Sai lầm thường gặp

- Ngưỡng startup quá ngắn: container bị giết trước khi hoàn tất khởi tạo.
- Probe gọi truy vấn nặng: healthcheck trở thành nguồn tải định kỳ.
- Chỉ nhìn trạng thái Running: container chạy chưa bảo đảm Pod Ready.
- Thử endpoint từ laptop rồi kết luận kubelet cũng truy cập được: đường mạng và địa chỉ có thể khác.

## Tổng kết

Thiết kế mỗi probe theo hành động cần thực hiện, rồi quan sát event và restart trong lab. Sau khi kiểm tra, xóa đúng Pod thử nghiệm bằng `kubectl delete pod web -n probes-lab`. Đưa cấu hình lên workload thật chỉ khi endpoint và ngưỡng đã được kiểm chứng với hành vi ứng dụng.

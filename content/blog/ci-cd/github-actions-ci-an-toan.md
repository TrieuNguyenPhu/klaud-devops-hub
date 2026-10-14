---
title: 'GitHub Actions: pipeline CI nhỏ với quyền vừa đủ'
description: 'Một workflow Node.js kiểm tra và build pull request, giới hạn quyền token và tránh chạy mã chưa tin cậy cùng bí mật.'
date: '2026-10-10'
category: CI/CD
tags: ['github-actions', 'ci-cd', 'automation', 'security']
difficulty: intermediate
featured: true
draft: false
author: 'DevOps Knowledge Hub'
---

## Mở đầu: CI cần tạo bằng chứng có thể review

Một pipeline tốt giúp người review biết commit nào đã được kiểm tra và bằng cách nào. Không cần bắt đầu với nhiều môi trường, ma trận phiên bản hoặc tự động deploy. Với ứng dụng Node.js nhỏ, cài dependency từ lockfile, chạy test và build là một lát cắt đủ để tìm nhiều lỗi trước khi merge.

Ví dụ dưới đây dành cho repository thử nghiệm đã có `package.json`, `package-lock.json`, cùng script `test` và `build` chạy không tương tác. Nếu dự án dùng runtime hoặc package manager khác, giữ các lệnh của dự án. Không tạo test giả chỉ để pipeline hiện màu xanh.

## Nền tảng: mã PR là đầu vào chưa tin cậy

Workflow có thể chạy mã từ pull request, bao gồm script cài đặt dependency. Vì vậy CI kiểm tra mã không nên mang credential triển khai. Chỉ cấp quyền token cần cho job. Việc một action đến từ repository quen thuộc cũng không thay thế review nguồn và kiểm soát phiên bản.

GitHub cung cấp hướng dẫn [secure use](https://docs.github.com/en/actions/reference/security/secure-use) về quyền token, đầu vào và dependency workflow. Pin action bằng commit SHA đã xác minh giúp tránh reference bị di chuyển. Với repository áp dụng dependency lockfile cho workflow, làm theo cơ chế khóa được tổ chức hỗ trợ và có lịch cập nhật rõ ràng.

## Thực hành: một job kiểm tra độc lập

Tạo `.github/workflows/ci.yml` trong repository lab:

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]
permissions:
  contents: read
concurrency:
  group: ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
jobs:
  verify:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683
        with:
          persist-credentials: false
      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020
        with:
          node-version: '22'
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
```

Hai SHA tham chiếu đến commit trong repository chính thức của [checkout](https://github.com/actions/checkout/commit/11bd71901bbe5b1630ceea73d27597364c9af683) và [setup-node](https://github.com/actions/setup-node/commit/49933ea5288caeca8642d1e84afbd3f7d6820020). Đây là phiên bản cụ thể cho ví dụ, không có nghĩa nên giữ mãi; review bản cập nhật và kiểm tra lại khi thay SHA.

Chạy ba lệnh npm cục bộ trước. Sau khi mở PR trong repository lab, xem tab Actions: commit, từng bước và exit code phải khớp điều bạn muốn kiểm tra. Tạo một lỗi có chủ đích trong test lab, xác nhận job thất bại rồi sửa lại. Phép thử này kiểm chứng gate thực sự phát hiện lỗi, thay vì chỉ chạy một lệnh luôn thành công.

Concurrency hủy lần chạy cũ cùng nhóm để giảm công việc thừa. Vì job chỉ kiểm tra, việc hủy thường dễ chấp nhận; không sao chép cấu hình này sang một job triển khai có thao tác đang dang dở. [Workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax) giải thích trigger, quyền, timeout và concurrency.

## Sai lầm thường gặp

- Dùng `pull_request_target` rồi checkout, chạy mã PR cùng bí mật: trộn mức tin cậy có thể làm lộ quyền.
- Gắn `continue-on-error` cho test bắt buộc: pipeline xanh dù điều kiện chất lượng thất bại.
- In toàn bộ environment để debug: có thể lộ thông tin cấu hình hoặc bí mật.
- Bỏ lockfile rồi dùng cài đặt dependency không cố định: khó lặp lại lỗi giữa máy cá nhân và CI.

## Tổng kết

Bắt đầu bằng một job có mục tiêu rõ, quyền tối thiểu và thử nghiệm thất bại có chủ đích. Khi bổ sung CD, tách job triển khai, xác thực tạm thời và bảo vệ môi trường theo nhu cầu thật. Mỗi bước mới cần tạo ra bằng chứng hoặc hành vi hữu ích cho nhóm, không chỉ làm workflow dài hơn.

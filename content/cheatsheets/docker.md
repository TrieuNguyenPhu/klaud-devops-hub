---
title: "Docker: build, chạy và quan sát container"
description: "Tra nhanh lệnh Docker và Compose theo vòng đời ứng dụng lab."
date: "2026-10-14"
category: "Docker"
tags: ["docker","compose","cheatsheet"]
difficulty: beginner
featured: false
draft: false
author: "DevOps Knowledge Hub"
---

## Cách dùng

Các lệnh cần Docker Engine hoạt động. myapp, myapp:local và thư mục hiện tại là mẫu. Kiểm tra Dockerfile, image và dữ liệu trước thao tác thay đổi.

## Build image

Tag giúp nhận diện image lab; đọc log build để biết stage nào thất bại.

```bash
docker build -t myapp:local .
docker image ls
docker image inspect myapp:local
```

Với Dockerfile có nhiều stage, chỉ copy artifact cần thiết vào stage chạy. [Docker: multi-stage build](https://docs.docker.com/build/building/multi-stage/)

## Chạy giới hạn ở localhost

Ví dụ ứng dụng bên trong container lắng nghe cổng 8080. Chỉ bind cổng host vào loopback cho buổi lab.

```bash
docker run --detach --name myapp   --publish 127.0.0.1:8080:8080 myapp:local
docker container ls --all
curl -I http://127.0.0.1:8080
```

Ứng dụng cần lắng nghe trên interface phù hợp trong container. Đổi cổng theo ứng dụng thực tế. [docker run](https://docs.docker.com/reference/cli/docker/container/run/)

## Quan sát trước khi restart

Inspect hiển thị cấu hình runtime; logs cho biết đầu ra ứng dụng.

```bash
docker logs --tail 80 myapp
docker inspect myapp
docker stats --no-stream myapp
```

Một container Running chưa đảm bảo ứng dụng phục vụ được request. [docker logs](https://docs.docker.com/reference/cli/docker/container/logs/)

## Compose

Chạy trong thư mục có compose.yaml và đọc cấu hình đã resolve trước khi tạo tài nguyên.

```bash
docker compose config
docker compose up --detach
docker compose ps
docker compose logs --tail 80
```

config có thể hiển thị giá trị nhạy cảm nếu cấu hình chứa chúng; không chia sẻ đầu ra chưa kiểm tra. [Docker Compose CLI](https://docs.docker.com/reference/cli/docker/compose/)

## Dừng lab có chủ đích

Lệnh down dừng và loại bỏ tài nguyên Compose thuộc dự án; không thêm --volumes nếu cần giữ dữ liệu.

```bash
docker compose down
```

Named volume cần kế hoạch backup và dọn riêng. [Docker: volumes](https://docs.docker.com/engine/storage/volumes/)

## Bài lab ngắn

Build, chạy, kiểm tra HTTP rồi đọc logs của cùng một image. Đọc tiếp [multi-stage thực hành](/blog/docker-multi-stage-thuc-hanh) và [Compose healthcheck](/blog/docker-compose-healthcheck).

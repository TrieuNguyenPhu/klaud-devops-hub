export const technologies = [
  { name: "AWS", slug: "aws", description: "Thiết kế và vận hành trên cloud", topics: ["IAM", "VPC", "EC2", "S3", "CloudFront", "Lambda", "CloudWatch", "Route 53", "ECS", "EKS"] },
  { name: "Linux", slug: "linux", description: "Nền tảng của mọi hệ thống", topics: ["Processes", "Permissions", "Filesystem", "Systemd", "Performance"] },
  { name: "Docker", slug: "docker", description: "Đóng gói, chạy và ship ứng dụng", topics: ["Fundamentals", "Dockerfile", "Compose", "Networking", "Volumes", "Image optimization"] },
  { name: "Kubernetes", slug: "kubernetes", description: "Điều phối container ở quy mô lớn", topics: ["Architecture", "Pod", "Deployment", "Service", "Ingress", "ConfigMap & Secret", "Helm", "Troubleshooting"] },
  { name: "Terraform", slug: "terraform", description: "Hạ tầng được quản lý bằng code", topics: ["Providers", "Resources", "State", "Modules", "Remote backend"] },
  { name: "Ansible", slug: "ansible", description: "Tự động hóa cấu hình hệ thống", topics: ["Inventory", "Playbooks", "Roles"] },
  { name: "Git", slug: "git", description: "Lịch sử rõ ràng, cộng tác hiệu quả", topics: ["Branches", "Merge", "Rebase", "GitHub"] },
  { name: "CI/CD", slug: "ci-cd", description: "Từ commit đến production", topics: ["Pipelines", "Artifacts", "Deployment", "Rollback"] },
  { name: "Networking", slug: "networking", description: "Hiểu đường đi của từng gói tin", topics: ["DNS", "TCP/IP", "Routing", "TLS"] },
  { name: "Observability", slug: "observability", description: "Logs, metrics và traces", topics: ["Monitoring", "Metrics", "Tracing", "Alerting"] },
  { name: "Security", slug: "security", description: "Bảo mật từ bước thiết kế", topics: ["Least privilege", "Secrets", "Supply chain"] },
  { name: "DevOps", slug: "devops", description: "Văn hóa, quy trình và thực hành", topics: ["Fundamentals", "Collaboration", "Reliability"] },
] as const;

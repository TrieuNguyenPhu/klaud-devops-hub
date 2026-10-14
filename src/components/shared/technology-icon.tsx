import { SiDocker, SiKubernetes, SiTerraform, SiLinux, SiAnsible, SiGit, SiGithubactions, SiPrometheus } from "react-icons/si";
import { Cloud, Network, ShieldCheck, Terminal } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
const icons: Record<string, IconType | LucideIcon> = { AWS: Cloud, Linux: SiLinux, Docker: SiDocker, Kubernetes: SiKubernetes, Terraform: SiTerraform, Ansible: SiAnsible, Git: SiGit, "CI/CD": SiGithubactions, Networking: Network, Observability: SiPrometheus, Security: ShieldCheck, DevOps: Terminal };
export function TechnologyIcon({ name, size = 24 }: { name: string; size?: number }) { const Icon = icons[name] || Terminal; return <Icon size={size} aria-hidden="true" />; }

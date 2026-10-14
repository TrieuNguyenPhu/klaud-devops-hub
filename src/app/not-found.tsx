import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() { return <div className="container page-main"><div className="empty-state my-20"><p className="section-kicker">404 / CHƯA TÌM THẤY</p><h1 className="text-3xl font-semibold mb-4">Trang này chưa có trong thư viện.</h1><p>Đường dẫn có thể đã thay đổi. Bạn có thể tìm nội dung bằng Ctrl+K.</p><Button asChild><Link href="/">Về trang chủ</Link></Button></div></div>; }

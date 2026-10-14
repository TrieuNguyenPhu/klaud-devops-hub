"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <div className="container page-main"><div className="empty-state my-20"><h1 className="text-3xl font-semibold mb-4">Không thể tải nội dung.</h1><p>Thử tải lại. Nếu lỗi tiếp diễn, kiểm tra log và tệp nội dung được báo lỗi.</p><Button onClick={reset}>Thử lại</Button></div></div>; }

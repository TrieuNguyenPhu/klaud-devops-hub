import { getQuestions } from "@/lib/questions";
import { Quiz } from "@/components/quiz/quiz";
import { PageHeading } from "@/components/shared/page-heading";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Bài luyện tập tổng hợp", "15 câu tự biên soạn để kiểm tra kiến thức AWS, Kubernetes và Terraform.", "/certifications/practice");
export default function Practice() { return <div className="container page-main quiz-layout"><PageHeading eyebrow="QUIZ / TỰ KIỂM TRA" title="Biến kiến thức thành phản xạ." description="Làm bài theo tốc độ của bạn. Mỗi câu trả lời là một cơ hội để hiểu thêm lý do đằng sau một quyết định kỹ thuật." /><Quiz questions={getQuestions()} storageKey="devops-hub:quiz:all" /></div>; }

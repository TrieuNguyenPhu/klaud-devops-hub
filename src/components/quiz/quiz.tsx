"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { isCorrect, restoreProgress, type Progress, type QuizQuestion } from "@/lib/quiz";

export function Quiz({ questions, storageKey }: { questions: QuizQuestion[]; storageKey: string }) {
  const initial: Progress = { version: 2, revision: JSON.stringify(questions), ids: questions.map(q => q.id), answers: {}, submitted: [] };
  const [progress, setProgress] = useState<Progress>(initial);
  const [started, setStarted] = useState(false);
  const [position, setPosition] = useState(0);
  const [review, setReview] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const updateProgress = (value: Progress) => {
    setProgress(value);
    try { localStorage.setItem(storageKey, JSON.stringify(value)); }
    catch { setStorageError(true); }
  };
  const start = () => {
    try {
      const saved = restoreProgress(localStorage.getItem(storageKey), questions);
      if (saved) { setProgress(saved); const next = questions.findIndex(q => !saved.submitted.includes(q.id)); setPosition(next < 0 ? 0 : next); toast.success("Đã khôi phục tiến độ"); }
    } catch { setStorageError(true); }
    setStarted(true);
  };
  const complete = progress.submitted.length === questions.length;
  const wrong = questions.filter(q => progress.submitted.includes(q.id) && !isCorrect(q, progress.answers[q.id] || []));
  const score = questions.filter(q => progress.submitted.includes(q.id) && isCorrect(q, progress.answers[q.id] || [])).length;
  const visible = review ? wrong : questions;
  const question = visible[Math.min(position, visible.length - 1)];
  const submitted = question && progress.submitted.includes(question.id);
  const selected = question ? progress.answers[question.id] || [] : [];
  const choose = (choice: string) => {
    if (submitted || !question) return;
    const next = question.correct.length === 1 ? [choice] : selected.includes(choice) ? selected.filter(id => id !== choice) : [...selected, choice];
    updateProgress({ ...progress, answers: { ...progress.answers, [question.id]: next } });
  };
  const reset = () => { updateProgress(initial); setPosition(0); setReview(false); };
  if (!started) return <div className="quiz-intro"><h2 className="text-xl font-semibold mb-3">Kiểm tra kiến thức của bạn</h2><p>{questions.length} câu hỏi tự biên soạn · Một hoặc nhiều đáp án · Không giới hạn thời gian.</p><p>Tiến độ được lưu trên trình duyệt này. Bạn có thể quay lại để tiếp tục. Đây là bài luyện tập kiến thức, không phải đề thi thật.</p><Button onClick={start}>Bắt đầu / Tiếp tục<ArrowRight size={16} /></Button></div>;
  return <div className="quiz-layout">{storageError && <p role="status" className="notice mb-5">Trình duyệt không cho phép lưu tiến độ. Bạn vẫn có thể làm bài trong phiên này.</p>}
    {complete && <div className="quiz-summary" role="status"><strong>{score}/{questions.length}</strong><h2>Đã hoàn thành bài luyện tập</h2><p>{Math.round(score / questions.length * 100)}% chính xác · {wrong.length ? `Có ${wrong.length} câu cần ôn lại. Hãy đọc phần giải thích và tài liệu gốc.` : "Bạn đã trả lời đúng tất cả câu hỏi. Tiếp tục thực hành để củng cố kiến thức."}</p><div>{wrong.length > 0 && <Button variant="outline" onClick={() => { setReview(value => !value); setPosition(0); }}>{review ? "Xem tất cả câu" : "Ôn câu trả lời sai"}</Button>}<Button onClick={reset}><RotateCcw size={15} />Làm lại</Button></div></div>}
    <div className="quiz-status"><span><strong>{progress.submitted.length}/{questions.length}</strong> câu đã nộp</span><span><strong>{score}</strong> câu đúng</span>{review && <span>Đang ôn câu sai</span>}</div><div className="quiz-bar"><div style={{ width: `${progress.submitted.length / questions.length * 100}%` }} /></div>
    {question && <div className="quiz-card"><span className="section-kicker">CÂU {position + 1} / {visible.length} · {question.correct.length > 1 ? `CHỌN ${question.correct.length} ĐÁP ÁN` : "CHỌN MỘT ĐÁP ÁN"}</span><h2>{question.question}</h2><fieldset className="quiz-choices"><legend className="sr-only">Đáp án cho {question.question}</legend>{question.choices.map(choice => <label key={choice.id} className="quiz-choice" data-correct={submitted && question.correct.includes(choice.id)} data-wrong={submitted && selected.includes(choice.id) && !question.correct.includes(choice.id)}><input type={question.correct.length > 1 ? "checkbox" : "radio"} name={question.id} checked={selected.includes(choice.id)} disabled={submitted} onChange={() => choose(choice.id)} /><span><strong className="mr-2">{choice.id.toUpperCase()}.</strong>{choice.text}</span></label>)}</fieldset>
      {submitted && <div className="quiz-feedback" role="status"><h3 className="flex items-center gap-2">{isCorrect(question, selected) ? <><CheckCircle2 className="text-emerald-500" size={20} />Chính xác!</> : <><XCircle className="text-destructive" size={20} />Chưa chính xác</>}</h3><p>{question.explanation}</p><ul>{question.choices.map(choice => <li key={choice.id}><strong>{choice.id.toUpperCase()}.</strong> {choice.explanation}</li>)}</ul><p><a href={question.source} target="_blank" rel="noopener noreferrer">Đọc tài liệu chính thức ↗</a></p></div>}
      <div className="quiz-controls"><Button variant="outline" disabled={position === 0} onClick={() => setPosition(value => value - 1)}><ArrowLeft size={15} />Câu trước</Button>{!submitted && <Button disabled={!selected.length} onClick={() => updateProgress({ ...progress, submitted: [...progress.submitted, question.id] })}>Nộp đáp án</Button>}<Button variant="outline" disabled={position >= visible.length - 1} onClick={() => setPosition(value => value + 1)}>Câu tiếp<ArrowRight size={15} /></Button></div>
    </div>}
    <nav className="quiz-nav" aria-label="Điều hướng câu hỏi">{visible.map((q, i) => <button key={q.id} onClick={() => setPosition(i)} aria-label={`Đến câu ${i + 1}`} aria-current={i === position ? "step" : undefined} data-done={progress.submitted.includes(q.id)}>{i + 1}</button>)}</nav>
    <p className="notice">Câu hỏi phục vụ học tập, không phải exam dumps hay đề thi rò rỉ. Điểm số ở đây không dự đoán kết quả kỳ thi chính thức.</p>
  </div>;
}

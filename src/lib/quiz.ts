export type QuizQuestion = {
  id: string; certification: string; question: string;
  choices: { id: string; text: string; explanation: string }[];
  correct: string[]; explanation: string; source: string;
};
export type Progress = { version: 2; revision: string; ids: string[]; answers: Record<string, string[]>; submitted: string[] };
export function isCorrect(question: QuizQuestion, selected: string[]) {
  return selected.length === question.correct.length && new Set(selected).size === selected.length && selected.every(id => question.correct.includes(id));
}
export function restoreProgress(raw: string | null, questions: QuizQuestion[]): Progress | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Progress;
    if (value.version !== 2 || value.revision !== JSON.stringify(questions) || !Array.isArray(value.ids) || value.ids.join("|") !== questions.map(q => q.id).join("|") || !value.answers || typeof value.answers !== "object" || Array.isArray(value.answers) || !Array.isArray(value.submitted)) return null;
    for (const [id, selected] of Object.entries(value.answers)) {
      const question = questions.find(q => q.id === id);
      if (!question || !Array.isArray(selected) || selected.length !== new Set(selected).size || selected.some(choice => !question.choices.some(c => c.id === choice))) return null;
    }
    if (new Set(value.submitted).size !== value.submitted.length || value.submitted.some(id => !questions.some(q => q.id === id) || !value.answers[id]?.length)) return null;
    return { version: 2, revision: value.revision, ids: value.ids, answers: value.answers, submitted: value.submitted };
  } catch { return null; }
}

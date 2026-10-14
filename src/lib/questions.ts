import { readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { z } from "zod";
import type { QuizQuestion } from "./quiz";
import { getCollection } from "./content";
const questionSchema = z.object({
  id: z.string().min(1), certification: z.string().min(1), question: z.string().min(1),
  choices: z.array(z.object({ id: z.string().min(1), text: z.string().min(1), explanation: z.string().min(1) })).min(2),
  correct: z.array(z.string()).min(1), explanation: z.string().min(1), source: z.url().refine(value => value.startsWith("https://")),
}).superRefine((question, ctx) => {
  if (new Set(question.choices.map(choice => choice.id)).size !== question.choices.length || new Set(question.correct).size !== question.correct.length || question.correct.some(id => !question.choices.some(choice => choice.id === id))) ctx.addIssue({ code: "custom", message: "Answer IDs must be unique and reference available choices" });
});
export const getQuestions = cache((): QuizQuestion[] => {
  try {
    const questions = z.array(questionSchema).min(1).parse(JSON.parse(readFileSync(path.join(process.cwd(), "content/quiz/questions.json"), "utf8").replace(/^\uFEFF/, "")));
    if (new Set(questions.map(question => question.id)).size !== questions.length) throw new Error("Duplicate question IDs");
    const certifications = getCollection("certifications").map(item => item.slug);
    if (questions.some(question => !certifications.includes(question.certification))) throw new Error("Unknown certification in quiz");
    return questions;
  } catch (error) { throw new Error(`Content error in content/quiz/questions.json: ${error instanceof Error ? error.message : String(error)}`); }
});

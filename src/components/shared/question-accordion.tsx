"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
export function QuestionAccordion({ id, title, metadata, children }: { id: string; title: string; metadata: React.ReactNode; children: React.ReactNode }) {
  return <Accordion type="single" collapsible className="question-card" id={id}><AccordionItem value={id} className="border-0"><AccordionTrigger><span><span className="question-meta">{metadata}</span>{title}</span></AccordionTrigger><AccordionContent>{children}</AccordionContent></AccordionItem></Accordion>;
}

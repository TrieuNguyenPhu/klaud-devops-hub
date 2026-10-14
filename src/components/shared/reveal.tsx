"use client";
import { motion, useReducedMotion } from "motion/react";
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { y: [8, 0] }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.45 }}>{children}</motion.div>;
}

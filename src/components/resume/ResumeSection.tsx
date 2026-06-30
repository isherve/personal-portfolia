import { ReactNode } from "react";

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const ResumeSection = ({ title, children, className = "" }: ResumeSectionProps) => (
  <section className={`mb-5 ${className}`}>
    <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#0d9488] border-b border-[#0d9488]/30 pb-1 mb-3">
      {title}
    </h2>
    {children}
  </section>
);

export default ResumeSection;

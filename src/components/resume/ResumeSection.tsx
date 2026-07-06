import { ReactNode } from "react";

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const ResumeSection = ({ title, children, className = "" }: ResumeSectionProps) => (
  <section className={`mb-5 last:mb-0 ${className}`}>
    <h2 className="text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-[#0f172a] bg-[#f0fdfa] border-l-4 border-[#0d9488] px-2.5 py-1.5 mb-3">
      {title}
    </h2>
    {children}
  </section>
);

export default ResumeSection;

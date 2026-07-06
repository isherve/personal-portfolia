import { ReactNode } from "react";

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const ResumeSection = ({ title, children, className = "" }: ResumeSectionProps) => (
  <section className={`mb-5 last:mb-0 ${className}`}>
    <h2 className="text-[13px] font-black uppercase tracking-[0.1em] text-[#0f172a] bg-[#f0fdfa] border-l-4 border-[#0d9488] px-3 py-2 mb-3">
      {title}
    </h2>
    {children}
  </section>
);

export default ResumeSection;

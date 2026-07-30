import { ReactNode } from "react";

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const ResumeSection = ({ title, children, className = "" }: ResumeSectionProps) => (
  <section className={`mb-4 last:mb-0 ${className}`}>
    <h2 className="text-[11.5px] font-black uppercase tracking-[0.14em] text-[#0f172a] border-b-[2.5px] border-[#0d9488] pb-1.5 mb-3.5">
      {title}
    </h2>
    {children}
  </section>
);

export default ResumeSection;

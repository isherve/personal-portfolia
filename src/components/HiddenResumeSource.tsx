import ResumeDocument from "@/components/resume/ResumeDocument";

/** Off-screen resume used only for PDF generation — not displayed on the portfolio. */
const HiddenResumeSource = () => (
  <div
    id="resume-print-source"
    className="fixed top-0 -left-[10000px] w-[210mm] pointer-events-none"
    aria-hidden="true"
  >
    <ResumeDocument />
  </div>
);

export default HiddenResumeSource;

import { personal, social } from "@/data/portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import ResumeSection from "./ResumeSection";
import { boldBulletLead, emphasizeTerms } from "./resumeUtils";
import { Mail, Phone, MapPin, Github, Globe } from "lucide-react";

const ResumeDocument = () => {
  const { content } = useLanguage();
  const { resume: labels } = content.ui;
  const {
    personal: p,
    summary,
    resumeSkills: skills,
    experience,
    education,
    certifications,
    spokenLanguages,
    references,
  } = content;

  const featuredCerts = certifications.filter((c) => c.highlight);
  const otherCerts = certifications.filter((c) => !c.highlight);

  const emphasisTerms = [
    ...Object.values(skills).flat(),
    "Full-Stack Developer",
    "Full-Stack",
    "Développeur Full-Stack",
    "B.Sc.",
    "Information Technology",
    "Holder of B.Sc.",
    "Titulaire",
    "Ministry of Health",
    "Ministère de la Santé",
    "University of Rwanda",
    "Université du Rwanda",
    "AI",
    "Machine Learning",
    "React",
    "TypeScript",
    "Django",
    "Spring Boot",
    "Flutter",
  ];

  return (
    <article
      id="resume-document"
      className="resume-paper bg-white text-[#0f172a] rounded-lg shadow-2xl overflow-hidden print:shadow-none print:rounded-none"
    >
      <header className="bg-[#0f172a] text-white px-8 py-6 print:py-5 border-b-4 border-[#0d9488]">
        <h1 className="text-[36px] font-black tracking-tight leading-none mb-2">{personal.name}</h1>
        <p className="text-[#5eead4] font-black text-[16px] leading-snug mb-1.5">{p.title}</p>
        <p className="text-white text-[13.5px] font-bold leading-snug mb-5 max-w-2xl">{p.roleLine}</p>

        <div className="grid gap-3 sm:grid-cols-2 text-[13px]">
          <div className="space-y-2.5">
            <a href={`mailto:${personal.email}`} className="flex items-center gap-2 group">
              <Mail size={15} className="text-[#5eead4] shrink-0" />
              <span className="font-bold text-white">{personal.email}</span>
            </a>
            <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="flex items-center gap-2">
              <Phone size={15} className="text-[#5eead4] shrink-0" />
              <span className="font-bold text-white">{personal.phone}</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-[#5eead4] shrink-0" />
              <span className="font-bold text-white">{personal.location}</span>
            </span>
          </div>

          <div className="space-y-2.5 sm:pt-0">
            {social.github && (
              <a href={social.github} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                <Github size={15} className="text-[#5eead4] shrink-0" />
                <span className="font-bold text-white">github.com/isherve</span>
              </a>
            )}
            {social.portfolio && (
              <a href={social.portfolio} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                <Globe size={15} className="text-[#5eead4] shrink-0" />
                <span className="font-bold text-white">isherve.github.io/personal-portfolia</span>
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="px-8 py-5 print:px-6 print:py-4">
        <ResumeSection title={labels.professionalSummary}>
          <p className="text-[#1e293b] text-[14px] leading-[1.75] font-bold">
            {emphasizeTerms(summary, emphasisTerms)}
          </p>
        </ResumeSection>

        <div className="grid md:grid-cols-[1fr_248px] gap-6 print:gap-5">
          <div className="min-w-0 space-y-1">
            <ResumeSection title={labels.professionalExperience}>
              {experience.map((job) => (
                <div key={job.role} className="mb-3 last:mb-0 pb-3 last:pb-0 border-b border-[#e2e8f0] last:border-b-0">
                  <div className="flex flex-wrap justify-between items-start gap-x-3 gap-y-1 mb-1">
                    <h3 className="font-black text-[#0f172a] text-[15px] leading-snug">{job.role}</h3>
                    <span className="text-[11.5px] text-[#0f172a] font-black whitespace-nowrap">{job.period}</span>
                  </div>
                  <p className="text-[#0d9488] font-black text-[13px] mb-2.5">
                    {job.company} · {job.location}
                  </p>
                  <ul className="space-y-2">
                    {job.highlights.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[13px] leading-[1.7]">
                        <span className="text-[#0d9488] mt-[7px] shrink-0 w-[6px] h-[6px] rounded-full bg-[#0d9488]" />
                        <span className="font-semibold text-[#334155]">{boldBulletLead(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title={labels.education}>
              {education.map((edu) => (
                <div key={edu.degree} className="mb-4 last:mb-0 pb-3 last:pb-0 border-b border-[#e2e8f0] last:border-b-0">
                  <div className="flex flex-wrap justify-between items-start gap-x-3 gap-y-1">
                    <h3 className="font-black text-[#0f172a] text-[14px] leading-snug">{edu.degree}</h3>
                    <span className="text-[11.5px] text-[#0f172a] font-black whitespace-nowrap">{edu.period}</span>
                  </div>
                  <p className="text-[#0d9488] font-black text-[12.5px] mt-1 mb-1">
                    {edu.institution} · {edu.location}
                  </p>
                  <p className="text-[#334155] text-[12.5px] leading-[1.65] font-bold">{edu.detail}</p>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title={labels.certifications}>
              <div className="space-y-3">
                {featuredCerts.map((cert) => (
                  <div key={cert.name} className="pb-2 border-b border-[#f1f5f9] last:border-b-0 last:pb-0">
                    <div className="flex flex-wrap justify-between items-start gap-x-2 gap-y-0.5">
                      <h3 className="font-black text-[#0f172a] text-[13px] leading-snug">{cert.name}</h3>
                      <span className="text-[11px] text-[#0f172a] font-black">{cert.date}</span>
                    </div>
                    <p className="text-[#0d9488] text-[12px] font-bold mt-0.5">{cert.issuer}</p>
                  </div>
                ))}
              </div>
              {otherCerts.length > 0 && (
                <p className="text-[11.5px] text-[#475569] mt-3.5 leading-[1.6] font-semibold">
                  <span className="font-black text-[#0f172a]">{labels.also}:</span>{" "}
                  {otherCerts.map((c) => (
                    <span key={c.name}>
                      <strong className="font-black text-[#0f172a]">{c.name}</strong> ({c.date})
                      {c !== otherCerts[otherCerts.length - 1] ? " · " : ""}
                    </span>
                  ))}
                </p>
              )}
            </ResumeSection>
          </div>

          <aside className="space-y-1">
            <ResumeSection title={labels.technicalSkills}>
              <div className="space-y-3.5">
                {Object.entries(skills).map(([group, items]) => (
                  <div key={group}>
                    <p className="text-[10.5px] font-black uppercase tracking-[0.1em] text-[#0f172a] mb-2">
                      {labels.skillGroups[group as keyof typeof labels.skillGroups] ?? group}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-black bg-[#f8fafc] text-[#0f172a] border border-[#cbd5e1] px-2 py-0.5 rounded-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection title={labels.languages}>
              <ul className="space-y-2.5">
                {spokenLanguages.map((lang) => (
                  <li key={lang.name} className="border-b border-[#f1f5f9] pb-2 last:border-b-0 last:pb-0">
                    <p className="font-black text-[#0f172a] text-[12px]">{lang.name}</p>
                    <p className="text-[#475569] text-[11px] font-bold">{lang.level}</p>
                  </li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title={labels.references}>
              <ul className="space-y-3">
                {references.map((ref) => (
                  <li key={ref.name} className="border-b border-[#f1f5f9] pb-2.5 last:border-b-0 last:pb-0">
                    <p className="font-black text-[#0f172a] text-[12px] leading-tight">{ref.name}</p>
                    <p className="text-[#475569] text-[11px] leading-snug font-bold mt-0.5">{ref.title}</p>
                    <p className="text-[#0d9488] text-[11px] font-black mt-0.5">{ref.phone}</p>
                  </li>
                ))}
              </ul>
            </ResumeSection>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default ResumeDocument;

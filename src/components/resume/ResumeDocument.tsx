import { personal, social } from "@/data/portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import ResumeSection from "./ResumeSection";
import { boldBulletLead, emphasizeTerms } from "./resumeUtils";
import { Mail, Phone, MapPin, Github } from "lucide-react";

const ResumeDocument = () => {
  const { content, projects } = useLanguage();
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
  const resumeProjects = projects.filter((proj) => proj.status === "Featured" || proj.status === "Live");

  const emphasisTerms = [
    ...Object.values(skills).flat(),
    ...resumeProjects.flatMap((proj) => proj.technologies),
    "Full-Stack Developer",
    "Full-Stack",
    "Développeur Full-Stack",
    "B.Sc.",
    "graduate",
    "diplômé",
    "Ministry of Health",
    "Ministère de la Santé",
    "University of Rwanda",
    "Université du Rwanda",
    "AI",
    "Machine Learning",
  ];

  return (
    <article
      id="resume-document"
      className="resume-paper bg-white text-[#1a1a2e] rounded-lg shadow-2xl overflow-hidden text-base leading-relaxed print:shadow-none print:rounded-none"
    >
      <header className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-8 py-7 print:py-5">
        <h1 className="text-[34px] font-black tracking-tight mb-1">{personal.name}</h1>
        <p className="text-[#5eead4] font-extrabold text-[17px] mb-1">{p.title}</p>
        <p className="text-slate-200 text-[14px] font-bold mb-4">{p.roleLine}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-slate-100 font-semibold">
          <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5">
            <Mail size={14} className="text-[#5eead4] shrink-0" />
            <span className="font-bold">{personal.email}</span>
          </a>
          <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5">
            <Phone size={14} className="text-[#5eead4] shrink-0" />
            <span className="font-bold">{personal.phone}</span>
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-[#5eead4] shrink-0" />
            <span className="font-bold">{personal.location}</span>
          </span>
          {social.github && (
            <a href={social.github} className="flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
              <Github size={14} className="text-[#5eead4] shrink-0" />
              <span className="font-bold">github.com/isherve</span>
            </a>
          )}
        </div>
      </header>

      <div className="px-8 py-6 print:px-6 print:py-4">
        <ResumeSection title={labels.professionalSummary}>
          <p className="text-[#334155] text-[14.5px] leading-[1.85] font-semibold">
            {emphasizeTerms(summary, emphasisTerms)}
          </p>
        </ResumeSection>

        <div className="grid md:grid-cols-[1fr_230px] gap-7 print:gap-5">
          <div className="min-w-0">
            <ResumeSection title={labels.professionalExperience}>
              {experience.map((job) => (
                <div key={job.role} className="mb-4 last:mb-0">
                  <div className="flex flex-wrap justify-between items-baseline gap-x-3 gap-y-0.5 mb-0.5">
                    <h3 className="font-black text-[#0f172a] text-[15.5px]">{job.role}</h3>
                    <span className="text-[12px] text-[#64748b] font-extrabold whitespace-nowrap bg-[#f8fafc] px-2 py-0.5 rounded">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-[#0d9488] font-extrabold text-[13.5px] mb-2">
                    {job.company} · {job.location}
                  </p>
                  <ul className="space-y-2">
                    {job.highlights.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[#475569] text-[13.5px] leading-[1.8] font-medium">
                        <span className="text-[#0d9488] mt-[8px] shrink-0 w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
                        <span>{boldBulletLead(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title={labels.selectedProjects}>
              {resumeProjects.map((project) => (
                <div
                  key={project.repo}
                  className="mb-4 last:mb-0 pb-3.5 last:pb-0 border-b border-[#e2e8f0] last:border-b-0"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-black text-[#0f172a] text-[14.5px]">{project.title}</h3>
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wide text-[#0d9488] bg-[#f0fdfa] border border-[#99f6e4] px-1.5 py-0.5 rounded">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-[#0f172a] text-[13.5px] leading-[1.7] font-extrabold mb-1">{project.impact}</p>
                  <p className="text-[#475569] text-[13px] leading-[1.75] font-medium mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10.5px] font-extrabold bg-[#f8fafc] text-[#0f172a] border border-[#cbd5e1] px-1.5 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title={labels.education}>
              {education.map((edu) => (
                <div key={edu.degree} className="mb-3.5 last:mb-0">
                  <div className="flex flex-wrap justify-between items-baseline gap-x-3 gap-y-0.5">
                    <h3 className="font-black text-[#0f172a] text-[14px]">{edu.degree}</h3>
                    <span className="text-[12px] text-[#64748b] font-extrabold whitespace-nowrap">{edu.period}</span>
                  </div>
                  <p className="text-[#0d9488] font-extrabold text-[13px] mt-0.5 mb-1">
                    {edu.institution} · {edu.location}
                  </p>
                  <p className="text-[#475569] text-[13px] leading-[1.75] font-medium">{edu.detail}</p>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title={labels.certifications}>
              <div className="space-y-3">
                {featuredCerts.map((cert) => (
                  <div key={cert.name} className="border-l-2 border-[#99f6e4] pl-2.5">
                    <div className="flex flex-wrap justify-between items-baseline gap-x-2">
                      <h3 className="font-black text-[#0f172a] text-[13px]">{cert.name}</h3>
                      <span className="text-[11.5px] text-[#64748b] font-extrabold">{cert.date}</span>
                    </div>
                    <p className="text-[#0d9488] text-[12px] font-bold">{cert.issuer}</p>
                  </div>
                ))}
              </div>
              {otherCerts.length > 0 && (
                <p className="text-[12px] text-[#64748b] mt-3 leading-[1.65] font-medium">
                  <span className="font-extrabold text-[#0f172a]">{labels.also}:</span>{" "}
                  {otherCerts.map((c) => (
                    <span key={c.name}>
                      <strong className="font-extrabold text-[#0f172a]">{c.name}</strong> ({c.date})
                      {c !== otherCerts[otherCerts.length - 1] ? " · " : ""}
                    </span>
                  ))}
                </p>
              )}
            </ResumeSection>
          </div>

          <aside className="space-y-4 print:space-y-3">
            <ResumeSection title={labels.technicalSkills}>
              <div className="space-y-3">
                {Object.entries(skills).map(([group, items]) => (
                  <div key={group}>
                    <p className="text-[11px] font-black uppercase tracking-wider text-[#0f172a] mb-1.5">
                      {labels.skillGroups[group as keyof typeof labels.skillGroups] ?? group}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10.5px] font-extrabold bg-[#f0fdfa] text-[#0f766e] border border-[#99f6e4] px-1.5 py-0.5 rounded"
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
              <ul className="space-y-2">
                {spokenLanguages.map((lang) => (
                  <li key={lang.name}>
                    <p className="font-black text-[#0f172a] text-[12.5px]">{lang.name}</p>
                    <p className="text-[#64748b] text-[11.5px] font-semibold">{lang.level}</p>
                  </li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title={labels.references}>
              <ul className="space-y-2.5">
                {references.map((ref) => (
                  <li key={ref.name}>
                    <p className="font-black text-[#0f172a] text-[12px] leading-tight">{ref.name}</p>
                    <p className="text-[#64748b] text-[11.5px] leading-snug font-semibold">{ref.title}</p>
                    <p className="text-[#0d9488] text-[11.5px] font-extrabold">{ref.phone}</p>
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

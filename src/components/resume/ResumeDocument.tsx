import { personal, social } from "@/data/portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import ResumeSection from "./ResumeSection";
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

  return (
    <article
      id="resume-document"
      className="resume-paper bg-white text-[#1a1a2e] rounded-lg shadow-2xl overflow-hidden text-sm leading-relaxed print:shadow-none print:rounded-none"
    >
      <header className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-8 py-7 print:py-5">
        <h1 className="text-[28px] font-bold tracking-tight mb-1">{personal.name}</h1>
        <p className="text-[#5eead4] font-medium text-[15px] mb-4">{p.title}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-slate-300">
          <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5">
            <Mail size={13} className="text-[#5eead4]" />
            {personal.email}
          </a>
          <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5">
            <Phone size={13} className="text-[#5eead4]" />
            {personal.phone}
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-[#5eead4]" />
            {personal.location}
          </span>
          {social.github && (
            <a href={social.github} className="flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
              <Github size={13} className="text-[#5eead4]" />
              github.com/isherve
            </a>
          )}
        </div>
      </header>

      <div className="px-8 py-6 print:px-6 print:py-4">
        <ResumeSection title={labels.professionalSummary}>
          <p className="text-[#334155] text-[13px] leading-[1.75]">{summary}</p>
        </ResumeSection>

        <div className="grid md:grid-cols-[1fr_200px] gap-7 print:gap-5">
          <div className="min-w-0">
            <ResumeSection title={labels.professionalExperience}>
              {experience.map((job) => (
                <div key={job.role} className="mb-4 last:mb-0">
                  <div className="flex flex-wrap justify-between items-baseline gap-x-3 gap-y-0.5 mb-0.5">
                    <h3 className="font-bold text-[#0f172a] text-[13.5px]">{job.role}</h3>
                    <span className="text-[11px] text-[#64748b] font-semibold whitespace-nowrap">{job.period}</span>
                  </div>
                  <p className="text-[#0d9488] font-semibold text-[12.5px] mb-2">
                    {job.company} · {job.location}
                  </p>
                  <ul className="space-y-1.5">
                    {job.highlights.map((item) => (
                      <li key={item} className="flex gap-2 text-[#475569] text-[12px] leading-[1.7]">
                        <span className="text-[#0d9488] mt-[6px] shrink-0 w-1 h-1 rounded-full bg-[#0d9488]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title={labels.selectedProjects}>
              {projects.map((project) => (
                <div key={project.repo} className="mb-3.5 last:mb-0">
                  <h3 className="font-bold text-[#0f172a] text-[13px]">{project.title}</h3>
                  <p className="text-[#475569] text-[12px] leading-[1.65] mt-1">{project.description}</p>
                  <p className="text-[11px] text-[#0d9488] mt-1 font-medium">
                    {project.technologies.join(" · ")}
                  </p>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title={labels.education}>
              {education.map((edu) => (
                <div key={edu.degree} className="mb-3.5 last:mb-0">
                  <div className="flex flex-wrap justify-between items-baseline gap-x-3 gap-y-0.5">
                    <h3 className="font-bold text-[#0f172a] text-[13px]">{edu.degree}</h3>
                    <span className="text-[11px] text-[#64748b] font-semibold whitespace-nowrap">{edu.period}</span>
                  </div>
                  <p className="text-[#0d9488] font-semibold text-[12px] mt-0.5 mb-1">
                    {edu.institution} · {edu.location}
                  </p>
                  <p className="text-[#475569] text-[12px] leading-[1.65]">{edu.detail}</p>
                </div>
              ))}
            </ResumeSection>

            <ResumeSection title={labels.certifications}>
              <div className="space-y-2.5">
                {featuredCerts.map((cert) => (
                  <div key={cert.name}>
                    <div className="flex flex-wrap justify-between items-baseline gap-x-2">
                      <h3 className="font-semibold text-[#0f172a] text-[12.5px]">{cert.name}</h3>
                      <span className="text-[11px] text-[#64748b]">{cert.date}</span>
                    </div>
                    <p className="text-[#0d9488] text-[11.5px]">{cert.issuer}</p>
                  </div>
                ))}
              </div>
              {otherCerts.length > 0 && (
                <p className="text-[11px] text-[#64748b] mt-2.5">
                  {labels.also}: {otherCerts.map((c) => `${c.name} (${c.date})`).join(" · ")}
                </p>
              )}
            </ResumeSection>
          </div>

          <aside className="space-y-4 print:space-y-3">
            <ResumeSection title={labels.technicalSkills}>
              <div className="space-y-2.5">
                {Object.entries(skills).map(([group, items]) => (
                  <div key={group}>
                    <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#64748b] mb-1">
                      {labels.skillGroups[group as keyof typeof labels.skillGroups] ?? group}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] bg-[#f0fdfa] text-[#0f766e] border border-[#99f6e4] px-1.5 py-0.5 rounded"
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
              <ul className="space-y-1.5">
                {spokenLanguages.map((lang) => (
                  <li key={lang.name}>
                    <p className="font-semibold text-[#0f172a] text-[11.5px]">{lang.name}</p>
                    <p className="text-[#64748b] text-[10.5px]">{lang.level}</p>
                  </li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title={labels.references}>
              <ul className="space-y-2.5">
                {references.map((ref) => (
                  <li key={ref.name}>
                    <p className="font-semibold text-[#0f172a] text-[11px] leading-tight">{ref.name}</p>
                    <p className="text-[#64748b] text-[10.5px] leading-snug">{ref.title}</p>
                    <p className="text-[#0d9488] text-[10.5px]">{ref.phone}</p>
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

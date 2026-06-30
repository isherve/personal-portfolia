
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

const Skills = () => {
  const { content } = useLanguage();
  const { skills: ui } = content.ui;

  return (
    <section id="skills" className="py-16">
      <div className="section-container">
        <h2 className="heading">{ui.title}</h2>
        <p className="subheading">{ui.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6">{ui.coreCompetencies}</h3>
            <div className="space-y-6">
              {content.coreCompetencies.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span>{skill.name}</span>
                    <span className="text-secondary text-sm">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">{ui.professionalExperience}</h3>
            <div className="space-y-8">
              {content.experience.map((job) => (
                <div key={job.role}>
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                    <h4 className="font-semibold">{job.role}</h4>
                    <span className="text-sm text-secondary">{job.period}</span>
                  </div>
                  <p className="text-primary font-medium mb-2">
                    {job.company}, {job.location}
                  </p>
                  <ul className="space-y-2">
                    {job.highlights.slice(0, 3).map((item) => (
                      <li key={item} className="text-secondary text-sm flex gap-2">
                        <span className="text-primary shrink-0">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold mb-6 mt-12">{ui.education}</h3>
            <div className="space-y-8">
              {content.education.map((item) => (
                <div key={item.degree}>
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                    <h4 className="font-semibold">{item.degree}</h4>
                    <span className="text-sm text-secondary">{item.period}</span>
                  </div>
                  <p className="text-primary font-medium mb-2">
                    {item.institution}, {item.location}
                  </p>
                  <p className="text-secondary text-sm">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-bold mb-6">{ui.technologyStack}</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {Object.entries(content.skillGroups).map(([group, items]) => (
              <div key={group} className="bg-card/50 border border-border rounded-lg p-5">
                <p className="text-primary font-semibold text-sm mb-3">{group}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="bg-background text-foreground border-border"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-bold mb-6">{ui.languages}</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {content.spokenLanguages.map((lang) => (
              <div key={lang.name}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-sm text-secondary">{lang.level}</span>
                </div>
                <Progress value={lang.percent} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;


import { personal } from "@/data/portfolio";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import ProfileAvatar from "@/components/ProfileAvatar";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap = {
  education: GraduationCap,
  experience: Briefcase,
  location: MapPin,
} as const;

const About = () => {
  const { content } = useLanguage();
  const { about, highlightLabels } = content.ui;
  const { aboutContent } = content;

  return (
    <section id="about" className="bg-card/30">
      <div className="section-container">
        <h2 className="heading">{about.title}</h2>
        <p className="subheading">{about.subtitle}</p>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
          <div className="w-full lg:w-auto flex justify-center lg:sticky lg:top-28 shrink-0">
            <ProfileAvatar size="lg" />
          </div>

          <div className="w-full lg:flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold mb-5 tracking-tight">{aboutContent.headline}</h3>

            {aboutContent.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-secondary text-[15px] sm:text-base mb-5 leading-[1.75]">
                {paragraph}
              </p>
            ))}

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {aboutContent.highlights.map(({ key, value, detail }) => {
                const Icon = iconMap[key];
                return (
                  <div key={key} className="bg-card border border-border rounded-lg p-4 card-hover">
                    <Icon className="text-primary mb-2" size={20} />
                    <p className="text-xs text-secondary uppercase tracking-wide mb-1">
                      {highlightLabels[key]}
                    </p>
                    <p className="font-semibold text-sm mb-1">{value}</p>
                    <p className="text-secondary text-xs">{detail}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                {personal.email}
              </a>
              <span className="text-border">·</span>
              <a
                href={`tel:${personal.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center text-sm text-primary hover:underline"
              >
                {personal.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

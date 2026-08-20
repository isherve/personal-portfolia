import { Layers, Shield, Zap, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const principleIcons = [Layers, Shield, Zap, Users];

const PrinciplesSection = () => {
  const { content } = useLanguage();
  const { principles: ui } = content.ui;

  return (
    <section id="principles" className="py-16 md:py-20 bg-muted/30 dark:bg-muted/10">
      <div className="section-container !py-0">
        <h2 className="heading">{ui.title}</h2>
        <p className="subheading">{ui.subtitle}</p>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {ui.items.map((item, index) => {
            const Icon = principleIcons[index] ?? Layers;
            return (
              <article
                key={item.title}
                className="rounded-xl border border-border/70 bg-card/80 p-5 md:p-6 card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base md:text-lg mb-2">{item.title}</h3>
                    <p className="text-secondary text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;

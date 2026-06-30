import { Code2, Database, Network, Cloud, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const featureIcons: LucideIcon[] = [Code2, Database, Network, Cloud];

const HeroFeatureBar = () => {
  const { content } = useLanguage();
  const { features } = content.ui.hero;

  return (
    <div className="mt-10 md:mt-14 lg:mt-16 pt-8 md:pt-10 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {features.map((feature, index) => {
        const Icon = featureIcons[index] ?? Code2;
        return (
          <div
            key={feature.title}
            className="flex items-center gap-3.5 rounded-xl border border-border/60 bg-white/80 shadow-sm dark:bg-card/30 dark:shadow-none px-4 py-3.5 sm:px-5 sm:py-4"
          >
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/8 text-primary">
              <Icon size={20} strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm leading-snug">{feature.title}</p>
              <p className="text-secondary text-xs sm:text-[13px] mt-0.5 leading-snug">{feature.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroFeatureBar;

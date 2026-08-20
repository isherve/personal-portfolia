import { Briefcase, Award, GraduationCap, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountUp, useInView } from "@/hooks/useActiveSection";

const statIcons = [Rocket, Briefcase, GraduationCap, Award];

const StatsBar = () => {
  const { content, projects } = useLanguage();
  const { stats: ui } = content.ui;
  const { setRef, inView } = useInView(0.25);

  const featuredCount = projects.filter((p) => p.status === "Featured" || p.status === "Live").length;
  const targets = [projects.length, featuredCount, content.certifications.length, 1];

  const count0 = useCountUp(targets[0], inView, 1200);
  const count1 = useCountUp(targets[1], inView, 1300);
  const count2 = useCountUp(targets[2], inView, 1400);
  const count3 = useCountUp(targets[3], inView, 1500);
  const counts = [count0, count1, count2, count3];

  return (
    <section ref={setRef} className="border-y border-border/60 bg-card/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 md:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {ui.items.map((item, index) => {
            const Icon = statIcons[index] ?? Rocket;
            return (
              <div
                key={item.label}
                className="rounded-xl border border-border/70 bg-background/80 dark:bg-card/50 px-4 py-5 md:px-5 md:py-6 text-center card-hover"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <p className="text-2xl md:text-3xl font-black text-foreground tabular-nums">
                  {counts[index]}
                  {item.suffix}
                </p>
                <p className="mt-1 text-xs md:text-sm font-bold text-foreground/90">{item.label}</p>
                <p className="mt-0.5 text-[11px] md:text-xs text-secondary leading-snug">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;

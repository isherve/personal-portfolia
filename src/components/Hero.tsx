import { Button } from "@/components/ui/button";
import { ArrowRight, User } from "lucide-react";
import HeroPortrait from "@/components/HeroPortrait";
import HeroFeatureBar from "@/components/HeroFeatureBar";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { content } = useLanguage();
  const { hero } = content.ui;

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-12 md:pb-16 lg:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/6 via-background to-background dark:from-primary/8 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container !py-12 md:!py-16 lg:!py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="max-w-xl lg:max-w-2xl animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-foreground/85 mb-5 sm:mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden />
              {hero.badge}
            </span>

            <h1 className="text-[1.75rem] sm:text-4xl md:text-[2.75rem] lg:text-[3.1rem] xl:text-[3.5rem] 2xl:text-[3.65rem] font-bold leading-[1.12] mb-4 sm:mb-5">
              <span className="text-foreground">{hero.headlinePart1}</span>
              <span className="text-primary">{hero.headlineHighlight}</span>
            </h1>

            <p className="text-sm sm:text-base font-medium text-foreground/75 mb-3 sm:mb-4 tracking-wide">
              {hero.roleKeywords}
            </p>

            <p className="text-secondary text-[15px] sm:text-base md:text-[17px] mb-8 sm:mb-10 max-w-lg leading-[1.7]">
              {hero.intro}
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Button
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/85 text-sm sm:text-base font-medium"
              >
                {hero.viewWork}
                <ArrowRight size={17} className="ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-11 px-6 border-primary/50 text-foreground hover:bg-primary/10 text-sm sm:text-base font-medium"
                onClick={() => scrollToSection("contact")}
              >
                <User size={17} className="mr-2" />
                {hero.contactMe}
              </Button>
            </div>
          </div>

          <div className="animate-fade-in order-first lg:order-none">
            <HeroPortrait />
          </div>
        </div>

        <HeroFeatureBar />
      </div>
    </section>
  );
};

export default Hero;


import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative">
      <div className="section-container">
        <div className="max-w-3xl">
          <p className="text-primary font-medium mb-5">Hi, my name is</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            ISHIMWE Hervin
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-6">
            I build amazing web experiences.
          </h2>
          <p className="text-secondary text-lg mb-8 max-w-2xl">
            I'm a web developer specialized in building exceptional digital experiences.
            Currently, I'm focused on creating accessible, human-centered products.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={scrollToProjects} className="bg-primary text-primary-foreground hover:bg-primary/80">
              View My Work
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Download Resume
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-primary" size={32} />
      </div>
    </section>
  );
};

export default Hero;

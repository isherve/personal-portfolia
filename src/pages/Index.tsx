import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import About from "@/components/About";
import PrinciplesSection from "@/components/PrinciplesSection";
import HiddenResumeSource from "@/components/HiddenResumeSource";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Projects from "@/components/Projects";
import FaqSection from "@/components/FaqSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorAshField from "@/components/CursorAshField";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <CursorAshField />
      <Header />
      <main className="relative z-10">
        <Hero />
        <StatsBar />
        <About />
        <PrinciplesSection />
        <Skills />
        <Certificates />
        <Projects />
        <FaqSection />
        <Contact />
      </main>
      <HiddenResumeSource />
      <Footer />
    </div>
  );
};

export default Index;

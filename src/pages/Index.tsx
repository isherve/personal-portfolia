
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HiddenResumeSource from "@/components/HiddenResumeSource";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Certificates />
        <Projects />
        <Contact />
      </main>
      <HiddenResumeSource />
      <Footer />
    </div>
  );
};

export default Index;

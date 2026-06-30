
import { useState, useEffect } from "react";
import { Menu, X, Github } from "lucide-react";
import { social } from "@/data/portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import CvDownloadButton from "@/components/CvDownloadButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { content } = useLanguage();
  const { nav, hero } = content.ui;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "home", label: nav.home },
    { id: "about", label: nav.about },
    { id: "skills", label: nav.skills },
    { id: "certificates", label: nav.certificates },
    { id: "projects", label: nav.projects },
    { id: "contact", label: nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-md py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex justify-between items-center gap-4">
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity shrink-0"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-base">
            H
          </span>
          <span className="hidden sm:inline text-base font-semibold text-foreground tracking-tight">
            Hervin <span className="text-primary">ISHIMWE</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navItems.map(({ id, label }) => (
            <button key={id} onClick={() => scrollToSection(id)} className="nav-link">
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 shrink-0">
          <CvDownloadButton
            variant="outline"
            size="sm"
            label={hero.downloadCv}
            className="hidden md:inline-flex h-9 border-primary/60 text-foreground hover:bg-primary/10 text-xs font-medium"
          />
          <CvDownloadButton
            variant="ghost"
            size="sm"
            showIcon
            label=""
            className="md:hidden h-9 w-9 px-0 text-secondary hover:text-primary"
            aria-label={hero.downloadCv}
            title={hero.downloadCv}
          />
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex ml-1 text-secondary hover:text-primary transition-colors p-2"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <button
            className="lg:hidden text-foreground hover:text-primary transition-colors p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-md border-b border-border shadow-lg animate-fade-in">
          <div className="flex items-center justify-between px-4 pt-3">
            <CvDownloadButton
              variant="outline"
              size="sm"
              label={hero.downloadCv}
              className="border-primary text-primary hover:bg-primary/10"
            />
            <div className="flex items-center gap-1">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
          <nav className="flex flex-col p-4 pt-2 space-y-3">
            {navItems.map(({ id, label }) => (
              <button key={id} onClick={() => scrollToSection(id)} className="nav-link text-left">
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

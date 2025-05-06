
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-md py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-primary">Portfolio</a>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          <button onClick={() => scrollToSection("home")} className="nav-link">Home</button>
          <button onClick={() => scrollToSection("about")} className="nav-link">About</button>
          <button onClick={() => scrollToSection("skills")} className="nav-link">Skills</button>
          <button onClick={() => scrollToSection("projects")} className="nav-link">Projects</button>
          <button onClick={() => scrollToSection("contact")} className="nav-link">Contact</button>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md absolute top-full left-0 w-full shadow-lg animate-fade-in">
          <nav className="flex flex-col p-4 space-y-3">
            <button onClick={() => scrollToSection("home")} className="nav-link text-left">Home</button>
            <button onClick={() => scrollToSection("about")} className="nav-link text-left">About</button>
            <button onClick={() => scrollToSection("skills")} className="nav-link text-left">Skills</button>
            <button onClick={() => scrollToSection("projects")} className="nav-link text-left">Projects</button>
            <button onClick={() => scrollToSection("contact")} className="nav-link text-left">Contact</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

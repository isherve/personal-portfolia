
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card py-10">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-primary mb-2">My Portfolio</h3>
            <p className="text-secondary text-sm">Building beautiful web experiences</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-secondary hover:text-primary transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="#" className="text-secondary hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-secondary hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-secondary hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary text-sm mb-4 md:mb-0">
            &copy; {currentYear} hervin. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-secondary hover:text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-secondary hover:text-primary text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

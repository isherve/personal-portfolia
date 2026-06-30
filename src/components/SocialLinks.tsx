import { Github, Linkedin } from "lucide-react";
import { social } from "@/data/portfolio";

interface SocialLinksProps {
  size?: number;
  className?: string;
}

const SocialLinks = ({ size = 20, className = "" }: SocialLinksProps) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <a
      href={social.github}
      target="_blank"
      rel="noopener noreferrer"
      className="text-secondary hover:text-primary transition-colors"
      aria-label="GitHub profile"
      title="GitHub"
    >
      <Github size={size} />
    </a>
    {social.linkedin && (
      <a
        href={social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary hover:text-primary transition-colors"
        aria-label="LinkedIn profile"
        title="LinkedIn"
      >
        <Linkedin size={size} />
      </a>
    )}
  </div>
);

export default SocialLinks;

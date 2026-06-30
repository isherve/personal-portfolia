import { personal } from "@/data/portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import SocialLinks from "@/components/SocialLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content } = useLanguage();
  const { footer } = content.ui;

  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-secondary">
          <p className="text-center sm:text-left">
            &copy; {currentYear} {personal.name}. {footer.rights}
          </p>
          <SocialLinks size={18} className="gap-3" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Button } from "@/components/ui/button";
import { useLanguage, type Locale } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { locale, setLocale, content } = useLanguage();

  const toggle = () => setLocale(locale === "en" ? "fr" : "en");

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-9 px-2.5 text-xs font-semibold tracking-wide text-foreground hover:text-primary"
      onClick={toggle}
      aria-label={content.ui.language.switch}
      title={content.ui.language.switch}
    >
      <span className={locale === "en" ? "text-primary" : "text-secondary"}>EN</span>
      <span className="mx-1 text-border">|</span>
      <span className={locale === "fr" ? "text-primary" : "text-secondary"}>FR</span>
    </Button>
  );
};

export default LanguageToggle;

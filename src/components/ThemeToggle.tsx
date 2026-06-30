import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { content } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9" aria-hidden>
        <Sun size={18} />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 text-foreground hover:text-primary"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? content.ui.theme.switchToLight : content.ui.theme.switchToDark}
      title={isDark ? content.ui.theme.light : content.ui.theme.dark}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

export default ThemeToggle;

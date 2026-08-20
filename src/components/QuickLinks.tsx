import { ArrowUpRight, Download, Github, Globe, MessageCircle } from "lucide-react";
import { social, personal } from "@/data/portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import { downloadCv } from "@/lib/downloadCv";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const whatsappNumber = personal.phone.replace(/\D/g, "");

const QuickLinks = () => {
  const { content } = useLanguage();
  const { quickLinks: ui, cv, hero } = content.ui;
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCv = async () => {
    setLoading(true);
    try {
      await downloadCv();
    } catch {
      toast({ title: cv.downloadError, description: cv.downloadErrorDesc, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const links = [
    { label: ui.github, href: social.github, icon: Github },
    { label: ui.portfolio, href: social.portfolio, icon: Globe },
    { label: ui.whatsapp, href: `https://wa.me/${whatsappNumber}`, icon: MessageCircle },
  ];

  return (
    <div className="rounded-xl border border-border/70 bg-background/50 p-5 md:p-6 h-fit">
      <h3 className="font-bold text-lg mb-4">{ui.title}</h3>
      <ul className="space-y-1">
        <li>
          <button
            type="button"
            onClick={() => void handleCv()}
            disabled={loading}
            className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-60"
          >
            <span className="flex items-center gap-2">
              {loading ? <Loader2 size={16} className="animate-spin text-primary" /> : <Download size={16} className="text-primary shrink-0" />}
              {loading ? hero.preparingPdf : ui.downloadCv}
            </span>
            <ArrowUpRight size={14} className="text-secondary shrink-0" />
          </button>
        </li>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Icon size={16} className="text-primary shrink-0" />
                  {link.label}
                </span>
                <ArrowUpRight size={14} className="text-secondary shrink-0" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuickLinks;

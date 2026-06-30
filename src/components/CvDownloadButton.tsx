import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { downloadCv } from "@/lib/downloadCv";
import { Download, Loader2 } from "lucide-react";
import { ComponentProps } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CvDownloadButtonProps extends Omit<ComponentProps<typeof Button>, "onClick"> {
  showIcon?: boolean;
  label?: string;
  loadingLabel?: string;
}

const CvDownloadButton = ({
  showIcon = true,
  label,
  loadingLabel,
  className,
  variant = "outline",
  size,
  disabled,
  ...props
}: CvDownloadButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { content } = useLanguage();
  const { hero, cv } = content.ui;

  const buttonLabel = label ?? hero.downloadCv;
  const buttonLoadingLabel = loadingLabel ?? hero.preparingPdf;
  const isIconOnly = buttonLabel === "";

  const handleDownload = async () => {
    setLoading(true);
    try {
      await downloadCv();
    } catch {
      toast({
        title: cv.downloadError,
        description: cv.downloadErrorDesc,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleDownload}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 size={18} className={isIconOnly ? "animate-spin" : "mr-2 animate-spin"} />
      ) : (
        showIcon && <Download size={18} className={isIconOnly ? undefined : "mr-2"} />
      )}
      {!isIconOnly && (loading ? buttonLoadingLabel : buttonLabel)}
    </Button>
  );
};

export default CvDownloadButton;

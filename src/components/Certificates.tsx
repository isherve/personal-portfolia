
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Certificates = () => {
  const { content } = useLanguage();
  const { certificates: ui } = content.ui;

  return (
    <section id="certificates" className="bg-card/30 py-16">
      <div className="section-container">
        <h2 className="heading">{ui.title}</h2>
        <p className="subheading">{ui.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-6">
          {content.certifications.map((cert) => (
            <Card key={cert.name} className="bg-card border-border card-hover">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3 gap-3">
                  <h3 className="font-bold text-lg leading-snug">{cert.name}</h3>
                  <Badge variant="outline" className="shrink-0">
                    {cert.date}
                  </Badge>
                </div>
                <p className="text-primary font-medium mb-3">{cert.issuer}</p>
                <p className="text-secondary text-sm leading-relaxed">{cert.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;

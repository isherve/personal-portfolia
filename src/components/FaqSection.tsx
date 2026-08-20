import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const FaqSection = () => {
  const { content } = useLanguage();
  const { faq: ui } = content.ui;

  return (
    <section id="faq" className="py-16 md:py-20">
      <div className="section-container !py-0">
        <h2 className="heading">{ui.title}</h2>
        <p className="subheading">{ui.subtitle}</p>

        <Accordion type="single" collapsible className="max-w-3xl rounded-xl border border-border/70 bg-card/50 px-4 md:px-6">
          {ui.items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-secondary leading-relaxed pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;

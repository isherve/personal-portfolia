import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, User } from "lucide-react";
import { personal } from "@/data/portfolio";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { content } = useLanguage();
  const { contact: ui } = content.ui;
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personal.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `[Portfolio] ${formData.subject}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Failed");

      toast({ title: ui.successTitle, description: ui.successDesc });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast({
        title: ui.errorTitle,
        description: ui.errorDesc.replace("{email}", personal.email),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="section-container">
        <h2 className="heading">{ui.title}</h2>
        <p className="subheading">{ui.subtitle}</p>

        <div className="grid md:grid-cols-3 gap-10">
          <Card className="bg-card border-border">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Mail className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">{ui.email}</h3>
              <p className="text-secondary mb-2">{ui.emailHint}</p>
              <a href={`mailto:${personal.email}`} className="text-primary hover:underline">
                {personal.email}
              </a>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Phone className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">{ui.phone}</h3>
              <p className="text-secondary mb-2">{ui.phoneHint}</p>
              <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
                {personal.phone}
              </a>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <MapPin className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">{ui.location}</h3>
              <p className="text-secondary mb-2">{ui.locationHint}</p>
              <span className="text-primary">{personal.location}</span>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-bold mb-6">{ui.references}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {content.references.map((ref) => (
              <Card key={ref.name} className="bg-card border-border">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="bg-primary/10 p-3 rounded-full shrink-0">
                    <User className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{ref.name}</h4>
                    <p className="text-secondary text-sm mb-2">{ref.title}</p>
                    <a href={`tel:${ref.phone.replace(/\s/g, "")}`} className="text-primary text-sm hover:underline">
                      {ref.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mt-16 bg-card border-border">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    {ui.formName}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={ui.placeholders.name}
                    required
                    className="bg-background border-border focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    {ui.formEmail}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={ui.placeholders.email}
                    required
                    className="bg-background border-border focus-visible:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  {ui.formSubject}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={ui.placeholders.subject}
                  required
                  className="bg-background border-border focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  {ui.formMessage}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={ui.placeholders.message}
                  required
                  className="min-h-[150px] bg-background border-border focus-visible:ring-primary"
                />
              </div>
              <Button
                type="submit"
                className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/80"
                disabled={isSubmitting}
              >
                {isSubmitting ? ui.sending : ui.send}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;


import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16">
      <div className="section-container">
        <h2 className="heading">Get In Touch</h2>
        <p className="subheading">
          Have a project in mind or just want to chat? Feel free to reach out.
          I'd love to hear from you!
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          <Card className="bg-card border-border">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Mail className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-secondary mb-2">For general inquiries</p>
              <a href="mailto:hello@example.com" className="text-primary hover:underline">
                hello@example.com
              </a>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Phone className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Phone</h3>
              <p className="text-secondary mb-2">Mon-Fri from 9am to 5pm</p>
              <a href="tel:+11234567890" className="text-primary hover:underline">
                +250781011343
              </a>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <MapPin className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p className="text-secondary mb-2">Available for remote work</p>
              <span className="text-primary">Kigali, RWANDA</span>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-16 bg-card border-border">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Your Name
                  </label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-background border-border focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Your Email
                  </label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-background border-border focus-visible:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject
                </label>
                <Input 
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Discussion"
                  required
                  className="bg-background border-border focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Your Message
                </label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  className="min-h-[150px] bg-background border-border focus-visible:ring-primary"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/80"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;

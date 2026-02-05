import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MessageSquare, Youtube, Facebook, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlowButton } from '@/components/ui/glow-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const serviceId = 'service_z87cjxn';
      const templateId = 'template_h981i0f';
      const publicKey = 'jimVuqoMvBgM3bWHm';

      emailjs.init(publicKey);

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          to_name: 'JEEM'
        }
      );

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Error Sending Message",
        description: "There was an issue sending your message. Please try again or contact me directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "tunjanna11@gmail.com",
      description: "Send me an email for detailed inquiries",
      link: "mailto:tunjanna11@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone & WhatsApp",
      value: "01992331822",
      description: "Call or message me directly",
      link: "tel:01992331822"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      value: "Quick Messages",
      description: "For instant communication",
      link: "https://wa.me/8801992331822"
    }
  ];

  const socialLinks = [
    {
      icon: Youtube,
      title: "YouTube Channel",
      description: "Watch my latest videos and tutorials",
      link: "https://youtube.com/@jeem_editz?si=ymSLbn2QpqD_5KDg"
    },
    {
      icon: Facebook,
      title: "Facebook Profile",
      description: "Connect with me on Facebook",
      link: "https://www.facebook.com/share/15VzXaWHks/?mibextid=wwXIfr"
    }
  ];

  const faqs = [
    {
      question: "What's your typical turnaround time?",
      answer: "Most projects are completed within 3-7 days, depending on complexity. Rush delivery is available for urgent projects."
    },
    {
      question: "Do you provide revisions?",
      answer: "Yes! All packages include multiple revision rounds to ensure you're completely satisfied with the final result."
    },
    {
      question: "What file formats do you deliver?",
      answer: "I can deliver in any format you need - MP4, MOV, AVI for videos, and PNG, JPG, PDF for graphics."
    },
    {
      question: "How do you handle payments?",
      answer: "I typically request 50% upfront and 50% upon completion. Payment can be made via bank transfer or mobile banking."
    }
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute w-[350px] h-[350px] -top-20 -right-20 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute w-[250px] h-[250px] bottom-0 -left-20 rounded-full bg-accent/15 blur-[100px]" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <motion.div 
          className="relative max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-hero">
            <span className="text-foreground">Let's</span>{" "}
            <span className="text-gradient">Connect</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-8">
            Ready to bring your creative vision to life? I'm here to help with your video editing, 
            cinematography, and design needs.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="card-glass border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-2xl text-gradient">Send me a message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="bg-secondary/30 border-border focus:border-primary/50 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="bg-secondary/30 border-border focus:border-primary/50 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="bg-secondary/30 border-border focus:border-primary/50 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Needed</Label>
                    <Input
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      placeholder="e.g., Video editing, Cinematography, Graphic design"
                      className="bg-secondary/30 border-border focus:border-primary/50 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Project Details *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project, timeline, and any specific requirements..."
                      className="bg-secondary/30 border-border focus:border-primary/50 rounded-xl"
                    />
                  </div>

                  <GlowButton 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </GlowButton>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Contact Methods */}
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="text-xl text-gradient">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.link}
                    className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group"
                  >
                    <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <method.icon className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{method.title}</h3>
                      <p className="text-primary font-mono font-medium">{method.value}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="text-xl text-gradient">Follow My Work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.title}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group"
                  >
                    <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <social.icon className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{social.title}</h3>
                      <p className="text-sm text-muted-foreground">{social.description}</p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="text-xl text-gradient">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Clock, title: "Response Time", value: "Within 24 hours" },
                  { icon: MapPin, title: "Location", value: "Bangladesh (Available Worldwide)" },
                  { icon: CheckCircle, title: "Availability", value: "Currently accepting new projects" }
                ].map((info) => (
                  <div 
                    key={info.title} 
                    className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/30 border border-border"
                  >
                    <info.icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{info.title}</p>
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-card/30" />
        
        <div className="relative max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Frequently Asked</span>{" "}
              <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common inquiries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="card-glass h-full hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3 text-lg">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

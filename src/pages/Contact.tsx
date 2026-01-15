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
import { CursorSpotlight } from '@/components/ui/cursor-spotlight';
import { AnimatedText } from '@/components/ui/animated-text';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <CursorSpotlight
        spotlightSize={600}
        spotlightOpacity={0.12}
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <motion.div 
          className="orb orb-primary w-[400px] h-[400px] -top-20 -right-20 opacity-50"
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="orb orb-accent w-[300px] h-[300px] bottom-0 -left-20 opacity-40"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <motion.div 
          className="relative max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-hero">
            <AnimatedText text="Let's" className="text-foreground" animation="blur" delay={0.1} />
            {" "}
            <AnimatedText text="Connect" className="text-gradient" animation="blur" delay={0.3} />
          </h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Ready to bring your creative vision to life? I'm here to help with your video editing, 
            cinematography, and design needs.
          </motion.p>
        </motion.div>
      </CursorSpotlight>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div className="space-y-2" variants={itemVariants}>
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
                    </motion.div>
                    <motion.div className="space-y-2" variants={itemVariants}>
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
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="bg-secondary/30 border-border focus:border-primary/50 rounded-xl"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                  >
                    <Label htmlFor="service">Service Needed</Label>
                    <Input
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      placeholder="e.g., Video editing, Cinematography, Graphic design"
                      className="bg-secondary/30 border-border focus:border-primary/50 rounded-xl"
                    />
                  </motion.div>

                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
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
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    whileHover={{ scale: 1.01 }}
                  >
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
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Contact Methods */}
            <motion.div variants={itemVariants}>
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="text-xl text-gradient">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={method.title}
                      href={method.link}
                      className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.span 
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-500"
                        whileHover={{ scale: 1.1 }}
                      >
                        <method.icon className="w-5 h-5 text-primary" />
                      </motion.span>
                      <div>
                        <h3 className="font-semibold group-hover:text-gradient transition-all duration-300">{method.title}</h3>
                        <p className="text-primary font-mono font-medium">{method.value}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </motion.a>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="text-xl text-gradient">Follow My Work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.title}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.span 
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-500"
                        whileHover={{ scale: 1.1 }}
                      >
                        <social.icon className="w-5 h-5 text-primary" />
                      </motion.span>
                      <div>
                        <h3 className="font-semibold group-hover:text-gradient transition-all duration-300">{social.title}</h3>
                        <p className="text-sm text-muted-foreground">{social.description}</p>
                      </div>
                    </motion.a>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Info */}
            <motion.div variants={itemVariants}>
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="text-xl text-gradient">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: Clock, title: "Response Time", value: "Within 24 hours" },
                    { icon: MapPin, title: "Location", value: "Bangladesh (Available Worldwide)" },
                    { icon: CheckCircle, title: "Availability", value: "Currently accepting new projects" }
                  ].map((info, index) => (
                    <motion.div 
                      key={info.title} 
                      className="flex items-center space-x-4 p-4 rounded-xl bg-secondary/30 border border-border"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <info.icon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">{info.title}</p>
                        <p className="text-sm text-muted-foreground">{info.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div 
          className="mt-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-center mb-16">
            <span className="text-foreground">Frequently Asked</span>{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="card-glass border-l-4 border-l-primary/50 group h-full">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-gradient transition-all duration-300">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

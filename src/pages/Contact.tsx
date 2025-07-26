import { useState } from 'react';
import { Mail, Phone, MessageSquare, Youtube, Facebook, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

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
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
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
      link: "mailto:tunjanna11@gmail.com",
      color: "text-blue-500"
    },
    {
      icon: Phone,
      title: "Phone & WhatsApp",
      value: "01992331822",
      description: "Call or message me directly",
      link: "tel:01992331822",
      color: "text-green-500"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      value: "Quick Messages",
      description: "For instant communication",
      link: "https://wa.me/8801992331822",
      color: "text-green-500"
    }
  ];

  const socialLinks = [
    {
      icon: Youtube,
      title: "YouTube Channel",
      description: "Watch my latest videos and tutorials",
      link: "https://youtube.com/@jeem_editz?si=ymSLbn2QpqD_5KDg",
      color: "text-red-500"
    },
    {
      icon: Facebook,
      title: "Facebook Profile",
      description: "Connect with me on Facebook",
      link: "https://www.facebook.com/share/15VzXaWHks/?mibextid=wwXIfr",
      color: "text-blue-500"
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
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Let's <span className="text-primary">Connect</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your creative vision to life? I'm here to help with your video editing, 
            cinematography, and design needs. Let's discuss your project!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="card-gradient card-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Send me a message</CardTitle>
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
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gold-glow transition-cinematic hover:scale-105"
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
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <Card className="card-gradient card-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={method.title}
                    href={method.link}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary transition-smooth"
                  >
                    <method.icon className={`w-6 h-6 ${method.color}`} />
                    <div>
                      <h3 className="font-semibold">{method.title}</h3>
                      <p className="text-primary font-medium">{method.value}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="card-gradient card-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Follow My Work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.title}
                    href={social.link}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary transition-smooth"
                  >
                    <social.icon className={`w-6 h-6 ${social.color}`} />
                    <div>
                      <h3 className="font-semibold">{social.title}</h3>
                      <p className="text-sm text-muted-foreground">{social.description}</p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="card-gradient card-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Bangladesh (Available Worldwide)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Availability</p>
                    <p className="text-sm text-muted-foreground">Currently accepting new projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="card-gradient card-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
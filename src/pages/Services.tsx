import { Video, Camera, Palette, Zap, Clock, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Services = () => {
  const services = [
    {
      icon: Video,
      title: "Video Editing",
      description: "Professional video editing with advanced techniques, color grading, and storytelling.",
      features: [
        "Cut and arrangement of footage",
        "Color correction and grading",
        "Audio synchronization and enhancement",
        "Transition effects and animations",
        "Title sequences and graphics",
        "Multiple format deliverables"
      ],
      timeline: "3-7 days",
      pricing: "Starting from $50",
      popular: true
    },
    {
      icon: Camera,
      title: "Cinematography",
      description: "Professional filming services with creative direction and technical expertise.",
      features: [
        "Creative shot composition",
        "Professional lighting setup",
        "Camera operation and direction",
        "Location scouting assistance",
        "Equipment recommendations",
        "Raw footage organization"
      ],
      timeline: "1-3 days",
      pricing: "Starting from $100/day",
      popular: false
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Visual identity and branding solutions for businesses and personal projects.",
      features: [
        "Logo design and branding",
        "Social media graphics",
        "Poster and flyer design",
        "Business card design",
        "Brand guideline creation",
        "Print-ready file preparation"
      ],
      timeline: "2-5 days",
      pricing: "Starting from $30",
      popular: false
    },
    {
      icon: Zap,
      title: "Motion Graphics",
      description: "Dynamic animations and motion graphics to enhance your visual content.",
      features: [
        "Logo animations",
        "Text and title animations",
        "Explainer video graphics",
        "Social media animations",
        "Lower thirds and overlays",
        "Custom motion design"
      ],
      timeline: "4-8 days",
      pricing: "Starting from $75",
      popular: false
    }
  ];

  const packages = [
    {
      name: "Basic Package",
      price: "$150",
      description: "Perfect for small projects and social media content",
      features: [
        "Up to 3 minutes video editing",
        "Basic color correction",
        "Simple transitions",
        "Audio sync and basic enhancement",
        "2 rounds of revisions",
        "HD 1080p export"
      ],
      popular: false
    },
    {
      name: "Professional Package",
      price: "$300",
      description: "Ideal for business content and marketing videos",
      features: [
        "Up to 10 minutes video editing",
        "Advanced color grading",
        "Custom transitions and effects",
        "Professional audio mixing",
        "Motion graphics elements",
        "4K export options",
        "5 rounds of revisions"
      ],
      popular: true
    },
    {
      name: "Premium Package",
      price: "$500",
      description: "Complete production solution for complex projects",
      features: [
        "Unlimited length video editing",
        "Cinematic color grading",
        "Custom motion graphics",
        "Professional sound design",
        "Multiple format deliverables",
        "Unlimited revisions",
        "Rush delivery available",
        "Project consultation included"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-hero glow-text animate-slide-up">
            Creative <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Professional video editing, cinematography, and design services tailored to bring your vision to life. 
            From concept to completion, I deliver exceptional results.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-radial opacity-20" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.title} 
                className={`card-glass card-hover border-border/30 group ${service.popular ? 'border-l-4 border-l-primary' : ''}`}
                style={{ '--i': index } as React.CSSProperties}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] transition-all duration-300">
                        <service.icon className="w-6 h-6 text-primary" />
                      </span>
                      <span className="text-xl group-hover:text-gradient transition-all duration-300">{service.title}</span>
                    </CardTitle>
                    {service.popular && (
                      <Badge className="bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_hsl(var(--primary)/0.2)]">Popular</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-2">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/30">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-mono">{service.timeline}</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/30">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="font-mono">{service.pricing}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gradient">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-card/50" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gradient">Service Packages</h2>
            <p className="text-xl text-muted-foreground">
              Choose the package that best fits your project needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={pkg.name} 
                className={`card-glass card-hover border-border/30 group ${pkg.popular ? 'border-2 border-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.2)]' : ''}`}
              >
                <CardHeader>
                  <div className="text-center">
                    {pkg.popular && (
                      <Badge className="mb-4 bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.4)]">Most Popular</Badge>
                    )}
                    <CardTitle className="text-2xl group-hover:text-gradient transition-all duration-300">{pkg.name}</CardTitle>
                    <div className="text-4xl font-bold text-gradient font-mono mt-4">{pkg.price}</div>
                    <p className="text-sm text-muted-foreground mt-2">{pkg.description}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    asChild 
                    className={`w-full btn-glow ${pkg.popular ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 hover:bg-secondary'}`}
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    <Link to="/contact" className="group">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-radial opacity-20" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gradient">My Process</h2>
            <p className="text-xl text-muted-foreground">
              A streamlined workflow designed to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", description: "Discuss your vision, requirements, and timeline" },
              { step: "02", title: "Planning", description: "Create detailed project plan and gather assets" },
              { step: "03", title: "Production", description: "Execute the project with regular progress updates" },
              { step: "04", title: "Delivery", description: "Final review, revisions, and project delivery" }
            ].map((phase, index) => (
              <div key={phase.step} className="text-center group">
                <div className="w-20 h-20 bg-primary/10 backdrop-blur-sm border border-primary/30 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-mono font-bold group-hover:bg-primary/20 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300">
                  {phase.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-gradient transition-all duration-300">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-card/50" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient glow-text">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss your vision and create something amazing together. 
            Get in touch for a free consultation.
          </p>
          <Button asChild size="lg" className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
            <Link to="/contact" className="group">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;

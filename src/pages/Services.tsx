import { Video, Camera, Palette, Zap, Clock, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlowButton } from '@/components/ui/glow-button';
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
      name: "Basic",
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
      name: "Professional",
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
      name: "Premium",
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
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="orb orb-primary w-[400px] h-[400px] -top-20 -right-20 opacity-50" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-hero animate-slide-up">
            <span className="text-foreground">Creative</span>{" "}
            <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Professional video editing, cinematography, and design services tailored to bring your vision to life.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.title} 
                className={`card-glass group ${service.popular ? 'border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.1)]' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-4">
                      <span className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] transition-all duration-500">
                        <service.icon className="w-7 h-7 text-primary" />
                      </span>
                      <span className="text-xl group-hover:text-gradient transition-all duration-300">{service.title}</span>
                    </CardTitle>
                    {service.popular && (
                      <Badge className="bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.4)]">Popular</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-4">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-3 rounded-xl bg-secondary/30 border border-border">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="font-mono text-sm">{service.timeline}</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-xl bg-secondary/30 border border-border">
                        <DollarSign className="w-5 h-5 text-primary" />
                        <span className="font-mono text-sm">{service.pricing}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gradient">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-3 text-sm text-muted-foreground">
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
        <div className="absolute inset-0 bg-card/30" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Service</span>{" "}
              <span className="text-gradient">Packages</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the package that best fits your project needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={pkg.name} 
                className={`card-glass group relative ${pkg.popular ? 'border-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.15)]' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 shadow-[0_0_20px_hsl(var(--primary)/0.5)]">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="pt-8">
                  <div className="text-center">
                    <CardTitle className="text-2xl group-hover:text-gradient transition-all duration-300">{pkg.name}</CardTitle>
                    <div className="text-5xl font-bold text-gradient font-mono mt-6">{pkg.price}</div>
                    <p className="text-sm text-muted-foreground mt-4">{pkg.description}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-10">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-sm">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <GlowButton 
                    asChild 
                    className="w-full"
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    <Link to="/contact" className="group">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </GlowButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">My</span>{" "}
              <span className="text-gradient">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              A streamlined workflow for exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", description: "Discuss your vision and requirements" },
              { step: "02", title: "Planning", description: "Create detailed project plan" },
              { step: "03", title: "Production", description: "Execute with regular updates" },
              { step: "04", title: "Delivery", description: "Final review and delivery" }
            ].map((phase, index) => (
              <div key={phase.step} className="text-center group">
                <div className="w-20 h-20 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-mono font-bold text-primary group-hover:bg-primary/20 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-500">
                  {phase.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient transition-all duration-300">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="orb orb-accent w-[300px] h-[300px] -bottom-20 -left-20 opacity-40" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            <span className="text-foreground">Ready to Start</span>
            <br />
            <span className="text-gradient">Your Project?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Let's discuss your vision and create something amazing together.
          </p>
          <GlowButton asChild size="lg" className="text-lg">
            <Link to="/contact" className="group">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </GlowButton>
        </div>
      </section>
    </div>
  );
};

export default Services;
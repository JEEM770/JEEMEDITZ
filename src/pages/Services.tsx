import { Video, Camera, Palette, Zap, Clock, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlowButton } from '@/components/ui/glow-button';
import { Badge } from '@/components/ui/badge';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useParallax, useScrollScale } from '@/hooks/use-scroll-animation';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion-wrapper';

const Services = () => {
  // Parallax hooks
  const { ref: headerParallaxRef, y: headerParallaxY } = useParallax(0.3);
  const { ref: packagesScaleRef, scale: packagesScale } = useScrollScale(0.95, 1);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const orbY = useTransform(smoothProgress, [0, 1], [0, -120]);
  const orbRotate = useTransform(smoothProgress, [0, 1], [0, 25]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="min-h-screen pt-24 overflow-hidden">
      {/* Header */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div 
          ref={headerParallaxRef}
          className="orb orb-primary w-[400px] h-[400px] -top-20 -right-20 opacity-50" 
          style={{ y: headerParallaxY }}
        />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <FadeIn className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-hero"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-foreground">Creative</span>{" "}
            <span className="text-gradient">Services</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Professional video editing, cinematography, and design services tailored to bring your vision to life.
          </motion.p>
        </FadeIn>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Card 
                  className={`card-glass group h-full ${service.popular ? 'border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.1)]' : ''}`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-4">
                        <motion.span 
                          className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] transition-all duration-500"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <service.icon className="w-7 h-7 text-primary" />
                        </motion.span>
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
                        <motion.div 
                          className="flex items-center space-x-3 p-3 rounded-xl bg-secondary/30 border border-border"
                          whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary) / 0.3)' }}
                        >
                          <Clock className="w-5 h-5 text-primary" />
                          <span className="font-mono text-sm">{service.timeline}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center space-x-3 p-3 rounded-xl bg-secondary/30 border border-border"
                          whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary) / 0.3)' }}
                        >
                          <DollarSign className="w-5 h-5 text-primary" />
                          <span className="font-mono text-sm">{service.pricing}</span>
                        </motion.div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gradient">What's Included:</h4>
                        <motion.ul 
                          className="space-y-2"
                          variants={containerVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          {service.features.map((feature, idx) => (
                            <motion.li 
                              key={idx} 
                              className="flex items-center space-x-3 text-sm text-muted-foreground"
                              variants={featureVariants}
                              custom={idx}
                            >
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-card/30" />
        
        <motion.div 
          ref={packagesScaleRef}
          className="relative max-w-7xl mx-auto"
          style={{ scale: packagesScale }}
        >
          <FadeIn className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Service</span>{" "}
              <span className="text-gradient">Packages</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the package that best fits your project needs
            </p>
          </FadeIn>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                variants={itemVariants}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
              >
                <Card 
                  className={`card-glass group relative h-full ${pkg.popular ? 'border-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.15)]' : ''}`}
                >
                  {pkg.popular && (
                    <motion.div 
                      className="absolute -top-4 left-1/2 -translate-x-1/2"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 shadow-[0_0_20px_hsl(var(--primary)/0.5)]">Most Popular</Badge>
                    </motion.div>
                  )}
                  <CardHeader className="pt-8">
                    <div className="text-center">
                      <CardTitle className="text-2xl group-hover:text-gradient transition-all duration-300">{pkg.name}</CardTitle>
                      <motion.div 
                        className="text-5xl font-bold text-gradient font-mono mt-6"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                      >
                        {pkg.price}
                      </motion.div>
                      <p className="text-sm text-muted-foreground mt-4">{pkg.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.ul 
                      className="space-y-4 mb-10"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {pkg.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-center space-x-3 text-sm"
                          variants={featureVariants}
                        >
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative max-w-7xl mx-auto">
          <FadeIn className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">My</span>{" "}
              <span className="text-gradient">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              A streamlined workflow for exceptional results
            </p>
          </FadeIn>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { step: "01", title: "Consultation", description: "Discuss your vision and requirements" },
              { step: "02", title: "Planning", description: "Create detailed project plan" },
              { step: "03", title: "Production", description: "Execute with regular updates" },
              { step: "04", title: "Delivery", description: "Final review and delivery" }
            ].map((phase, index) => (
              <motion.div 
                key={phase.step} 
                className="text-center group"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-mono font-bold text-primary group-hover:bg-primary/20 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-500"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {phase.step}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient transition-all duration-300">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
                
                {/* Connecting line for desktop */}
                {index < 3 && (
                  <motion.div 
                    className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-gradient-to-r from-primary/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
                    style={{ originX: 0 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div 
          className="orb orb-accent w-[300px] h-[300px] -bottom-20 -left-20 opacity-40" 
          style={{ y: orbY, rotate: orbRotate }}
        />
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <FadeIn className="relative max-w-4xl mx-auto text-center" direction="up">
          <motion.h2 
            className="text-4xl lg:text-6xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-foreground">Ready to Start</span>
            <br />
            <span className="text-gradient">Your Project?</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's discuss your vision and create something amazing together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlowButton asChild size="lg" className="text-lg">
              <Link to="/contact" className="group">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </GlowButton>
          </motion.div>
        </FadeIn>
      </section>
    </div>
  );
};

export default Services;

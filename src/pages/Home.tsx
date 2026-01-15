import { ArrowRight, Play, Camera, Video, Palette, Zap, Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlowButton } from '@/components/ui/glow-button';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CursorSpotlight } from '@/components/ui/cursor-spotlight';
import { AnimatedText, AnimatedCharacters } from '@/components/ui/animated-text';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const skills = [
    { icon: Video, name: "Video Editing", years: "8+", description: "Expert in Adobe Premiere Pro, After Effects" },
    { icon: Palette, name: "Graphic Design", years: "7+", description: "Photoshop, Visual Identity, Branding" },
    { icon: Camera, name: "Cinematography", years: "5+", description: "Visual Storytelling, Camera Work" },
    { icon: Zap, name: "Motion Graphics", years: "6+", description: "Alight Motion, CapCut, Animations" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "JEEM's video editing skills are exceptional! He transformed my raw footage into a stunning masterpiece. The attention to detail and creative vision exceeded my expectations.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "Working with JEEM was a game-changer for our brand. His graphic design work perfectly captured our vision and helped us stand out in a crowded market.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "YouTuber",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      content: "The motion graphics JEEM created for my channel intro are absolutely stunning. Fast turnaround, great communication, and amazing quality. Highly recommended!",
      rating: 5
    },
    {
      name: "David Park",
      role: "Filmmaker",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      content: "JEEM has an incredible eye for cinematography. His color grading and editing skills brought our short film to life. A true professional!",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <CursorSpotlight 
        spotlightSize={700} 
        spotlightOpacity={0.12}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Animated Orbs */}
        <motion.div 
          className="orb orb-primary w-[500px] h-[500px] -top-40 -left-40 opacity-60"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="orb orb-accent w-[400px] h-[400px] -bottom-20 -right-20 opacity-50"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="orb orb-primary w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" style={{ animationDelay: '-10s' }} />
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20">
          {/* Content */}
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <h1 className="text-hero">
                  <AnimatedText 
                    text="Visual" 
                    className="text-foreground block"
                    animation="blur"
                    delay={0.1}
                  />
                  <AnimatedCharacters 
                    text="Storyteller" 
                    className="text-gradient block"
                    delay={0.3}
                    staggerDelay={0.03}
                  />
                </h1>
              </motion.div>
              <motion.p 
                className="text-xl text-muted-foreground leading-relaxed max-w-xl"
                variants={itemVariants}
              >
                I'm <span className="text-gradient font-semibold">JEEM</span>, an 18-year-old video editor,
                cinematographer, and designer crafting compelling visual narratives.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <GlowButton asChild size="lg">
                <Link to="/portfolio">
                  <Play className="w-5 h-5 mr-2" />
                  View My Work
                </Link>
              </GlowButton>
              <GlowButton asChild variant="outline" size="lg">
                <Link to="/about" className="group">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </GlowButton>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="flex gap-8 pt-8"
              variants={itemVariants}
            >
              {[
                { value: '50+', label: 'Projects' },
                { value: '8', label: 'Years Exp.' },
                { value: '100%', label: 'Satisfaction' },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div 
                    className="text-3xl lg:text-4xl font-bold text-gradient font-mono"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative group">
              {/* Glow ring */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-2xl opacity-40"
                animate={{ 
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.img
                src="https://i.postimg.cc/L5rqzSJ5/IMG-3305.jpg"
                alt="JEEM - Video Editor & Cinematographer"
                className="relative w-72 h-72 lg:w-[400px] lg:h-[400px] object-cover rounded-full border-2 border-primary/30 float shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <motion.div 
            className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
            animate={{ scaleY: [1, 0.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </CursorSpotlight>

      {/* Skills Section */}
      <CursorSpotlight
        spotlightSize={600}
        spotlightOpacity={0.1}
        className="py-32 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">My</span>{" "}
              <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Years of dedicated practice across multiple creative disciplines
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {skills.map((skill) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <Card className="card-glass group hover:border-primary/30 transition-all duration-500 h-full">
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-all duration-500"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <skill.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-gradient transition-all duration-300">{skill.name}</h3>
                    <div className="text-2xl font-bold text-primary font-mono mb-3">{skill.years}</div>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </CursorSpotlight>

      {/* Testimonials Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-card/30" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <div className="relative max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Client</span>{" "}
              <span className="text-gradient">Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What people say about working with me
            </p>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="relative group/testimonial">
            {/* Navigation Buttons */}
            <GlowButton
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:flex"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-5 h-5" />
            </GlowButton>

            <GlowButton
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:flex"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-5 h-5" />
            </GlowButton>

            {/* Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="card-glass border-primary/20 overflow-hidden">
                  <CardContent className="p-10 md:p-14">
                    <div className="flex flex-col md:flex-row gap-10 items-center">
                      {/* Avatar */}
                      <motion.div 
                        className="relative flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-40" />
                        <img
                          src={testimonials[currentTestimonial].avatar}
                          alt={testimonials[currentTestimonial].name}
                          className="relative w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-2 border-primary/30"
                        />
                        <motion.div 
                          className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Quote className="w-5 h-5 text-primary" />
                        </motion.div>
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        {/* Stars */}
                        <div className="flex gap-1 justify-center md:justify-start mb-6">
                          {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <Star className="w-5 h-5 text-primary fill-primary" />
                            </motion.div>
                          ))}
                        </div>

                        <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                          "{testimonials[currentTestimonial].content}"
                        </blockquote>

                        <div>
                          <div className="font-semibold text-xl text-gradient">
                            {testimonials[currentTestimonial].name}
                          </div>
                          <div className="text-primary font-mono text-sm">
                            {testimonials[currentTestimonial].role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'w-10 bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]'
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center gap-4 mt-8 md:hidden">
              <GlowButton variant="outline" size="icon" onClick={prevTestimonial}>
                <ChevronLeft className="w-5 h-5" />
              </GlowButton>
              <GlowButton variant="outline" size="icon" onClick={nextTestimonial}>
                <ChevronRight className="w-5 h-5" />
              </GlowButton>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CursorSpotlight
        spotlightSize={600}
        spotlightOpacity={0.1}
        className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <motion.div 
          className="orb orb-primary w-[400px] h-[400px] top-0 right-0 opacity-40"
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="orb orb-accent w-[300px] h-[300px] bottom-0 left-0 opacity-30"
          animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <motion.div 
          className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            <span className="text-foreground">Ready to Create</span>
            <br />
            <span className="text-gradient">Something Amazing?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life with professional video editing, 
            cinematography, and design services.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <GlowButton asChild size="lg" className="text-lg animate-glow-pulse">
              <Link to="/contact" className="group">
                Get In Touch
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </GlowButton>
          </motion.div>
        </motion.div>
      </CursorSpotlight>
    </div>
  );
};

export default Home;

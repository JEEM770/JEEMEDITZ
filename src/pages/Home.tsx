import { ArrowRight, Play, Camera, Video, Palette, Zap, Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParallaxWrapper from '@/components/ParallaxWrapper';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const skills = [
    { icon: Video, name: "Video Editing", years: "8 Years", description: "Expert in Adobe Premiere Pro, After Effects" },
    { icon: Palette, name: "Graphic Design", years: "7 Years", description: "Photoshop, Visual Identity, Branding" },
    { icon: Camera, name: "Cinematography", years: "5 Years", description: "Visual Storytelling, Camera Work" },
    { icon: Zap, name: "Motion Graphics", years: "6 Years", description: "Alight Motion, CapCut, Animations" },
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Parallax Background Effects */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-glow" />
        
        {/* Floating Parallax Orbs */}
        <ParallaxWrapper speed={-0.3} className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <ParallaxWrapper speed={0.4} className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <ParallaxWrapper speed={-0.5} className="absolute bottom-20 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-2xl pointer-events-none" />
        <ParallaxWrapper speed={0.2} className="absolute bottom-40 right-1/3 w-48 h-48 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
        
        {/* Geometric Shapes with Parallax */}
        <ParallaxWrapper speed={-0.6} className="absolute top-1/4 left-[15%] opacity-20 pointer-events-none">
          <div className="w-20 h-20 border-2 border-primary/40 rotate-45" />
        </ParallaxWrapper>
        <ParallaxWrapper speed={0.5} className="absolute top-1/3 right-[10%] opacity-20 pointer-events-none">
          <div className="w-16 h-16 border-2 border-accent/40 rounded-full" />
        </ParallaxWrapper>
        <ParallaxWrapper speed={-0.4} className="absolute bottom-1/4 right-[20%] opacity-15 pointer-events-none">
          <div className="w-24 h-24 border border-primary/30 rotate-12" />
        </ParallaxWrapper>
        <ParallaxWrapper speed={0.3} className="absolute bottom-1/3 left-[5%] opacity-15 pointer-events-none">
          <div className="w-12 h-12 bg-primary/20 rotate-45" />
        </ParallaxWrapper>
        
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
            <h1 className="text-hero animate-slide-up">
              <span className="text-foreground glow-text">Visual Storyteller &</span>
              <br />
              <span className="text-gradient">Creative Director</span>
            </h1>
              <p className="text-xl text-muted-foreground leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                I'm <span className="text-gradient font-semibold">JEEM</span>, an 18-year-old passionate video editor,
                cinematographer, and graphic designer currently pursuing BSc in Computer Science and Engineering. 
                I transform ideas into compelling visual narratives.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button asChild size="lg" className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/portfolio">
                  <Play className="w-5 h-5 mr-2" />
                  View My Work
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300">
                <Link to="/about">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/30 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {[
                { value: '50+', label: 'Projects' },
                { value: '8', label: 'Years Experience' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-3xl font-bold text-gradient group-hover:glow-text transition-all duration-300 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              {/* Glow layers */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
              <div className="absolute inset-4 bg-accent/10 rounded-full blur-2xl" />
              
              {/* Electric border effect */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-50 blur-sm animate-spin-slow" />
              
              <img
                src="https://i.postimg.cc/L5rqzSJ5/IMG-3305.jpg"
                alt="JEEM - Video Editor & Cinematographer"
                className="relative w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-full border-2 border-primary/30 float shadow-[0_0_60px_hsl(var(--primary)/0.3)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-radial opacity-20" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gradient">Expertise & Skills</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Years of dedicated practice have honed my abilities across multiple creative disciplines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card 
                key={skill.name} 
                className="card-glass card-hover border-border/30 group"
                style={{ '--i': index } as React.CSSProperties}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-all duration-300">
                    <skill.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-gradient transition-all duration-300">{skill.name}</h3>
                  <div className="text-primary font-mono font-medium mb-2">{skill.years}</div>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
        }}
      >
        <div className="absolute inset-0 bg-card/50" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        {/* Cursor glow effect */}
        <div 
          className="pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
            left: 'var(--mouse-x, 50%)',
            top: 'var(--mouse-y, 50%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        <div className="relative max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">Client</span>{" "}
              <span className="text-gradient">Testimonials</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What my clients say about working with me
            </p>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="relative group/testimonial">
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:scale-110 transition-all duration-300 hidden md:flex"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:scale-110 transition-all duration-300 hidden md:flex"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="card-glass border-border/30 border-l-4 border-l-primary overflow-hidden group hover:border-primary/50 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)] transition-all duration-500">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      {/* Avatar */}
                      <motion.div 
                        className="relative flex-shrink-0"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-500" />
                        <img
                          src={testimonials[currentTestimonial].avatar}
                          alt={testimonials[currentTestimonial].name}
                          className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.2)] group-hover:border-primary/60 group-hover:shadow-[0_0_50px_hsl(var(--primary)/0.4)] transition-all duration-500"
                        />
                        <motion.div 
                          className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Quote className="w-5 h-5 text-primary" />
                        </motion.div>
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        {/* Stars */}
                        <div className="flex gap-1 justify-center md:justify-start mb-4">
                          {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0, rotate: -180 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                            >
                              <Star className="w-5 h-5 text-primary fill-primary hover:scale-125 transition-transform duration-200 cursor-pointer" />
                            </motion.div>
                          ))}
                        </div>

                        <motion.blockquote 
                          className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 italic group-hover:text-foreground/80 transition-colors duration-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          "{testimonials[currentTestimonial].content}"
                        </motion.blockquote>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="font-semibold text-lg group-hover:text-gradient transition-all duration-300">
                            {testimonials[currentTestimonial].name}
                          </div>
                          <div className="text-primary font-mono text-sm">
                            {testimonials[currentTestimonial].role}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'w-8 bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center gap-4 mt-6 md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 hover:border-primary"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 hover:border-primary"
                onClick={nextTestimonial}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Ready to Create Something</span>{" "}
            <span className="text-gradient">Amazing?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life with professional video editing, 
            cinematography, and visual design.
          </p>
          <Button asChild size="lg" className="btn-glow bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
            <Link to="/contact">
              Get In Touch
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;

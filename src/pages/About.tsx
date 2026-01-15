import { Calendar, GraduationCap, Award, Target, Zap, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { CursorGlowCard } from '@/components/ui/cursor-glow-card';
import { CursorSpotlight } from '@/components/ui/cursor-spotlight';
import { AnimatedText, AnimatedCharacters } from '@/components/ui/animated-text';

const About = () => {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [isAnimating, setIsAnimating] = useState<{ [key: string]: boolean }>({});
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // Hero image cursor effect
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [heroMousePos, setHeroMousePos] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroImageRef.current) return;
    const rect = heroImageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setHeroMousePos({ x, y });
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.keys(sectionRefs.current).forEach((key) => {
      const element = sectionRefs.current[key];
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible[key]) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    Object.keys(isVisible).forEach((key) => {
      if (isVisible[key] && !animatedValues[key]) {
        const targetValue = parseInt(key.split('-')[1]);
        const index = parseInt(key.split('-')[2] || '0');
        const staggerDelay = index * 150;
        
        setTimeout(() => {
          setIsAnimating((prev) => ({ ...prev, [key]: true }));
          let currentValue = 0;
          const duration = 2000;
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            currentValue = targetValue * easeOutCubic;
            
            if (progress < 1) {
              setAnimatedValues((prev) => ({ ...prev, [key]: Math.floor(currentValue) }));
              requestAnimationFrame(animate);
            } else {
              setAnimatedValues((prev) => ({ ...prev, [key]: targetValue }));
              setIsAnimating((prev) => ({ ...prev, [key]: false }));
            }
          };
          
          requestAnimationFrame(animate);
        }, staggerDelay);
      }
    });
  }, [isVisible]);

  const experiences = [
    {
      title: "Graphic Design",
      years: "7 Years",
      description: "Started with basic designs and evolved into complex visual identity projects",
      icon: Target,
      progress: 95
    },
    {
      title: "Video Editing",
      years: "8 Years",
      description: "From simple cuts to advanced storytelling and post-production workflows",
      icon: Zap,
      progress: 98
    },
    {
      title: "Cinematography",
      years: "5 Years",
      description: "Developed eye for composition, lighting, and visual narrative techniques",
      icon: Award,
      progress: 90
    }
  ];

  const skills = [
    { name: "Adobe Premiere Pro", level: 95 },
    { name: "Adobe After Effects", level: 90 },
    { name: "Adobe Photoshop", level: 88 },
    { name: "Alight Motion", level: 85 },
    { name: "CapCut", level: 92 },
    { name: "Color Grading", level: 87 },
    { name: "Motion Graphics", level: 83 },
    { name: "Visual Storytelling", level: 94 }
  ];

  // Animation variants
  const easeSmooth = [0.16, 1, 0.3, 1] as const;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: easeSmooth },
    },
  };

  const slideLeftVariants = {
    hidden: { opacity: 0, x: -60, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: easeSmooth },
    },
  };

  const slideRightVariants = {
    hidden: { opacity: 0, x: 60, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: easeSmooth },
    },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(20px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: easeSmooth },
    },
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <CursorSpotlight className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div 
          className="orb orb-primary w-[500px] h-[500px] -top-40 -left-40 opacity-50"
          animate={{
            x: heroMousePos.x * 2,
            y: heroMousePos.y * 2,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 30 }}
        />
        <motion.div 
          className="orb orb-accent w-[300px] h-[300px] bottom-0 right-0 opacity-40" 
          style={{ animationDelay: '-8s' }}
          animate={{
            x: heroMousePos.x * -1.5,
            y: heroMousePos.y * -1.5,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 30 }}
        />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div 
          className="relative max-w-7xl mx-auto"
          onMouseMove={handleHeroMouseMove}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                className="text-hero"
                variants={itemVariants}
              >
                <span className="text-foreground">About</span>{" "}
                <AnimatedCharacters 
                  text="JEEM" 
                  className="text-gradient"
                  delay={0.3}
                  staggerDelay={0.08}
                />
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground leading-relaxed"
                variants={itemVariants}
              >
                <AnimatedText 
                  text="At just 18 years old, I've dedicated nearly half my life to mastering the art of visual storytelling. What started as curiosity has evolved into a passionate career spanning video editing, cinematography, and graphic design."
                  delay={0.4}
                  staggerDelay={0.02}
                  animation="word"
                />
              </motion.p>
              
              <motion.p 
                className="text-lg text-muted-foreground leading-relaxed"
                variants={itemVariants}
              >
                <AnimatedText 
                  text="Currently pursuing a BSc in Computer Science and Engineering, I blend technical expertise with creative vision to deliver exceptional results."
                  delay={0.6}
                  staggerDelay={0.02}
                  animation="word"
                />
              </motion.p>
            </motion.div>

            <motion.div 
              className="flex justify-center lg:justify-end"
              variants={scaleVariants}
              initial="hidden"
              animate="visible"
            >
              <div 
                ref={heroImageRef}
                className="relative group cursor-pointer"
                style={{
                  transform: `perspective(1000px) rotateX(${heroMousePos.y * -0.5}deg) rotateY(${heroMousePos.x * 0.5}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                {/* Animated glow ring */}
                <motion.div 
                  className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div 
                  className="absolute -inset-3 bg-background rounded-3xl"
                />
                
                {/* Blur glow behind */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                
                <motion.img
                  src="https://i.postimg.cc/5N3cH1XN/IMG-3305.jpg"
                  alt="JEEM - Creative Professional"
                  className="relative w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-3xl border border-primary/20 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 px-4 py-2 bg-card/90 backdrop-blur-xl border border-primary/30 rounded-full shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <span className="text-sm font-mono text-primary">8+ Years Experience</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </CursorSpotlight>

      {/* Education & Background */}
      <CursorSpotlight className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-card/30" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Education &</span>{" "}
              <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground">A timeline of growth and learning</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={slideLeftVariants}>
              <CursorGlowCard className="h-full" glowIntensity="high">
                <Card className="card-glass group border-l-4 border-l-primary h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-4">
                      <motion.span 
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500"
                        whileHover={{ 
                          scale: 1.1, 
                          boxShadow: '0 0 30px hsl(var(--primary) / 0.4)' 
                        }}
                      >
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </motion.span>
                      <span>Current Education</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient transition-all duration-300">BSc in Computer Science and Engineering</h3>
                    <p className="text-muted-foreground mb-4">Currently pursuing degree</p>
                    <p className="text-sm text-muted-foreground">
                      Combining technical knowledge with creative skills to bridge the gap between 
                      technology and artistry in digital media production.
                    </p>
                  </CardContent>
                </Card>
              </CursorGlowCard>
            </motion.div>

            <motion.div variants={slideRightVariants}>
              <CursorGlowCard className="h-full" glowIntensity="high" glowColor="hsl(var(--accent))">
                <Card className="card-glass group border-l-4 border-l-accent h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-4">
                      <motion.span 
                        className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-500"
                        whileHover={{ 
                          scale: 1.1, 
                          boxShadow: '0 0 30px hsl(var(--accent) / 0.4)' 
                        }}
                      >
                        <Calendar className="w-6 h-6 text-accent" />
                      </motion.span>
                      <span>Creative Journey</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient transition-all duration-300">Started at Age 10</h3>
                    <p className="text-muted-foreground mb-4">8 years of continuous learning</p>
                    <p className="text-sm text-muted-foreground">
                      Began with simple photo edits and basic videos, gradually developing expertise 
                      in professional-grade software and advanced techniques.
                    </p>
                  </CardContent>
                </Card>
              </CursorGlowCard>
            </motion.div>
          </motion.div>
        </div>
      </CursorSpotlight>

      {/* Experience Timeline */}
      <CursorSpotlight className="py-24 px-4 sm:px-6 lg:px-8 relative" spotlightSize={800}>
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Experience &</span>{" "}
              <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground">Years of dedicated practice and growth</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {experiences.map((exp, index) => {
              const key = `exp-${exp.progress}`;
              return (
                <motion.div
                  key={exp.title}
                  variants={itemVariants}
                  custom={index}
                >
                  <CursorGlowCard glowIntensity="medium">
                    <Card 
                      ref={(el) => (sectionRefs.current[key] = el)}
                      className="card-glass group h-full"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-4">
                          <motion.span 
                            className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center transition-all duration-500"
                            whileHover={{ 
                              scale: 1.1, 
                              rotate: 5,
                              backgroundColor: 'hsl(var(--primary) / 0.2)',
                              boxShadow: '0 0 30px hsl(var(--primary) / 0.4)' 
                            }}
                          >
                            <exp.icon className="w-7 h-7 text-primary" />
                          </motion.span>
                          <span className="group-hover:text-gradient transition-all duration-300">{exp.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="text-xl font-mono font-bold text-primary">{exp.years}</span>
                        </div>
                        <p className="text-muted-foreground">{exp.description}</p>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Proficiency</span>
                            <motion.span 
                              className="text-primary font-mono font-bold"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              {animatedValues[key] || 0}%
                            </motion.span>
                          </div>
                          <div className="relative">
                            <Progress 
                              value={animatedValues[key] || 0} 
                              className={`h-2 ${isAnimating[key] ? 'shadow-[0_0_20px_hsl(var(--primary)/0.6)]' : ''}`} 
                            />
                            {/* Glow trail effect */}
                            <motion.div
                              className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                              style={{
                                width: `${animatedValues[key] || 0}%`,
                                boxShadow: isAnimating[key] ? '0 0 20px hsl(var(--primary) / 0.8), 0 0 40px hsl(var(--primary) / 0.4)' : 'none',
                              }}
                              transition={{ duration: 0.1 }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CursorGlowCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </CursorSpotlight>

      {/* Skills Grid */}
      <CursorSpotlight className="py-24 px-4 sm:px-6 lg:px-8 relative" spotlightOpacity={0.12}>
        <div className="absolute inset-0 bg-card/30" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Technical</span>{" "}
              <span className="text-gradient">Skills</span>
            </h2>
            <p className="text-xl text-muted-foreground">Proficiency across industry-standard tools</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {skills.map((skill, index) => {
              const key = `skill-${skill.level}-${index}`;
              return (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  custom={index}
                >
                  <CursorGlowCard glowIntensity="low">
                    <div 
                      ref={(el) => (sectionRefs.current[key] = el)}
                      className="space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border transition-all duration-500 hover:bg-card hover:border-primary/30 group"
                    >
                      <div className="flex justify-between">
                        <span className="font-medium group-hover:text-gradient transition-all duration-300">{skill.name}</span>
                        <motion.span 
                          className="text-primary font-mono font-bold"
                          key={animatedValues[key]}
                        >
                          {animatedValues[key] || 0}%
                        </motion.span>
                      </div>
                      <div className="relative overflow-hidden rounded-full">
                        <Progress 
                          value={animatedValues[key] || 0} 
                          className={`h-2 ${isAnimating[key] ? 'shadow-[0_0_15px_hsl(var(--primary)/0.5)]' : ''}`}
                        />
                        {/* Shimmer effect on progress */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ['-100%', '200%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: 'linear',
                          }}
                          style={{
                            width: '50%',
                          }}
                        />
                      </div>
                    </div>
                  </CursorGlowCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </CursorSpotlight>

      {/* Personal Philosophy */}
      <CursorSpotlight className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden" spotlightSize={700}>
        <motion.div 
          className="orb orb-primary w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <motion.div 
          className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl lg:text-6xl font-bold mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-foreground">My</span>{" "}
            <span className="text-gradient">Philosophy</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CursorGlowCard glowIntensity="high" className="inline-block">
              <blockquote className="relative text-xl md:text-2xl text-muted-foreground leading-relaxed p-10 rounded-3xl bg-card/30 backdrop-blur-sm border border-border">
                <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/30" />
                <AnimatedText 
                  text="Every frame tells a story, every edit shapes emotion, and every design communicates meaning. At 18, I've learned that age doesn't define capability—passion, dedication, and continuous learning do."
                  delay={0.5}
                  staggerDelay={0.03}
                  animation="blur"
                  className="relative z-10"
                />
                <Quote className="absolute bottom-6 right-6 w-8 h-8 text-primary/30 rotate-180" />
              </blockquote>
            </CursorGlowCard>
          </motion.div>
          
          <motion.div 
            className="mt-10 text-gradient font-bold text-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            — JEEM
          </motion.div>
        </motion.div>
      </CursorSpotlight>
    </div>
  );
};

export default About;

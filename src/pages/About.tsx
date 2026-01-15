import { Calendar, GraduationCap, Award, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect, useRef } from 'react';

const About = () => {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [isAnimating, setIsAnimating] = useState<{ [key: string]: boolean }>({});
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-hero animate-slide-up">
                <span className="text-foreground glow-text">About</span>{" "}
                <span className="text-gradient">JEEM</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                At just 18 years old, I've dedicated nearly half my life to mastering the art of visual storytelling. 
                What started as curiosity has evolved into a passionate career spanning video editing, cinematography, 
                and graphic design.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Currently pursuing a BSc in Computer Science and Engineering, I blend technical expertise with 
                creative vision to deliver exceptional results. Every project is an opportunity to push boundaries 
                and create something memorable.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
                <img
                  src="https://i.postimg.cc/5N3cH1XN/IMG-3305.jpg"
                  alt="JEEM - Creative Professional"
                  className="relative w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-2xl border border-primary/20 shadow-[0_0_40px_hsl(var(--primary)/0.2)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Background */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-card/50" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gradient">Education & Journey</h2>
            <p className="text-xl text-muted-foreground">A timeline of growth and learning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-glass card-hover border-l-4 border-l-primary border-border/30 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </span>
                  <span>Current Education</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-gradient transition-all duration-300">BSc in Computer Science and Engineering</h3>
                <p className="text-muted-foreground mb-4">Currently pursuing degree</p>
                <p className="text-sm text-muted-foreground">
                  Combining technical knowledge with creative skills to bridge the gap between 
                  technology and artistry in digital media production.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glass card-hover border-l-4 border-l-accent border-border/30 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <span className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:shadow-[0_0_20px_hsl(var(--accent)/0.3)] transition-all duration-300">
                    <Calendar className="w-5 h-5 text-accent" />
                  </span>
                  <span>Creative Journey</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-gradient transition-all duration-300">Started at Age 10</h3>
                <p className="text-muted-foreground mb-4">8 years of continuous learning</p>
                <p className="text-sm text-muted-foreground">
                  Began with simple photo edits and basic videos, gradually developing expertise 
                  in professional-grade software and advanced techniques.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-radial opacity-20" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gradient">Experience & Expertise</h2>
            <p className="text-xl text-muted-foreground">Years of dedicated practice and growth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, index) => {
              const key = `exp-${exp.progress}`;
              return (
                <Card 
                  key={exp.title}
                  ref={(el) => (sectionRefs.current[key] = el)}
                  className="card-glass card-hover border-border/30 group"
                  style={{ '--i': index } as React.CSSProperties}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] transition-all duration-300">
                        <exp.icon className="w-6 h-6 text-primary" />
                      </span>
                      <span className="group-hover:text-gradient transition-all duration-300">{exp.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-lg font-mono font-semibold text-primary">{exp.years}</span>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Proficiency</span>
                        <span className="text-primary font-mono font-semibold">{animatedValues[key] || 0}%</span>
                      </div>
                      <Progress 
                        value={animatedValues[key] || 0} 
                        className={`h-2 transition-all duration-700 ease-out ${isAnimating[key] ? 'shadow-[0_0_10px_hsl(var(--primary)/0.5)]' : ''}`} 
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-card/50" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gradient">Technical Skills</h2>
            <p className="text-xl text-muted-foreground">Proficiency across industry-standard tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => {
              const key = `skill-${skill.level}-${index}`;
              return (
                <div 
                  key={skill.name}
                  ref={(el) => (sectionRefs.current[key] = el)}
                  className="space-y-3 p-5 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 transition-all duration-300 hover:bg-card hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] group"
                  style={{ '--i': index } as React.CSSProperties}
                >
                  <div className="flex justify-between">
                    <span className="font-medium group-hover:text-gradient transition-all duration-300">{skill.name}</span>
                    <span className="text-primary font-mono font-semibold">{animatedValues[key] || 0}%</span>
                  </div>
                  <Progress 
                    value={animatedValues[key] || 0} 
                    className={`h-2 transition-all duration-700 ease-out ${isAnimating[key] ? 'shadow-[0_0_10px_hsl(var(--primary)/0.5)]' : ''}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Personal Philosophy */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gradient glow-text">My Philosophy</h2>
          <blockquote className="text-xl text-muted-foreground leading-relaxed p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30">
            "Every frame tells a story, every edit shapes emotion, and every design communicates meaning. 
            At 18, I've learned that age doesn't define capability—passion, dedication, and continuous 
            learning do. I believe in creating visuals that don't just look good, but feel authentic 
            and resonate with audiences on a deeper level."
          </blockquote>
          <div className="mt-8 text-gradient font-semibold text-xl">— JEEM</div>
        </div>
      </section>
    </div>
  );
};

export default About;

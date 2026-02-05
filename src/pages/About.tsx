import { Calendar, GraduationCap, Award, Target, Zap, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" });

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

  // Animate skill bars when in view
  useEffect(() => {
    if (!skillsInView) return;
    
    skills.forEach((skill, index) => {
      const key = `skill-${skill.name}`;
      setTimeout(() => {
        let startTime: number;
        const duration = 1500;
        
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          
          setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(eased * skill.level) }));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }, index * 100);
    });
  }, [skillsInView]);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute w-[400px] h-[400px] -top-40 -left-40 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute w-[250px] h-[250px] bottom-0 right-0 rounded-full bg-accent/15 blur-[100px]" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-hero">
                <span className="text-foreground">About</span>{" "}
                <span className="text-gradient">JEEM</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                At just 18 years old, I've dedicated nearly half my life to mastering the art of visual storytelling. What started as curiosity has evolved into a passionate career spanning video editing, cinematography, and graphic design.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Currently pursuing a BSc in Computer Science and Engineering, I blend technical expertise with creative vision to deliver exceptional results.
              </p>
            </motion.div>

            <motion.div 
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                
                <img
                  src="https://i.postimg.cc/5N3cH1XN/IMG-3305.jpg"
                  alt="JEEM - Creative Professional"
                  className="relative w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-3xl border border-primary/20 shadow-2xl"
                />
                
                <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-card/90 backdrop-blur-xl border border-primary/30 rounded-full shadow-lg">
                  <span className="text-sm font-mono text-primary">8+ Years Experience</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education & Background */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-card/30" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Education &</span>{" "}
              <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground">A timeline of growth and learning</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="card-glass group border-l-4 border-l-primary h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-4">
                    <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </span>
                    <span>Current Education</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold mb-3">BSc in Computer Science and Engineering</h3>
                  <p className="text-muted-foreground mb-4">Currently pursuing degree</p>
                  <p className="text-sm text-muted-foreground">
                    Combining technical knowledge with creative skills to bridge the gap between 
                    technology and artistry in digital media production.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="card-glass group border-l-4 border-l-accent h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-4">
                    <span className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                      <Calendar className="w-6 h-6 text-accent" />
                    </span>
                    <span>Creative Journey</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold mb-3">Started at Age 10</h3>
                  <p className="text-muted-foreground mb-4">8+ years of continuous growth</p>
                  <p className="text-sm text-muted-foreground">
                    Beginning with simple photo edits and evolving into comprehensive video 
                    production, cinematography, and visual design expertise.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Professional</span>{" "}
              <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-xl text-muted-foreground">Growing expertise across creative fields</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-glass group hover:border-primary/30 transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <exp.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                    <p className="text-2xl font-bold text-primary font-mono mb-4">{exp.years}</p>
                    <p className="text-muted-foreground text-sm mb-6">{exp.description}</p>
                    <Progress value={exp.progress} className="h-1.5" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-card/30" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Technical</span>{" "}
              <span className="text-gradient">Skills</span>
            </h2>
            <p className="text-xl text-muted-foreground">Software and creative competencies</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => {
              const key = `skill-${skill.name}`;
              const animatedValue = animatedValues[key] || 0;
              
              return (
                <motion.div
                  key={skill.name}
                  className="p-6 card-glass rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-primary font-mono font-bold">{animatedValue}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                      style={{ width: `${animatedValue}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Quote className="w-16 h-16 text-primary/30 mx-auto mb-8" />
          <blockquote className="text-3xl lg:text-4xl font-bold leading-relaxed mb-8">
            <span className="text-foreground">"Every frame tells a story. My job is to make sure it's a </span>
            <span className="text-gradient">story worth telling.</span>
            <span className="text-foreground">"</span>
          </blockquote>
          <p className="text-xl text-muted-foreground">— JEEM</p>
        </motion.div>
      </section>
    </div>
  );
};

export default About;

import { ArrowRight, Play, Camera, Video, Palette, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  const skills = [
    { icon: Video, name: "Video Editing", years: "8 Years", description: "Expert in Adobe Premiere Pro, After Effects" },
    { icon: Palette, name: "Graphic Design", years: "7 Years", description: "Photoshop, Visual Identity, Branding" },
    { icon: Camera, name: "Cinematography", years: "5 Years", description: "Visual Storytelling, Camera Work" },
    { icon: Zap, name: "Motion Graphics", years: "6 Years", description: "Alight Motion, CapCut, Animations" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Video Editor • Motion Designer • Cinematographer</p>
              <h1 className="text-hero">
                Crafting Visual Stories That Matter
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm <span className="text-primary font-medium">JEEM</span>, an 18-year-old passionate video editor 
                and cinematographer. Turning ideas into captivating visual experiences since 2018.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="btn-glow">
                <Link to="/portfolio">
                  Get Started Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border hover:bg-secondary">
                <Link to="/about">
                  Book a Demo
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              {[
                { value: '50+', label: 'Projects' },
                { value: '8', label: 'Years Experience' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-foreground font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl" />
              <img
                src="https://i.postimg.cc/L5rqzSJ5/IMG-3305.jpg"
                alt="JEEM - Video Editor & Cinematographer"
                className="relative w-72 h-72 lg:w-80 lg:h-80 object-cover rounded-full border border-border float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Card - Journey */}
            <Card className="card-glass card-accent card-hover p-6">
              <h3 className="text-xl font-semibold mb-2">A Creative Journey</h3>
              <h4 className="text-lg font-medium mb-4">From Hobby to Passion</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I started video editing and graphic design in 2018 as a hobby for my own YouTube channel. 
                What began as simple edits gradually evolved into a deep passion that now defines my creative identity. 
                Over the years, I've developed skills in filmmaking, cinematography, and motion design.
              </p>
            </Card>

            {/* Right Card - Enterprise */}
            <Card className="card-glass card-hover p-6">
              <h3 className="text-xl font-semibold mb-4">Enterprise Insights</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Automate everything from workflow optimization to real-time sentiment analysis and market monitoring.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['Web Business', 'E-commerce Brands', 'SAAS Startup\'s', 'Tech Innovators', 'Marketing Agencies', 'Creative Studios'].map((item) => (
                  <div key={item} className="flex items-center justify-between p-2 rounded bg-secondary/30 text-sm">
                    <span className="text-muted-foreground">{item}</span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Expertise & Skills</h2>
            <p className="text-muted-foreground">
              Years of dedicated practice have honed my abilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <Card key={skill.name} className="card-glass card-hover p-5 text-center group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <skill.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{skill.name}</h3>
                <div className="text-primary font-mono text-sm mb-2">{skill.years}</div>
                <p className="text-xs text-muted-foreground">{skill.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-muted-foreground mb-8">
            Let's collaborate to bring your vision to life with professional video editing, 
            cinematography, and visual design.
          </p>
          <Button asChild size="lg" className="btn-glow">
            <Link to="/contact">
              Get In Touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;

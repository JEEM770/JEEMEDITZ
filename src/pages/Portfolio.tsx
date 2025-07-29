import { useState } from 'react';
import { ExternalLink, Play, Calendar, Eye, FolderOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'video', name: 'Video Editing' },
    { id: 'cinema', name: 'Cinematography' },
    { id: 'design', name: 'Graphic Design' },
    { id: 'motion', name: 'Motion Graphics' }
  ];

  const projects = [
    {
      id: 1,
      title: "Cinematic Short Film",
      category: 'cinema',
      type: "Cinematography & Editing",
      description: "A compelling narrative showcasing advanced camera work, color grading, and post-production techniques.",
      duration: "3:45",
      year: "2024",
      thumbnail: "https://i.postimg.cc/XvXK370G/retouch-2025072610485081.jpg",
      driveLink: "https://www.facebook.com/share/v/16WP8v61Wq/?mibextid=wwXIfr",
      tags: ["Cinematography", "Color Grading", "Storytelling"],
      views: "2.5K"
    },
    {
      id: 2,
      title: "YouTube thumbnails",
      category: 'design',
      type: "Graphic Design",
      description: "Complete visual identity design including logo, color palette, and brand guidelines.",
      year: "2024",
      thumbnail: "https://i.postimg.cc/9fHXXDGr/Untitled21-20241226182119.jpg",
      driveLink: "https://i.postimg.cc/9fHXXDGr/Untitled21-20241226182119.jpg",
      tags: ["Branding", "Logo Design", "Visual Identity"],
      views: "1.8K"
    },
    {
      id: 3,
      title: "Promotional Ads",
      category: 'video',
      type: "Video Editing",
      description: "Dynamic music video with synchronized editing, effects, and creative transitions.",
      duration: "4:12",
      year: "2024",
      thumbnail: "https://img.youtube.com/vi/5HxqRI2_Vnk/maxresdefault.jpg",
      youtubeId: "5HxqRI2_Vnk",
      tags: ["Music Video", "Sync Editing", "Effects"],
      views: "5.2K"
    },
    {
      id: 4,
      title: "Motion Graphics Reel",
      category: 'motion',
      type: "Motion Graphics",
      description: "Showcase of animated graphics, text animations, and visual effects created in After Effects.",
      duration: "2:30",
      year: "2024",
      thumbnail: "https://img.youtube.com/vi/9fwTRlPbitc/maxresdefault.jpg",
      youtubeId: "9fwTRlPbitc",
      tags: ["After Effects", "Animation", "Typography"],
      views: "3.1K"
    },
    {
      id: 5,
      title: "Documentary Style Edit",
      category: 'video',
      type: "Documentary Editing",
      description: "Professional documentary-style editing with interviews, b-roll, and narrative structure.",
      duration: "8:45",
      year: "2023",
      thumbnail: "https://img.youtube.com/vi/WmRhC3ufoN4/maxresdefault.jpg",
      youtubeId: "WmRhC3ufoN4",
      tags: ["Documentary", "Interview", "B-Roll"],
      views: "4.7K"
    },
    {
      id: 6,
      title: "product manipulation",
      category: 'design',
      type: "Presentation Design",
      description: "Professional presentation design with custom graphics and cohesive visual theme.",
      year: "2023",
      thumbnail: "https://i.postimg.cc/CM2RTL6f/IMG-2834.jpg",
      driveLink: "https://i.postimg.cc/CM2RTL6f/IMG-2834.jpg",
      tags: ["Presentation", "Corporate", "Graphics"],
      views: "900"
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Creative <span className="text-primary">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my work across video editing, cinematography, graphic design, and motion graphics. 
            Each project represents a unique story and creative challenge.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`transition-cinematic ${
                  selectedCategory === category.id ? 'gold-glow' : ''
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="card-gradient card-shadow transition-cinematic hover:scale-105 hover:gold-glow overflow-hidden">
                <div className="relative group">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                    {project.youtubeId ? (
                      <Button
                        size="sm"
                        className="gold-glow"
                        onClick={() => window.open(`https://youtube.com/watch?v=${project.youtubeId}`, '_blank')}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="gold-glow"
                        onClick={() => window.open(project.driveLink, '_blank')}
                      >
                        <FolderOpen className="w-4 h-4 mr-2" />
                        View Files
                      </Button>
                    )}
                  </div>
                  {project.duration && (
                    <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                      {project.duration}
                    </Badge>
                  )}
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge variant="outline">{project.type}</Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{project.views}</span>
                      </div>
                    </div>
                    {project.youtubeId ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(`https://youtube.com/watch?v=${project.youtubeId}`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(project.driveLink, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Follow My Work
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Stay connected and explore my content across different platforms.
          </p>
          
          {/* YouTube Button */}
          <div className="mb-8">
            <Button 
              size="lg" 
              className="gold-glow transition-cinematic hover:scale-105 mb-4"
              onClick={() => window.open("https://youtube.com/@jeem_editz?si=QiEFHzk4CCxMzgcU", '_blank')}
            >
              <Play className="w-5 h-5 mr-2" />
              Visit YouTube Channel
            </Button>
          </div>

          {/* TikTok Button */}
          <div className="mb-8">
            <Button 
              size="lg" 
              variant="outline"
              className="transition-cinematic hover:scale-105 hover:gold-glow mb-4"
              onClick={() => window.open("https://tiktok.com/@jeem_editz", '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Follow on TikTok
            </Button>
          </div>

          {/* Facebook Pages */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Facebook Pages</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                variant="outline"
                className="transition-cinematic hover:scale-105 hover:gold-glow"
                onClick={() => window.open("https://facebook.com/jeem.editz.page1", '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                JEEM Editz Main
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="transition-cinematic hover:scale-105 hover:gold-glow"
                onClick={() => window.open("https://facebook.com/jeem.editz.page2", '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                JEEM Creatives
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="transition-cinematic hover:scale-105 hover:gold-glow"
                onClick={() => window.open("https://facebook.com/jeem.editz.page3", '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                JEEM Studios
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
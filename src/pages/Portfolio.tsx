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
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      youtubeId: "dQw4w9WgXcQ",
      tags: ["Cinematography", "Color Grading", "Storytelling"],
      views: "2.5K"
    },
    {
      id: 2,
      title: "Brand Identity Package",
      category: 'design',
      type: "Graphic Design",
      description: "Complete visual identity design including logo, color palette, and brand guidelines.",
      year: "2024",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      driveLink: "https://drive.google.com/drive/folders/example",
      tags: ["Branding", "Logo Design", "Visual Identity"],
      views: "1.8K"
    },
    {
      id: 3,
      title: "Music Video Production",
      category: 'video',
      type: "Video Editing",
      description: "Dynamic music video with synchronized editing, effects, and creative transitions.",
      duration: "4:12",
      year: "2024",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      youtubeId: "dQw4w9WgXcQ",
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
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      youtubeId: "dQw4w9WgXcQ",
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
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      youtubeId: "dQw4w9WgXcQ",
      tags: ["Documentary", "Interview", "B-Roll"],
      views: "4.7K"
    },
    {
      id: 6,
      title: "Corporate Presentation",
      category: 'design',
      type: "Presentation Design",
      description: "Professional presentation design with custom graphics and cohesive visual theme.",
      year: "2023",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      driveLink: "https://drive.google.com/drive/folders/example",
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

      {/* YouTube Channel CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Explore More on YouTube
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Visit my YouTube channel for more videos, tutorials, and behind-the-scenes content.
          </p>
          <Button size="lg" className="gold-glow transition-cinematic hover:scale-105">
            <Play className="w-5 h-5 mr-2" />
            Visit YouTube Channel
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
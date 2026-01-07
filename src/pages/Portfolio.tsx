import { useState, useRef } from 'react';
import { ExternalLink, Play, Calendar, Eye, FolderOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Instagram Icon Component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// Reel Card Component with video hover
const ReelCard = ({ reel }: { reel: { id: number; thumbnail: string; videoUrl: string; views: string; platform: string; link: string } }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[9/16] bg-muted transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 flex-shrink-0 w-48 sm:w-56 lg:w-64"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(reel.link, '_blank')}
    >
      <img
        src={reel.thumbnail}
        alt={`Reel ${reel.id}`}
        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}
      />
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center justify-between text-white text-sm">
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{reel.views}</span>
          </div>
          {reel.platform === 'tiktok' && <TikTokIcon className="w-4 h-4" />}
          {reel.platform === 'youtube' && <Play className="w-4 h-4" />}
          {reel.platform === 'instagram' && <InstagramIcon className="w-4 h-4" />}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center gold-glow">
          <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        scrollCarousel('right');
      } else {
        scrollCarousel('left');
      }
    }
  };

  const reels = [
    { id: 1, thumbnail: "https://img.youtube.com/vi/5HxqRI2_Vnk/maxresdefault.jpg", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", views: "12.5K", platform: "tiktok", link: "https://www.tiktok.com/@jeemeditz_" },
    { id: 2, thumbnail: "https://img.youtube.com/vi/9fwTRlPbitc/maxresdefault.jpg", videoUrl: "https://www.w3schools.com/html/movie.mp4", views: "8.2K", platform: "instagram", link: "https://www.instagram.com/jeemeditz_" },
    { id: 3, thumbnail: "https://img.youtube.com/vi/WmRhC3ufoN4/maxresdefault.jpg", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", views: "15.1K", platform: "tiktok", link: "https://www.tiktok.com/@jeemeditz_" },
    { id: 4, thumbnail: "https://i.postimg.cc/XvXK370G/retouch-2025072610485081.jpg", videoUrl: "https://www.w3schools.com/html/movie.mp4", views: "6.7K", platform: "youtube", link: "https://youtube.com/@jeem_editz" },
    { id: 5, thumbnail: "https://i.postimg.cc/CM2RTL6f/IMG-2834.jpg", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", views: "9.3K", platform: "tiktok", link: "https://www.tiktok.com/@jeemeditz_" },
    { id: 6, thumbnail: "https://i.postimg.cc/9fHXXDGr/Untitled21-20241226182119.jpg", videoUrl: "https://www.w3schools.com/html/movie.mp4", views: "11.2K", platform: "instagram", link: "https://www.instagram.com/jeemeditz_" },
    { id: 7, thumbnail: "https://img.youtube.com/vi/5HxqRI2_Vnk/maxresdefault.jpg", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", views: "7.8K", platform: "tiktok", link: "https://www.tiktok.com/@jeemeditz_" },
  ];

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

      {/* Reels Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured <span className="text-primary">Reels</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick edits, cinematic moments, and creative snippets from my short-form content.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative group/carousel">
            {/* Left Arrow */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm border-primary/30 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-primary/20 -translate-x-4"
              onClick={() => scrollCarousel('left')}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Carousel */}
            <div 
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 snap-x snap-mandatory scroll-smooth touch-pan-x"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {reels.map((reel) => (
                <div key={reel.id} className="snap-start">
                  <ReelCard reel={reel} />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm border-primary/30 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-primary/20 translate-x-4"
              onClick={() => scrollCarousel('right')}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              onClick={() => window.open("https://www.tiktok.com/@jeemeditz_?is_from_webapp=1&sender_device=pc", '_blank')}
            >
              <TikTokIcon className="w-4 h-4 mr-2" />
              View All Reels
            </Button>
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
          
          {/* All Social Media Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="h-12 px-6 gold-glow transition-cinematic hover:scale-105 flex items-center justify-center"
              onClick={() => window.open("https://youtube.com/@jeem_editz?si=QiEFHzk4CCxMzgcU", '_blank')}
            >
              <Play className="w-4 h-4 mr-2 drop-shadow-[0_0_8px_#FF0000] text-red-500" />
              <span className="leading-none">Visit YouTube Channel</span>
            </Button>

            <Button 
              variant="outline"
              size="lg" 
              className="h-12 px-6 bg-background/50 border-muted hover:bg-accent/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/30 flex items-center justify-center"
              onClick={() => window.open("https://www.tiktok.com/@jeemeditz_?is_from_webapp=1&sender_device=pc", '_blank')}
            >
              <TikTokIcon className="w-4 h-4 mr-2 drop-shadow-[0_0_8px_#FF0050] text-pink-500" />
              <span className="leading-none">JEEM EDITZ</span>
            </Button>

            <Button 
              variant="outline"
              size="lg"
              className="h-12 px-6 bg-background/50 border-muted hover:bg-accent/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/30 flex items-center justify-center"
              onClick={() => window.open("https://www.facebook.com/share/179wDk6kDw/?mibextid=wwXIfr", '_blank')}
            >
              <Facebook className="w-4 h-4 mr-2 drop-shadow-[0_0_8px_#1877F2] text-blue-500" />
              <span className="leading-none">JEEMATIC</span>
            </Button>

            <Button 
              variant="outline"
              size="lg"
              className="h-12 px-6 bg-background/50 border-muted hover:bg-accent/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/30 flex items-center justify-center"
              onClick={() => window.open("https://www.facebook.com/share/1GEewXiCfm/?mibextid=wwXIfr", '_blank')}
            >
              <Facebook className="w-4 h-4 mr-2 drop-shadow-[0_0_8px_#1877F2] text-blue-500" />
              <span className="leading-none">JEEM EDITZ</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
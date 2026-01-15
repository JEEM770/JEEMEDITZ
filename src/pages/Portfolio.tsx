import { useState, useRef } from 'react';
import { ExternalLink, Play, Calendar, Eye, FolderOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlowButton } from '@/components/ui/glow-button';
import { Badge } from '@/components/ui/badge';
import ReelsViewer from '@/components/ReelsViewer';
import { motion, AnimatePresence } from 'framer-motion';
import { CursorSpotlight } from '@/components/ui/cursor-spotlight';
import { AnimatedText } from '@/components/ui/animated-text';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Instagram Icon Component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// Reel Card Component
const ReelCard = ({ reel, onPlay, index }: { reel: { id: number; thumbnail: string; videoUrl: string; views: string; platform: string; link: string }; onPlay: () => void; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
  >
    <div
      role="button"
      tabIndex={0}
      aria-label={`Play reel ${reel.id}`}
      onClick={onPlay}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(); } }}
      className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[9/16] bg-muted flex-shrink-0 w-48 sm:w-56 lg:w-64 border border-border transition-all duration-500 ease-out hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_20px_40px_hsl(0_0%_0%/0.3),0_0_30px_hsl(var(--primary)/0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <img src={reel.thumbnail} alt={`Reel thumbnail ${reel.id}`} className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <div className="flex items-center justify-between text-foreground text-sm">
          <div className="flex items-center gap-2 font-mono"><Eye className="w-4 h-4" /><span>{reel.views}</span></div>
          {reel.platform === 'tiktok' && <TikTokIcon className="w-5 h-5" />}
          {reel.platform === 'youtube' && <Play className="w-5 h-5" />}
          {reel.platform === 'instagram' && <InstagramIcon className="w-5 h-5" />}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_30px_hsl(var(--primary)/0.5)]">
          <Play className="w-7 h-7 text-primary-foreground ml-1" />
        </div>
      </div>
    </div>
  </motion.div>
);

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [reelsViewerOpen, setReelsViewerOpen] = useState(false);
  const [selectedReelIndex, setSelectedReelIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) scrollCarousel(diff > 0 ? 'right' : 'left');
  };

  const reels = [
    { id: 1, thumbnail: "https://img.youtube.com/vi/kHEgGTLowZg/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/kHEgGTLowZg", views: "12.5K", platform: "youtube", link: "https://youtube.com/shorts/kHEgGTLowZg" },
    { id: 2, thumbnail: "https://img.youtube.com/vi/y_8dkV-UGpU/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/y_8dkV-UGpU", views: "8.2K", platform: "youtube", link: "https://youtube.com/shorts/y_8dkV-UGpU" },
    { id: 3, thumbnail: "https://img.youtube.com/vi/bR9pB_uIwgw/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/bR9pB_uIwgw", views: "15.1K", platform: "youtube", link: "https://youtube.com/shorts/bR9pB_uIwgw" },
    { id: 4, thumbnail: "https://img.youtube.com/vi/ukcBZcfb7kg/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/ukcBZcfb7kg", views: "6.7K", platform: "youtube", link: "https://youtube.com/shorts/ukcBZcfb7kg" },
    { id: 5, thumbnail: "https://img.youtube.com/vi/Aw1wGTbwk9Q/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/Aw1wGTbwk9Q", views: "9.3K", platform: "youtube", link: "https://youtube.com/shorts/Aw1wGTbwk9Q" },
    { id: 6, thumbnail: "https://img.youtube.com/vi/zLbw7JxGrhA/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/zLbw7JxGrhA", views: "11.2K", platform: "youtube", link: "https://youtube.com/shorts/zLbw7JxGrhA" },
    { id: 7, thumbnail: "https://img.youtube.com/vi/OVqM4TEzFP0/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/OVqM4TEzFP0", views: "7.8K", platform: "youtube", link: "https://youtube.com/shorts/OVqM4TEzFP0" },
    { id: 8, thumbnail: "https://img.youtube.com/vi/StML8oP_K-U/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/StML8oP_K-U", views: "5.4K", platform: "youtube", link: "https://youtube.com/shorts/StML8oP_K-U" },
    { id: 9, thumbnail: "https://img.youtube.com/vi/14Mnc7i0Ktk/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/14Mnc7i0Ktk", views: "10.1K", platform: "youtube", link: "https://youtube.com/shorts/14Mnc7i0Ktk" },
    { id: 10, thumbnail: "https://img.youtube.com/vi/1Y60L3QECgQ/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/1Y60L3QECgQ", views: "8.9K", platform: "youtube", link: "https://youtube.com/shorts/1Y60L3QECgQ" },
    { id: 11, thumbnail: "https://img.youtube.com/vi/MKsiYm5TA9g/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/MKsiYm5TA9g", views: "6.3K", platform: "youtube", link: "https://youtube.com/shorts/MKsiYm5TA9g" },
    { id: 12, thumbnail: "https://img.youtube.com/vi/Mwh1l5MHONM/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/Mwh1l5MHONM", views: "9.7K", platform: "youtube", link: "https://youtube.com/shorts/Mwh1l5MHONM" },
    { id: 13, thumbnail: "https://img.youtube.com/vi/EElW9wBtseY/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/EElW9wBtseY", views: "5.0K", platform: "youtube", link: "https://youtube.com/shorts/EElW9wBtseY" }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'video', name: 'Video Editing' },
    { id: 'cinema', name: 'Cinematography' },
    { id: 'design', name: 'Graphic Design' },
    { id: 'motion', name: 'Motion Graphics' }
  ];

  const projects = [
    { id: 1, title: "Cinematic Short Film", category: 'cinema', type: "Cinematography & Editing", description: "A compelling narrative showcasing advanced camera work, color grading, and post-production techniques.", duration: "3:45", year: "2024", thumbnail: "https://i.postimg.cc/XvXK370G/retouch-2025072610485081.jpg", driveLink: "https://www.facebook.com/share/v/16WP8v61Wq/?mibextid=wwXIfr", tags: ["Cinematography", "Color Grading", "Storytelling"], views: "2.5K" },
    { id: 2, title: "YouTube thumbnails", category: 'design', type: "Graphic Design", description: "Complete visual identity design including logo, color palette, and brand guidelines.", year: "2024", thumbnail: "https://i.postimg.cc/9fHXXDGr/Untitled21-20241226182119.jpg", driveLink: "https://i.postimg.cc/9fHXXDGr/Untitled21-20241226182119.jpg", tags: ["Branding", "Logo Design", "Visual Identity"], views: "1.8K" },
    { id: 3, title: "Promotional Ads", category: 'video', type: "Video Editing", description: "Dynamic music video with synchronized editing, effects, and creative transitions.", duration: "4:12", year: "2024", thumbnail: "https://img.youtube.com/vi/5HxqRI2_Vnk/maxresdefault.jpg", youtubeId: "5HxqRI2_Vnk", tags: ["Music Video", "Sync Editing", "Effects"], views: "5.2K" },
    { id: 4, title: "Motion Graphics Reel", category: 'motion', type: "Motion Graphics", description: "Showcase of animated graphics, text animations, and visual effects created in After Effects.", duration: "2:30", year: "2024", thumbnail: "https://img.youtube.com/vi/9fwTRlPbitc/maxresdefault.jpg", youtubeId: "9fwTRlPbitc", tags: ["After Effects", "Animation", "Typography"], views: "3.1K" },
    { id: 5, title: "Documentary Style Edit", category: 'video', type: "Documentary Editing", description: "Professional documentary-style editing with interviews, b-roll, and narrative structure.", duration: "8:45", year: "2023", thumbnail: "https://img.youtube.com/vi/WmRhC3ufoN4/maxresdefault.jpg", youtubeId: "WmRhC3ufoN4", tags: ["Documentary", "Interview", "B-Roll"], views: "4.7K" },
    { id: 6, title: "product manipulation", category: 'design', type: "Presentation Design", description: "Professional presentation design with custom graphics and cohesive visual theme.", year: "2023", thumbnail: "https://i.postimg.cc/CM2RTL6f/IMG-2834.jpg", driveLink: "https://i.postimg.cc/CM2RTL6f/IMG-2834.jpg", tags: ["Presentation", "Corporate", "Graphics"], views: "900" }
  ];

  const filteredProjects = selectedCategory === 'all' ? projects : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <CursorSpotlight
        spotlightSize={600}
        spotlightOpacity={0.12}
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <motion.div 
          className="orb orb-primary w-[400px] h-[400px] -top-20 -left-20 opacity-50"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="orb orb-accent w-[300px] h-[300px] bottom-0 right-0 opacity-40"
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <motion.div 
          className="relative max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-hero">
            <AnimatedText text="My" className="text-foreground" animation="blur" delay={0.1} />
            {" "}
            <AnimatedText text="Portfolio" className="text-gradient" animation="blur" delay={0.3} />
          </h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Explore my creative journey through video editing, cinematography, and visual design projects.
          </motion.p>
        </motion.div>
      </CursorSpotlight>

      {/* Reels Section */}
      <CursorSpotlight
        spotlightSize={700}
        spotlightOpacity={0.1}
        className="py-24 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="absolute inset-0 bg-card/30" />
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Featured</span>{" "}
              <span className="text-gradient">Reels</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick edits, cinematic moments, and creative snippets from my short-form content.
            </p>
          </motion.div>
          
          <div className="relative group/carousel">
            <GlowButton 
              variant="outline" 
              size="icon" 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 -translate-x-4 w-12 h-12" 
              onClick={() => scrollCarousel('left')}
            >
              <ChevronLeft className="w-6 h-6" />
            </GlowButton>
            
            <div 
              ref={carouselRef} 
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 snap-x snap-mandatory scroll-smooth touch-pan-x" 
              onTouchStart={handleTouchStart} 
              onTouchMove={handleTouchMove} 
              onTouchEnd={handleTouchEnd}
            >
              {reels.map((reel, index) => (
                <div key={reel.id} className="snap-start">
                  <ReelCard reel={reel} index={index} onPlay={() => { setSelectedReelIndex(index); setReelsViewerOpen(true); }} />
                </div>
              ))}
            </div>
            
            <GlowButton 
              variant="outline" 
              size="icon" 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 translate-x-4 w-12 h-12" 
              onClick={() => scrollCarousel('right')}
            >
              <ChevronRight className="w-6 h-6" />
            </GlowButton>
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <GlowButton 
              variant="outline" 
              size="lg" 
              onClick={() => window.open("https://www.tiktok.com/@jeemeditz_?is_from_webapp=1&sender_device=pc", '_blank')} 
              className="group"
            >
              <TikTokIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              View All Reels
            </GlowButton>
          </motion.div>
        </div>
      </CursorSpotlight>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <GlowButton 
                  variant={selectedCategory === category.id ? "default" : "outline"} 
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </GlowButton>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <CursorSpotlight
        spotlightSize={600}
        spotlightOpacity={0.08}
        className="px-4 sm:px-6 lg:px-8 pb-24"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card className="card-glass overflow-hidden group h-full">
                    <div className="relative overflow-hidden">
                      <img src={project.thumbnail} alt={project.title} className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        {project.youtubeId ? (
                          <GlowButton size="sm" onClick={() => window.open(`https://youtube.com/watch?v=${project.youtubeId}`, '_blank')}>
                            <Play className="w-4 h-4 mr-2" />Watch
                          </GlowButton>
                        ) : (
                          <GlowButton size="sm" onClick={() => window.open(project.driveLink, '_blank')}>
                            <FolderOpen className="w-4 h-4 mr-2" />View Files
                          </GlowButton>
                        )}
                      </div>
                      {project.duration && (
                        <Badge className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm text-foreground border-0 font-mono">
                          {project.duration}
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg group-hover:text-gradient transition-all duration-300">{project.title}</CardTitle>
                        <Badge variant="outline" className="border-primary/30 text-primary shrink-0">{project.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-secondary/50">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-sm text-muted-foreground pt-4 border-t border-border">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="font-mono">{project.year}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-primary" />
                            <span className="font-mono">{project.views}</span>
                          </div>
                        </div>
                        <GlowButton 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => window.open(project.youtubeId ? `https://youtube.com/watch?v=${project.youtubeId}` : project.driveLink, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </GlowButton>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </CursorSpotlight>

      {/* Social Media CTA */}
      <CursorSpotlight
        spotlightSize={500}
        spotlightOpacity={0.1}
        className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <motion.div 
          className="orb orb-primary w-[300px] h-[300px] top-0 right-20 opacity-40"
          animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-grid opacity-10" />
        
        <motion.div 
          className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Follow</span>{" "}
            <span className="text-gradient">My Work</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Stay connected and explore my content across different platforms.
          </p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <GlowButton size="lg" onClick={() => window.open("https://youtube.com/@jeem_editz?si=QiEFHzk4CCxMzgcU", '_blank')}>
                <Play className="w-5 h-5 mr-2" />YouTube
              </GlowButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <GlowButton variant="outline" size="lg" onClick={() => window.open("https://www.tiktok.com/@jeemeditz_?is_from_webapp=1&sender_device=pc", '_blank')} className="group">
                <TikTokIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />TikTok
              </GlowButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <GlowButton variant="outline" size="lg" onClick={() => window.open("https://www.facebook.com/share/179wDk6kDw/?mibextid=wwXIfr", '_blank')} className="group">
                <Facebook className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />Facebook
              </GlowButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </CursorSpotlight>

      {/* Reels Viewer Modal */}
      <ReelsViewer 
        reels={reels} 
        initialIndex={selectedReelIndex} 
        isOpen={reelsViewerOpen} 
        onClose={() => setReelsViewerOpen(false)} 
      />
    </div>
  );
};

export default Portfolio;

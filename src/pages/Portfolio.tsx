import { useState, useRef } from 'react';
import { ExternalLink, Play, Calendar, Eye, FolderOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlowButton } from '@/components/ui/glow-button';
import { Badge } from '@/components/ui/badge';
import ReelsViewer from '@/components/ReelsViewer';
import { motion } from 'framer-motion';

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
const ReelCard = ({ reel, onPlay }: { reel: { id: number; thumbnail: string; videoUrl: string; views: string; platform: string; link: string }; onPlay: () => void }) => (
  <div
    role="button"
    tabIndex={0}
    aria-label={`Play reel ${reel.id}`}
    onClick={onPlay}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlay(); } }}
    className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[9/16] bg-muted flex-shrink-0 w-48 sm:w-56 lg:w-64 border border-border transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
  >
    <img src={reel.thumbnail} alt={`Reel thumbnail ${reel.id}`} className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 group-hover:scale-105" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      <div className="flex items-center justify-between text-foreground text-sm">
        <div className="flex items-center gap-2 font-mono"><Eye className="w-4 h-4" /><span>{reel.views}</span></div>
        {reel.platform === 'tiktok' && <TikTokIcon className="w-5 h-5" />}
        {reel.platform === 'youtube' && <Play className="w-5 h-5" />}
        {reel.platform === 'instagram' && <InstagramIcon className="w-5 h-5" />}
      </div>
    </div>
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
        <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
      </div>
    </div>
  </div>
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
    { id: 13, thumbnail: "https://img.youtube.com/vi/EElW9wBtseY/maxresdefault.jpg", videoUrl: "https://youtube.com/shorts/EElW9wBtseY", views: "5.0K", platform: "youtube", link: "https://youtube.com/shorts/EElW9wBtseY" },
    { id: 14, thumbnail: "https://img.youtube.com/vi/SzXwsBiivQw/hqdefault.jpg", videoUrl: "https://youtube.com/shorts/SzXwsBiivQw", views: "4.5K", platform: "youtube", link: "https://youtube.com/shorts/SzXwsBiivQw" }
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

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute w-[350px] h-[350px] -top-20 -left-20 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute w-[250px] h-[250px] bottom-0 right-0 rounded-full bg-accent/15 blur-[100px]" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <motion.div 
          className="relative max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-hero">
            <span className="text-foreground">My</span>{" "}
            <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-8">
            Explore my creative journey through video editing, cinematography, and visual design projects.
          </p>
        </motion.div>
      </section>

      {/* Motion Graphics Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Motion</span>{" "}
              <span className="text-gradient">Graphics</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Animated graphics, text animations, and visual effects crafted with precision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Motion Graphics #1", embedId: "DWLfjOPDQ1Y" },
              { title: "Motion Graphics #2", embedId: "DWI0BvijcPq" },
              { title: "Motion Graphics #3", embedId: "DSfV9x3Dz8h" },
              { title: "Motion Graphics #4", embedId: "DTeqvp_Di8s" },
              { title: "Motion Graphics #5", embedId: "DT_-c4NDOio" },
              { title: "Motion Graphics #6", embedId: "DUcJg_EDLCd" },
              { title: "Motion Graphics #7", embedId: "DUW2xReDF9u" },
              { title: "Motion Graphics #8", embedId: "DUWxPzEjCp5" },
              { title: "Motion Graphics #9", embedId: "DU4jSqfDHNQ" },
              { title: "Motion Graphics #10", embedId: "DU7NXODjNCU" },
              { title: "Motion Graphics #11", embedId: "DU-FWkUDVuy" },
            ].map((item, index) => (
              <motion.div
                key={item.embedId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-muted transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
                  <iframe
                    src={`https://www.instagram.com/reel/${item.embedId}/embed/`}
                    className="w-full h-full border-0"
                    title={item.title}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SaaS Motion Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-card/30" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">SaaS</span>{" "}
              <span className="text-gradient">Motion</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Engaging product animations and SaaS promotional videos that bring software to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "SaaS Demo #1", fileId: "PLACEHOLDER_ID_1" },
              { title: "SaaS Demo #2", fileId: "PLACEHOLDER_ID_2" },
              { title: "SaaS Demo #3", fileId: "PLACEHOLDER_ID_3" },
              { title: "SaaS Demo #4", fileId: "PLACEHOLDER_ID_4" },
              { title: "SaaS Demo #5", fileId: "PLACEHOLDER_ID_5" },
              { title: "SaaS Demo #6", fileId: "PLACEHOLDER_ID_6" },
            ].map((item, index) => (
              <motion.div
                key={item.fileId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-muted transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
                  <iframe
                    src={`https://drive.google.com/file/d/${item.fileId}/preview`}
                    className="w-full h-full border-0"
                    title={item.title}
                    allow="autoplay"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reels Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-card/30" />
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 -translate-x-4 w-12 h-12" 
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
                  <ReelCard reel={reel} onPlay={() => { setSelectedReelIndex(index); setReelsViewerOpen(true); }} />
                </div>
              ))}
            </div>
            
            <GlowButton 
              variant="outline" 
              size="icon" 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 translate-x-4 w-12 h-12" 
              onClick={() => scrollCarousel('right')}
            >
              <ChevronRight className="w-6 h-6" />
            </GlowButton>
          </div>
          
          <div className="text-center mt-12">
            <GlowButton 
              variant="outline" 
              size="lg" 
              onClick={() => window.open("https://www.tiktok.com/@jeemeditz_?is_from_webapp=1&sender_device=pc", '_blank')} 
              className="group"
            >
              <TikTokIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              View All Reels
            </GlowButton>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <GlowButton 
                key={category.id} 
                variant={selectedCategory === category.id ? "default" : "outline"} 
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </GlowButton>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="card-glass overflow-hidden group hover:border-primary/30 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img src={project.thumbnail} alt={project.title} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {project.youtubeId ? (
                        <GlowButton size="sm" onClick={() => window.open(`https://youtube.com/watch?v=${project.youtubeId}`, '_blank')}>
                          <Play className="w-4 h-4 mr-2" />
                          Watch
                        </GlowButton>
                      ) : project.driveLink ? (
                        <GlowButton size="sm" onClick={() => window.open(project.driveLink, '_blank')}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </GlowButton>
                      ) : null}
                    </div>
                    <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
                      {project.type}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{project.title}</span>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Eye className="w-4 h-4" />
                        <span className="font-mono">{project.views}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{project.year}</span>
                      </div>
                      {project.duration && (
                        <span className="font-mono">{project.duration}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        
        <motion.div 
          className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <FolderOpen className="w-16 h-16 text-primary/50 mx-auto mb-8" />
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Want to See</span>{" "}
            <span className="text-gradient">More?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            This is just a glimpse of my work. I have many more projects across different categories and styles.
          </p>
          <GlowButton size="lg" onClick={() => window.open("https://drive.google.com/drive/folders/1mNqLxKOJQgd0eNEQnqNaE2gJ7b8DvYnB?usp=sharing", '_blank')}>
            <FolderOpen className="w-5 h-5 mr-2" />
            View Full Portfolio
          </GlowButton>
        </motion.div>
      </section>

      {/* Reels Viewer Modal */}
      <ReelsViewer
        isOpen={reelsViewerOpen}
        onClose={() => setReelsViewerOpen(false)}
        reels={reels}
        initialIndex={selectedReelIndex}
      />
    </div>
  );
};

export default Portfolio;

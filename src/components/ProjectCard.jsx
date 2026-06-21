import  { useRef, useState } from 'react';
import { ExternalLink, Github, ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ProjectCard({ project, onOpenDetails }) {
  const { settings } = useTheme();
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!settings.animations || !cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Limit rotation to max 12 degrees
    const factor = 12;
    const rotateY = (x / (box.width / 2)) * factor;
    const rotateX = -(y / (box.height / 2)) * factor;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: settings.animations
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
          : 'none',
        transition: rotate.x === 0 && rotate.y === 0 ? 'transform 0.5s ease' : 'none',
      }}
      className="interactive-card glass-card overflow-hidden rounded-2xl border border-accent/15 bg-surface/40 hover:bg-surface/60 transition-all duration-300 flex flex-col h-full group"
    >
      {/* Project Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={project.image || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=600&auto=format&fit=crop&q=60"}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1625] via-[#1A1625]/20 to-transparent opacity-60" />
        
        {/* Category tag */}
        <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 font-outfit text-xs font-semibold uppercase tracking-wider text-white shadow-md">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h4 className="font-outfit text-xl font-bold text-white tracking-tight group-hover:text-accent transition-colors">
          {project.title}
        </h4>
        <p className="mt-2 text-sm text-textSecondary line-clamp-3 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags?.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="rounded bg-[#2E2442] border border-accent/10 px-2 py-0.5 font-sans text-xs text-textSecondary"
            >
              {tag}
            </span>
          ))}
          {project.tags?.length > 3 && (
            <span className="rounded bg-[#2E2442] border border-accent/10 px-2 py-0.5 font-sans text-xs text-accent">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between border-t border-accent/10 pt-4">
          <button
            onClick={() => onOpenDetails(project)}
            className="flex items-center gap-1.5 font-outfit text-xs font-semibold uppercase tracking-wider text-accent hover:text-white transition-colors"
          >
            <ZoomIn className="h-4 w-4" /> Details
          </button>
          
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-white transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-white transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

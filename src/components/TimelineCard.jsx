import 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { slideInLeft, slideInRight } from '../utils/animations';

export default function TimelineCard({ item, type = "experience", index }) {
  const { settings } = useTheme();
  
  const isLeft = index % 2 === 0;
  const animationVariant = settings.animations 
    ? (isLeft ? slideInLeft : slideInRight)
    : {};

  const icon = type === "experience" ? (
    <Briefcase className="h-5 w-5 text-white" />
  ) : (
    <GraduationCap className="h-5 w-5 text-white" />
  );

  return (
    <div className={`relative flex flex-col md:flex-row items-stretch md:justify-between mb-8 w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      {/* Spacer / Alternator */}
      <div className="hidden md:block w-[45%]" />

      {/* Center line badge */}
      <div className="absolute left-4 md:left-1/2 top-0 transform -translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary border-4 border-[#1A1625] shadow-lg">
        {icon}
      </div>

      {/* Card Content wrapper */}
      <motion.div
        variants={animationVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full md:w-[45%] pl-12 md:pl-0"
      >
        <div className="glass-card rounded-2xl p-6 border border-accent/15 bg-surface/30 hover:border-accent/30 hover:bg-surface/50 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <span className="font-outfit text-xs font-semibold text-accent uppercase tracking-wider flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {item.duration}
            </span>
            <span className="font-sans text-xs text-textSecondary flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {item.location}
            </span>
          </div>

          <h4 className="font-outfit text-xl font-bold text-white tracking-tight">
            {type === "experience" ? item.role : item.degree}
          </h4>
          <h5 className="font-outfit text-md font-semibold text-secondary mt-1">
            {type === "experience" ? item.company : item.institution}
          </h5>

          {item.grade && (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-accent/10 border border-accent/20 px-2.5 py-0.5 text-xs font-semibold text-accent">
              <Award className="h-3.5 w-3.5" /> {item.grade}
            </div>
          )}

          <p className="mt-4 text-sm text-textSecondary leading-relaxed">
            {item.description}
          </p>

          {item.skills && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs text-textSecondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

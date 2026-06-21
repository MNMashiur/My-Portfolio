import 'react';
import { motion } from 'framer-motion';

export default function SkillBar({ name, level, type = "linear" }) {
  
  if (type === "circular") {
    // SVG Dimensions for circular progress
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (level / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center p-4 glass-card rounded-2xl border border-accent/10 bg-surface/30">
        <div className="relative h-24 w-24">
          {/* Background circle */}
          <svg className="h-full w-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="fill-none stroke-[#2E2442] stroke-4"
            />
            {/* Animated filled circle */}
            <motion.circle
              cx="48"
              cy="48"
              r={radius}
              className="fill-none stroke-accent stroke-4"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: offset }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </svg>
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-outfit text-sm font-bold text-white">{level}%</span>
          </div>
        </div>
        <span className="mt-3 font-outfit text-sm font-semibold text-textPrimary tracking-tight text-center">{name}</span>
      </div>
    );
  }

  // Linear Progress Bar
  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-outfit text-sm font-semibold text-textPrimary">{name}</span>
        <span className="font-outfit text-xs font-semibold text-accent">{level}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-[#2E2442] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
        />
      </div>
    </div>
  );
}

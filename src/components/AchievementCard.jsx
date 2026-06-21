import { Trophy, Award, GitBranch, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  Trophy,
  Award,
  GitBranch,
  Star,
  Zap
};

export default function AchievementCard({ achievement }) {
  const IconComponent = iconMap[achievement.icon] || Award;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="glass-card flex items-start gap-4 rounded-2xl p-5 border border-accent/15 bg-surface/30 hover:border-accent/30 hover:bg-surface/50"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary/30 to-accent/30 text-accent">
        <IconComponent className="h-6 w-6 text-glow" />
      </div>
      <div>
        <span className="font-outfit text-[10px] font-semibold text-accent uppercase tracking-wider bg-accent/10 px-2 py-0.5 rounded-full">
          {achievement.date}
        </span>
        <h4 className="font-outfit text-md font-bold text-white tracking-tight mt-2">
          {achievement.title}
        </h4>
        <p className="mt-1 text-xs text-textSecondary leading-relaxed">
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
}

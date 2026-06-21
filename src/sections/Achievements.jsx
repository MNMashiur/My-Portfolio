import SectionTitle from '../components/SectionTitle';
import AchievementCard from '../components/AchievementCard';
import { achievementsData } from '../data/achievements';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';

export default function Achievements() {
  const { settings } = useTheme();

  return (
    <section id="achievements" className="relative bg-[#1A1625] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Key Achievements" subtitle="My Milestones" />

        <motion.div
          variants={settings.animations ? staggerContainer : {}}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievementsData.map((ach) => (
            <motion.div key={ach.id} variants={fadeInUp}>
              <AchievementCard achievement={ach} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

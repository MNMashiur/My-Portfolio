import SectionTitle from '../components/SectionTitle';
import TimelineCard from '../components/TimelineCard';
import { educationData } from '../data/education';
import { motion } from 'framer-motion';

export default function Education() {
  return (
    <section id="education" className="relative bg-[#1A1625] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Education Timeline" subtitle="My Learning" />

        <div className="relative mt-12 w-full flex flex-col items-center">
          {/* Animated Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent origin-top"
          />

          {educationData.map((edu, idx) => (
            <TimelineCard
              key={edu.id}
              item={edu}
              type="education"
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

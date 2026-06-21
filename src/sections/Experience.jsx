import  { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import TimelineCard from '../components/TimelineCard';
import { initialExperience } from '../data/experience';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';


export default function Experience() {
  
  const [experiences] = useState(initialExperience);

  return (
    <section id="experience" className="relative bg-[#1A1625] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Work Experience" subtitle="My Journey" />

        {experiences.length === 0 ? (
          <div className="glass-card max-w-lg mx-auto rounded-2xl p-8 text-center border border-accent/15 bg-surface/30">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-accent mb-4">
              <Briefcase className="h-6 w-6 animate-bounce" />
            </div>
            <h4 className="font-outfit text-lg font-bold text-white mb-2">No Experience Logged Yet</h4>
            <p className="text-xs text-textSecondary leading-relaxed">
              I am currently looking for Software Engineering, Front-End, or SQA internship roles. Contact me below to start a discussion!
            </p>
          </div>
        ) : (
          <div className="relative mt-12 w-full flex flex-col items-center">
            {/* Animated Vertical Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent origin-top"
            />

            {experiences.map((exp, idx) => (
              <TimelineCard
                key={exp.id}
                item={exp}
                type="experience"
                index={idx}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

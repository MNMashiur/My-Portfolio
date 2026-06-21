import SectionTitle from '../components/SectionTitle';
import SkillBar from '../components/SkillBar';
import { skillsData } from '../data/skills';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';

export default function Skills() {
  const { settings } = useTheme();

  // Grouping skills for display
  const webSkills = skillsData.filter(
    (s) => s.category === 'Frontend' || s.category === 'Backend'
  );

  const androidSkills = skillsData.filter(
    (s) => s.category === 'Mobile'
  );

  const sqaSkills = skillsData.filter(
    (s) => s.category === 'Testing'
  );

  const aiSkills = skillsData.filter(
    (s) => s.category === 'AI'
  );

  const designSkills = skillsData.filter(
    (s) => s.category === 'Design'
  );

  const circularSkills = skillsData
    .filter((s) => s.category === 'Database' || s.category === 'Tools'  ||
      s.category === 'Design')
    .slice(0, 8);

  return (
    <section id="skills" className="relative bg-[#1A1625] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Skills & expertise" subtitle="My Toolkit" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side Skills */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Stack */}
            <div className="flex flex-col gap-8 w-full">
              {/* Web Dev */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card h-fit w-full rounded-2xl p-6 border border-accent/15 bg-surface/30"
              >
                <h3 className="font-outfit text-lg font-bold text-white tracking-tight border-b border-accent/10 pb-2 mb-4">
                  Web Development
                </h3>
                {webSkills.map((skill, idx) => (
                  <SkillBar
                    key={idx}
                    name={skill.name}
                    level={skill.level}
                    type="linear"
                  />
                ))}
              </motion.div>

              {/* AI / ML */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 border border-accent/15 bg-surface/30"
              >
                <h3 className="font-outfit text-lg font-bold text-white tracking-tight border-b border-accent/10 pb-2 mb-4">
                  AI / Machine Learning
                </h3>
                {aiSkills.map((skill, idx) => (
                  <SkillBar
                    key={idx}
                    name={skill.name}
                    level={skill.level}
                    type="linear"
                  />
                ))}
              </motion.div>
            </div>

            {/* Right Stack */}
            <div className="flex flex-col gap-8">
              {/* Android */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 border border-accent/15 bg-surface/30"
              >
                <h3 className="font-outfit text-lg font-bold text-white tracking-tight border-b border-accent/10 pb-2 mb-4">
                  Android Development
                </h3>
                {androidSkills.map((skill, idx) => (
                  <SkillBar
                    key={idx}
                    name={skill.name}
                    level={skill.level}
                    type="linear"
                  />
                ))}
              </motion.div>

              {/* SQA */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 border border-accent/15 bg-surface/30"
              >
                <h3 className="font-outfit text-lg font-bold text-white tracking-tight border-b border-accent/10 pb-2 mb-4">
                  SQA Testing
                </h3>
                {sqaSkills.map((skill, idx) => (
                  <SkillBar
                    key={idx}
                    name={skill.name}
                    level={skill.level}
                    type="linear"
                  />
                ))}
              </motion.div>

              {/* UI / Design */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 border border-accent/15 bg-surface/30"
              >
                <h3 className="font-outfit text-lg font-bold text-white tracking-tight border-b border-accent/10 pb-2 mb-4">
                  UI / Design
                </h3>
                {designSkills.map((skill, idx) => (
                  <SkillBar
                    key={idx}
                    name={skill.name}
                    level={skill.level}
                    type="linear"
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Database & Tools */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card h-fit rounded-2xl p-6 border border-accent/15 bg-surface/30 self-start"            >
              <h3 className="font-outfit text-lg font-bold text-white tracking-tight border-b border-accent/10 pb-2 mb-6">
                Databases, Tools & Design
              </h3>

              <motion.div
                variants={settings.animations ? staggerContainer : {}}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                {circularSkills.map((skill, idx) => (
                  <motion.div key={idx} variants={fadeInUp}>
                    <SkillBar
                      name={skill.name}
                      level={skill.level}
                      type="circular"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
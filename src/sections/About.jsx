import { useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import { motion } from 'framer-motion';
import { User, Award, MapPin, Heart } from 'lucide-react';
import { fadeInUp, staggerContainer, initParallax } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';
import AboutImage from '../assets/AboutImage.jpeg';

export default function About() {
  const { settings } = useTheme();
  const imageRef = useRef(null);

  useEffect(() => {
    if (settings.animations && imageRef.current) {
      initParallax(imageRef.current, 15);
    }
  }, [settings.animations]);

  const stats = [
    { label: 'Degree', value: 'B.Sc. Software Engineering', icon: Award, desc: 'Specializing in Web, SQA & Mobile' },
    { label: 'Location', value: 'Dhaka, Bangladesh', icon: MapPin, desc: 'Available for Remote & Hybrid work' },
    { label: 'Age & Status', value: '23 Years Old', icon: User, desc: 'Last Year Student' },
  ];

  return (
    <section id="about" className="relative bg-[#1A1625] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="About Me" subtitle="My Story" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Image Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative h-[400px] w-full max-w-[340px] rounded-3xl overflow-hidden shadow-2xl border border-accent/25">
              <img
                ref={imageRef}
                src={AboutImage}
                alt="Mashiur Rahaman portrait"
                className="h-[120%] w-full object-cover absolute top-0 left-0"
              />
              {/* Colored gradient tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1625] via-primary/10 to-transparent mix-blend-multiply" />
            </div>
          </div>

          {/* Bio Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-textSecondary leading-relaxed text-base"
            >
              <h3 className="font-outfit text-2xl font-bold text-white tracking-tight mb-4">
                Building Digital Experiences with Code & Creativity.
              </h3>
              <p className="mb-4">
                I’m Mashiur Rahaman, a passionate Software Engineering student with a strong interest in Web Development, Android Development, and Software Quality Assurance. I enjoy transforming ideas into real-world applications by combining clean design, efficient code, and reliable functionality.              </p>
              <p className="mb-6">
                My journey in software development has allowed me to work with modern technologies like React, JavaScript, Tailwind CSS, Java, Android, SQL, and testing frameworks, helping me build responsive web applications, mobile solutions, and robust software systems. Beyond development, I’m deeply interested in software quality, test automation, and improving user experiences through well-structured and maintainable code.              </p>
              <p className="mb-6">
                I’m constantly learning, exploring new technologies, and pushing myself to become a better developer. My goal is to build impactful digital solutions that solve real problems while continuously growing as a software engineer.              </p>

              {/* Passion list */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-accent">
                  <Heart className="h-4 w-4 fill-accent" /> Full Stack Web Development
                </span>

                <span className="flex items-center gap-1.5 text-sm font-semibold text-accent">
                  <Heart className="h-4 w-4 fill-accent" /> Android App Development
                </span>

                <span className="flex items-center gap-1.5 text-sm font-semibold text-accent">
                  <Heart className="h-4 w-4 fill-accent" /> Software Quality Assurance (SQA)
                </span>
              </div>
            </motion.div>

            {/* Staggered Metadata Cards */}
            <motion.div
              variants={settings.animations ? staggerContainer : {}}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    className="glass-card rounded-2xl p-4 border border-accent/15 bg-surface/30 hover:bg-surface/50 hover:border-accent/30 transition-all duration-300 flex flex-col"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-accent mb-3">
                      <IconComponent className="h-4.5 w-4.5" />
                    </div>
                    <span className="font-outfit text-[11px] font-semibold text-accent uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <h4 className="font-outfit text-sm font-bold text-white tracking-tight mt-1">
                      {stat.value}
                    </h4>
                    <p className="text-[10px] text-textSecondary mt-2 leading-tight">
                      {stat.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

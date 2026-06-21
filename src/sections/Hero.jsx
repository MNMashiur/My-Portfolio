import { motion } from 'framer-motion';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { useTheme } from '../context/ThemeContext';
import { SOCIAL_LINKS } from '../utils/constants';
import { Github, Linkedin, Twitter, Facebook, Instagram, ArrowDown } from 'lucide-react';
import { fadeInUp, fadeIn } from '../utils/animations';
import { useState } from 'react';
import profile from '../assets/profile.jpeg';

export default function Hero() {
  const { settings } = useTheme();

  const roles = [
    'Web Developer',
    'Android Developer',
    'Exploring SQA Engineering',
    'Exploring Blockchain Technology',
    'Software Engineering Student',
  ];

  const typedText = useTypingEffect(roles, 100, 50, 2000);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Generate particles only once (safe)
  const [particles] = useState(() =>
    Array.from({ length: 12 }, () => ({
      width: Math.random() * 8 + 4,
      height: Math.random() * 8 + 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 5,
      speedX: Math.random() * 20 - 10,
      speedY: Math.random() * 20 - 10,
    }))
  );

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      onMouseMove={(e) => {
        const { clientX, clientY } = e;
        setMousePosition({
          x: clientX / window.innerWidth,
          y: clientY / window.innerHeight,
        });
      }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1A1625] pt-24 pb-16"
    >
      {/* Background Gradient Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={
            settings.animations
              ? {
                x: [0, 30, -20, 0],
                y: [0, -40, 30, 0],
                scale: [1, 1.15, 0.9, 1],
              }
              : {}
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-[10%] -left-[10%] h-[50vw] w-[50vw] max-w-[500px] rounded-full bg-primary/15 blur-[120px]"
        />

        <motion.div
          animate={
            settings.animations
              ? {
                x: [0, -30, 20, 0],
                y: [0, 40, -30, 0],
                scale: [1, 0.9, 1.1, 1],
              }
              : {}
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-[10%] -right-[10%] h-[50vw] w-[50vw] max-w-[500px] rounded-full bg-accent/15 blur-[120px]"
        />
      </div>

      {/* Floating Particles Overlay */}
      {/* Floating Particles Overlay */}
      {settings.particles && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-accent/20"
              style={{
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={
                settings.animations
                  ? {
                    x: mousePosition.x * particle.speedX,
                    y: [
                      mousePosition.y * particle.speedY,
                      mousePosition.y * particle.speedY - 80,
                      mousePosition.y * particle.speedY,
                    ],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.3, 1],
                  }
                  : {}
              }
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        {/* Profile Image */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative mb-8 h-36 w-36 md:h-40 md:w-40"
        >
          <div className="glow-pulse absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent opacity-75 blur-[12px]" />

          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-accent/40 bg-surface">
            <img
              src={profile}
              alt="Mashiur Rahaman Mollah Niran"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Hello Text */}
        <motion.span
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-accent"
        >
          Welcome to my Space
        </motion.span>

        {/* Name */}
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Mashiur Rahaman
          </span>
        </motion.h1>

        {/* Typing Roles */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mt-4 flex h-8 items-center text-lg font-medium text-textSecondary md:text-xl"
        >
          <span>I'm a&nbsp;</span>
          <span className="animate-pulse border-r-2 border-accent/80 pr-1 font-bold text-accent">
            {typedText}
          </span>
        </motion.div>

        {/* Short Bio */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-textSecondary md:text-base"
        >
          A Software Engineering student specializing in Web Development, Android Development, and SQA, focused on creating efficient, user-friendly, and reliable software solutions.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="rounded-xl bg-gradient-to-r from-primary to-secondary px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-primary/40"
          >
            Hire Me
          </a>

          <a
            href="/Mashiur_Rahaman.pdf"
            download="Mashiur_Rahaman.pdf"
            className="rounded-xl border border-accent/20 bg-surface/50 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface"
          >
            Download CV
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="mt-12 flex items-center gap-6"
        >
          {[Github, Linkedin, Twitter, Facebook, Instagram].map((Icon, index) => {
            const links = [
              SOCIAL_LINKS.github,
              SOCIAL_LINKS.linkedin,
              SOCIAL_LINKS.X,
              SOCIAL_LINKS.facebook,
              SOCIAL_LINKS.instagram,
            ];

            return (
              <a
                key={index}
                href={links[index]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary transition-colors hover:text-white"
              >
                <Icon className="h-6 w-6" />
              </a>
            );
          })}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
          className="absolute bottom-7 left-1/2 flex -translate-x-1/2 transform flex-col items-center gap-1.5 opacity-60 transition-opacity hover:opacity-100"
        >
          <a
            href="#about"
            className="flex flex-col items-center"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById('about')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-textSecondary">
              Scroll Down
            </span>

            <motion.div
              animate={
                settings.animations
                  ? {
                    y: [0, 8, 0],
                  }
                  : {}
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="mt-2 text-accent"
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
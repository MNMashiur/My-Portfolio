import  { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CursorTrail from '../components/CursorTrail';

// Import Sections
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Education from '../sections/Education';
import Certifications from '../sections/Certifications';
import GitHubStats from '../sections/GitHubStats';
import Blog from '../sections/Blog';
import Testimonials from '../sections/Testimonials';
import Achievements from '../sections/Achievements';
import Contact from '../sections/Contact';
import FAQ from '../sections/FAQ';
import Settings from '../sections/Settings';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const marqueeSkills = [
    "React.js", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript", "Node.js", 
    "Express.js", "PostgreSQL", "MongoDB", "Kotlin", "Jetpack Compose", "Android SDK", 
    "Room DB", "Selenium", "Playwright", "Cypress", "Jest", "Git", "GitHub Actions", "Docker"
  ];

  return (
    <div className="relative min-h-screen bg-[#1A1625] overflow-x-hidden selection:bg-accent selection:text-[#1A1625]">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-[99]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Preferences Switcher */}
      <Settings />

      {/* Interactive Cursor Follower */}
      <CursorTrail />

      {/* Sticky header navbar */}
      <Navbar />

      {/* Main Home Sections */}
      <main>
        {/* 1. Hero */}
        <Hero />

        {/* Tech Stack Marquee (Infinite scroll) */}
        <div className="w-full bg-[#241B35]/40 border-y border-accent/10 py-5 overflow-hidden select-none">
          <div className="animate-marquee-paused relative flex items-center">
            <div className="animate-marquee flex gap-12 text-nowrap">
              {/* Double arrays to prevent layout gaps during seamless repeats */}
              {[...marqueeSkills, ...marqueeSkills].map((skill, idx) => (
                <span
                  key={idx}
                  className="font-outfit text-sm font-bold uppercase tracking-wider text-textSecondary/40 hover:text-accent transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. About */}
        <About />

        {/* 3. Skills */}
        <Skills />

        {/* 4. Projects */}
        <Projects />

        {/* 5. Experience */}
        <Experience />

        {/* 6. Education */}
        <Education />

        {/* 7. Certifications */}
        <Certifications />

        {/* 8. GitHub Stats */}
        <GitHubStats />

        {/* 9. Blog */}
        <Blog />

        {/* 10. Testimonials */}
        <Testimonials />

        {/* Achievements */}
        <Achievements />

        {/* FAQ Accordions */}
        <FAQ />

        {/* 13. Contact Form */}
        <Contact />
      </main>

      {/* Sticky footer info */}
      <Footer />
    </div>
  );
}

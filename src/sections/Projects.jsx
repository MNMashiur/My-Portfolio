import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';
import { motion } from 'framer-motion';
import { Search, Globe, Github, Info, Cpu, CheckCircle } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';

const CATEGORIES = ["All", "Web", "Android", "SQA", "Database", "AI"];

export default function Projects() {
  const { projects } = usePortfolio();
  const { settings } = useTheme();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  // Filter projects based on search query and category
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="relative bg-[#1A1625] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Featured Projects" subtitle="My Creations" />

        {/* Filter and Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 font-outfit text-xs font-bold uppercase tracking-wider transition-all duration-200 ${selectedCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-surface/50 border border-accent/10 text-textSecondary hover:border-accent/30 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-xs order-1 md:order-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-textSecondary" />
            <input
              type="text"
              placeholder="Search projects or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-accent/10 bg-surface/50 py-2.5 pl-10 pr-4 font-sans text-sm text-white placeholder-textSecondary/60 focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/40"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center border border-accent/15 bg-surface/30">
            <p className="text-textSecondary">No projects matching your search filter were found.</p>
          </div>
        ) : (
          <motion.div
            variants={settings.animations ? staggerContainer : {}}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <ProjectCard project={project} onOpenDetails={setActiveProject} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Project Details Modal */}
      <Modal
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        title={activeProject?.title || ''}
      >
        {activeProject && (
          <div className="flex flex-col gap-6">
            {/* Primary Info & Screenshots */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Main Image */}
                <div className="rounded-2xl overflow-hidden border border-accent/10 bg-surface">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="h-full w-full object-cover max-h-[360px]"
                  />
                </div>

                {/* Extra Screenshots */}
                {activeProject.screenshots?.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {activeProject.screenshots.map((shot, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl overflow-hidden border border-accent/10 bg-surface"
                      >
                        <img
                          src={shot}
                          alt={`${activeProject.title} screenshot ${idx + 1}`}
                          className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Specs Panel */}
              <div className="lg:col-span-5 flex flex-col justify-between glass-card p-5 rounded-2xl border border-accent/15">
                <div>
                  <h4 className="font-outfit text-md font-bold text-white tracking-tight uppercase border-b border-accent/10 pb-2 mb-3">
                    Project Info
                  </h4>
                  <p className="text-sm leading-relaxed mb-4">{activeProject.longDescription}</p>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs border-b border-accent/5 pb-2">
                      <span className="text-textSecondary uppercase font-medium">Category</span>
                      <span className="font-semibold text-accent">{activeProject.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-b border-accent/5 pb-2">
                      <span className="text-textSecondary uppercase font-medium">Technologies</span>
                      <span className="font-semibold text-white text-right">{activeProject.tags.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-xl bg-surface hover:bg-primary/20 border border-accent/15 flex items-center justify-center gap-2 py-3 text-xs font-bold text-white uppercase tracking-wider transition-colors"
                    >
                      <Github className="h-4.5 w-4.5" /> Repository
                    </a>
                  )}
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center gap-2 py-3 text-xs font-bold text-white uppercase tracking-wider hover:shadow-lg transition-all"
                    >
                      <Globe className="h-4.5 w-4.5" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Features, Challenges & Learnings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="glass-card p-5 rounded-2xl border border-accent/15 bg-surface/20">
                <h4 className="font-outfit text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3 border-b border-accent/5 pb-2">
                  <CheckCircle className="h-4.5 w-4.5 text-accent" /> Key Features
                </h4>
                <ul className="list-disc pl-5 text-xs text-textSecondary leading-relaxed flex flex-col gap-2">
                  {activeProject.features?.map((f, idx) => <li key={idx}>{f}</li>)}
                </ul>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-accent/15 bg-surface/20">
                <h4 className="font-outfit text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3 border-b border-accent/5 pb-2">
                  <Info className="h-4.5 w-4.5 text-accent" /> Challenges Faced
                </h4>
                <ul className="list-disc pl-5 text-xs text-textSecondary leading-relaxed flex flex-col gap-2">
                  {activeProject.challenges?.map((c, idx) => <li key={idx}>{c}</li>)}
                </ul>
              </div>
            </div>

            {/* Architecture & Learnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-5 rounded-2xl border border-accent/15 bg-surface/20">
                <h4 className="font-outfit text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3 border-b border-accent/5 pb-2">
                  <Cpu className="h-4.5 w-4.5 text-accent" /> Technical Architecture
                </h4>
                <p className="text-xs text-textSecondary leading-relaxed">
                  {activeProject.architecture || 'Structured using clean component division with local context wrappers, designed to maintain responsive layout integrity.'}
                </p>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-accent/15 bg-surface/20">
                <h4 className="font-outfit text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3 border-b border-accent/5 pb-2">
                  <Info className="h-4.5 w-4.5 text-accent" /> Key Learnings
                </h4>
                <ul className="list-disc pl-5 text-xs text-textSecondary leading-relaxed flex flex-col gap-2">
                  {activeProject.learnings?.map((l, idx) => <li key={idx}>{l}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

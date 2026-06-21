import { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { fetchGitHubStats } from '../utils/githubApi';
import { motion } from 'framer-motion';
import { Folder, Users, Star, Flame, GitBranch } from 'lucide-react';
import { fadeInUp } from '../utils/animations';


export default function GitHubStats() {

  const [username] = useState('MNMashiur');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      const data = await fetchGitHubStats(username);
      setStats(data);
      setLoading(false);
    }
    loadStats();
  }, [username]);


  const gridCells = stats?.contributions || [];

  const getCellColor = (level) => {
    switch (level) {
      case 0: return 'bg-[#2E2442]/30'; // Empty
      case 1: return 'bg-[#756AB6]/30'; // Low
      case 2: return 'bg-[#756AB6]/60'; // Mid-low
      case 3: return 'bg-[#AC87C5]';    // Mid-high
      case 4: return 'bg-[#E0AED0]';    // High
      default: return 'bg-[#2E2442]/30';
    }
  };

  return (
    <section id="github" className="relative bg-[#1A1625] py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="GitHub Activities" subtitle="Open Source Stats" />

        {stats?.profile && (
        <div className="col-span-2 mb-4 flex flex-col items-center">
          <img
            src={stats.profile.avatar_url}
            alt={stats.profile.login}
            className="h-20 w-20 rounded-full border-2 border-accent object-cover shadow-lg"
          />
          <h4 className="mt-3 font-outfit text-lg font-bold text-white">
            {stats.profile.name || stats.profile.login}
          </h4>
          <p className="text-xs text-textSecondary">
            @{stats.profile.login}
          </p>
        </div>
      )}

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-accent border-r-transparent border-b-primary border-l-transparent" />
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Stats Summary cards */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-4 border border-accent/15 bg-surface/30 flex flex-col justify-center items-center text-center"
              >
                <Folder className="h-6 w-6 text-accent mb-2" />
                <span className="font-outfit text-2xl font-extrabold text-white">{stats.profile.public_repos}</span>
                <p className="text-[10px] uppercase font-semibold text-textSecondary tracking-wider mt-1">Repositories</p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-4 border border-accent/15 bg-surface/30 flex flex-col justify-center items-center text-center"
              >
                <GitBranch className="h-6 w-6 text-accent mb-2" />
                <span className="font-outfit text-2xl font-extrabold text-white">
                  {stats.totalContributions}
                </span>
                <p className="text-[10px] uppercase font-semibold text-textSecondary tracking-wider mt-1">
                  Contributions
                </p>
              </motion.div>


              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-4 border border-accent/15 bg-surface/30 flex flex-col justify-center items-center text-center"
              >
                <Users className="h-6 w-6 text-accent mb-2" />
                <span className="font-outfit text-2xl font-extrabold text-white">{stats.profile.followers}</span>
                <p className="text-[10px] uppercase font-semibold text-textSecondary tracking-wider mt-1">Followers</p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-4 border border-accent/15 bg-surface/30 flex flex-col justify-center items-center text-center"
              >
                <Star className="h-6 w-6 text-accent mb-2" />
                <span className="font-outfit text-2xl font-extrabold text-white">
                  {stats.repos.reduce((a, b) => a + b.stargazers_count, 0)}
                </span>
                <p className="text-[10px] uppercase font-semibold text-textSecondary tracking-wider mt-1">Total Stars</p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-4 border border-accent/15 bg-surface/30 flex flex-col justify-center items-center text-center"
              >
                <Flame className="h-6 w-6 text-[#fb7185] mb-2" />
                <span className="font-outfit text-2xl font-extrabold text-white">{stats.currentStreak} Day{stats.currentStreak !== 1 ? 's' : ''}</span>
                <p className="text-[10px] uppercase font-semibold text-textSecondary tracking-wider mt-1">Current Streak</p>
              </motion.div>
            </div>

            {/* Contribution Graph Simulated */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 border border-accent/15 bg-surface/30"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-outfit text-sm font-bold text-white tracking-tight">
                    Contributions in the Last 12 Months
                  </h4>
                  <span className="text-[10px] text-textSecondary">Powered by GitHub API</span>
                </div>

                {/* Grid */}
                <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2 no-scrollbar">
                  {gridCells.map((level, idx) => (
                    <div
                      key={idx}
                      className={`h-[9px] w-[9px] rounded-[1px] transition-colors duration-300 ${getCellColor(level)}`}
                      title={`${level} contributions`}
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-end gap-1.5 text-[9px] text-textSecondary uppercase font-semibold">
                  <span>Less</span>
                  <div className="h-[9px] w-[9px] rounded-[1px] bg-[#2E2442]/30" />
                  <div className="h-[9px] w-[9px] rounded-[1px] bg-[#756AB6]/30" />
                  <div className="h-[9px] w-[9px] rounded-[1px] bg-[#756AB6]/60" />
                  <div className="h-[9px] w-[9px] rounded-[1px] bg-[#AC87C5]" />
                  <div className="h-[9px] w-[9px] rounded-[1px] bg-[#E0AED0]" />
                  <span>More</span>
                </div>
              </motion.div>

              {/* Language Breakdown */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 border border-accent/15 bg-surface/30"
              >
                <h4 className="font-outfit text-sm font-bold text-white tracking-tight mb-4">
                  Languages Breakdown
                </h4>

                <div className="flex flex-col gap-3">
                  {stats.languages.slice(0, 4).map((lang, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-medium text-white">{lang.name}</span>
                        <span className="text-accent font-semibold">{lang.percentage}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[#2E2442] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="glass-card text-center p-8 rounded-2xl border border-accent/15">
            <p className="text-textSecondary">Unable to fetch statistics for that username.</p>
          </div>
        )}
      </div>
    </section>
  );
}

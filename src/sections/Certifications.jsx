import  { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { certificationsData } from '../data/certifications';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { useTheme } from '../context/ThemeContext';

export default function Certifications() {
  const { settings } = useTheme();
  const [certs] = useState(certificationsData);

  return (
    <section id="certifications" className="relative bg-[#1A1625] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Licenses & Certifications" subtitle="My Credentials" />

        {certs.length === 0 ? (
          <div className="glass-card max-w-sm mx-auto rounded-2xl p-8 text-center border border-accent/15 bg-surface/30">
            <h4 className="font-outfit text-lg font-bold text-white mb-2">Coming Soon</h4>
            <p className="text-xs text-textSecondary">
              I am currently studying for the AWS Developer Associate and ISTQB Advanced level certifications. Stay tuned!
            </p>
          </div>
        ) : (
          <motion.div
            variants={settings.animations ? staggerContainer : {}}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certs.map((cert) => (
              <motion.div
                key={cert.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="interactive-card glass-card rounded-2xl p-5 border border-accent/15 bg-surface/30 hover:border-accent/40 hover:shadow-glow transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex gap-4">
                  {/* Logo or icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-accent">
                    {cert.logo ? (
                      <img
                        src={cert.logo}
                        alt={cert.issuer}
                        className="h-full w-full rounded-xl object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <Award className="h-6 w-6" />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-outfit text-sm font-bold text-white tracking-tight leading-tight">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-textSecondary mt-1">{cert.issuer}</p>
                    
                    <span className="inline-flex items-center gap-1 mt-2 text-[10px] text-textSecondary uppercase tracking-wider">
                      <Calendar className="h-3 w-3" /> {cert.date}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-accent/5 pt-3">
                  <span className="font-sans text-[10px] text-textSecondary">
                    ID: {cert.credentialId}
                  </span>
                  
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-outfit text-[11px] font-semibold text-accent hover:text-white transition-colors"
                    >
                      Verify <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

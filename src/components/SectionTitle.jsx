import 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

export default function SectionTitle({ title, subtitle, align = 'center' }) {
  const isLeft = align === 'left';

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`mb-12 flex flex-col ${isLeft ? 'items-start text-left' : 'items-center text-center'}`}
    >
      <span className="mb-2 font-outfit text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        {subtitle}
      </span>
      <h2 className="font-outfit text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <div className={`mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent`} />
    </motion.div>
  );
}

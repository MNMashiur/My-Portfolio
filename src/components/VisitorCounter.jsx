import  { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Users, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VisitorCounter() {
  const { visitorStats } = usePortfolio();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Animate visitor numbers from 0 to actual value
    let start = 0;
    const end = visitorStats.visits;
    if (end === 0) return;
    
    const duration = 1000; // 1 second
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [visitorStats.visits]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card flex items-center gap-4 rounded-2xl px-5 py-3 border border-accent/15"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-accent">
        {visitorStats.isReturning ? <UserCheck className="h-5 w-5" /> : <Users className="h-5 w-5" />}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-outfit text-xl font-bold tracking-tight text-white">{count}</span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-accent/80 bg-accent/10 px-2 py-0.5 rounded-full">
            {visitorStats.isReturning ? 'Returning' : 'New Guest'}
          </span>
        </div>
        <p className="text-[11px] text-textSecondary uppercase tracking-wider">Total Profile Visits</p>
      </div>
    </motion.div>
  );
}

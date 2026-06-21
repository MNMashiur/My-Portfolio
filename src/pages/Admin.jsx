import 'react';
import AdminDashboard from '../admin/AdminDashboard';
import CursorTrail from '../components/CursorTrail';

export default function Admin() {
  return (
    <div className="min-h-screen bg-[#1A1625] selection:bg-accent selection:text-[#1A1625]">
      {/* Dynamic Cursor follower */}
      <CursorTrail />
      
      {/* Core Dashboard UI */}
      <AdminDashboard />
    </div>
  );
}

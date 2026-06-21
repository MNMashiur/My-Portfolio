import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import ManageProjects from './ManageProjects';
import ManageBlogs from './ManageBlogs';
import ManageMessages from './ManageMessages';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Eye,
  LogOut,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const {
    visitorStats,
    projects,
    blogs,
    messages,
    addProject,
    updateProject,
    deleteProject,
    addBlog,
    updateBlog,
    deleteBlog,
    deleteMessage,
    markMessageAsRead
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('projects');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  const handleLogin = () => {
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  // Admin Login Gate
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1A1625] px-4">
        <div className="glass-card w-full max-w-md rounded-2xl border border-accent/15 bg-surface/30 p-8">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-accent">
              <Lock className="h-6 w-6" />
            </div>
          </div>

          <h2 className="text-center font-outfit text-2xl font-bold text-white">
            Admin Access
          </h2>

          <p className="mt-2 text-center text-xs text-textSecondary">
            Enter your admin password to continue
          </p>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="mt-6 w-full rounded-xl border border-accent/10 bg-surface/50 px-4 py-3 text-white placeholder:text-textSecondary focus:outline-none focus:border-accent/40"
          />

          <button
            onClick={handleLogin}
            className="mt-4 w-full rounded-xl bg-primary px-4 py-3 font-outfit text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-primary/90"
          >
            Login
          </button>

          <Link
            to="/"
            className="mt-4 block text-center text-xs text-textSecondary hover:text-white transition-colors"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1625] text-white pt-10 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-accent/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-outfit text-3xl font-bold tracking-tight">
              Admin Console
            </h1>
            <p className="mt-1 text-xs text-textSecondary">
              Manage project logs, publish articles, and read user messages
            </p>
          </div>

          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-xl border border-accent/15 bg-surface/50 px-5 py-2.5 font-outfit text-xs font-bold uppercase tracking-wider text-white hover:bg-surface transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" /> Back to Site
          </Link>
        </div>

        {/* Dashboard Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="glass-card rounded-2xl border border-accent/10 bg-surface/20 p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-textSecondary">
                Total Projects
              </span>
              <LayoutDashboard className="h-5 w-5 text-accent" />
            </div>
            <h2 className="mt-3 font-outfit text-3xl font-extrabold text-white">
              {projects.length}
            </h2>
          </div>

          <div className="glass-card rounded-2xl border border-accent/10 bg-surface/20 p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-textSecondary">
                Total Articles
              </span>
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <h2 className="mt-3 font-outfit text-3xl font-extrabold text-white">
              {blogs.length}
            </h2>
          </div>

          <div className="glass-card rounded-2xl border border-accent/10 bg-surface/20 p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-textSecondary">
                Messages
              </span>
              <MessageSquare className="h-5 w-5 text-accent" />
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <h2 className="font-outfit text-3xl font-extrabold text-white">
                {messages.length}
              </h2>

              {unreadMessagesCount > 0 && (
                <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-red-400">
                  {unreadMessagesCount} new
                </span>
              )}
            </div>
          </div>

          <div className="glass-card rounded-2xl border border-accent/10 bg-surface/20 p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-textSecondary">
                Total Visits
              </span>
              <Eye className="h-5 w-5 text-accent" />
            </div>
            <h2 className="mt-3 font-outfit text-3xl font-extrabold text-white">
              {visitorStats.visits}
            </h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-12">

          {/* Sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            {['projects', 'blogs', 'messages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-3 w-full rounded-xl px-4 py-3 text-left font-outfit text-sm font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-surface/50 border border-accent/10 text-textSecondary hover:border-accent/30 hover:text-white'
                }`}
              >
                {tab === 'projects' && <LayoutDashboard className="h-4.5 w-4.5" />}
                {tab === 'blogs' && <FileText className="h-4.5 w-4.5" />}
                {tab === 'messages' && <MessageSquare className="h-4.5 w-4.5" />}
                {tab}
              </button>
            ))}
          </div>

          {/* Workspace */}
          <div className="glass-card lg:col-span-9 rounded-2xl border border-accent/15 bg-surface/30 p-6 md:p-8">
            {activeTab === 'projects' && (
              <ManageProjects
                projects={projects}
                onAdd={addProject}
                onUpdate={updateProject}
                onDelete={deleteProject}
              />
            )}

            {activeTab === 'blogs' && (
              <ManageBlogs
                blogs={blogs}
                onAdd={addBlog}
                onUpdate={updateBlog}
                onDelete={deleteBlog}
              />
            )}

            {activeTab === 'messages' && (
              <ManageMessages
                messages={messages}
                onDelete={deleteMessage}
                onMarkRead={markMessageAsRead}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
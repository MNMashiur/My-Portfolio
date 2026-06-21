import  { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function ManageProjects({ projects, onAdd, onUpdate, onDelete }) {
  const [editingProj, setEditingProj] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web',
    description: '',
    longDescription: '',
    tags: '',
    githubUrl: '',
    liveUrl: '',
    image: '',
    features: '',
    challenges: '',
    learnings: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (proj) => {
    setEditingProj(proj);
    setFormData({
      title: proj.title,
      category: proj.category,
      description: proj.description,
      longDescription: proj.longDescription,
      tags: proj.tags.join(', '),
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      image: proj.image || '',
      features: proj.features?.join('\n') || '',
      challenges: proj.challenges?.join('\n') || '',
      learnings: proj.learnings?.join('\n') || '',
    });
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingProj(null);
    setIsAdding(false);
    setFormData({
      title: '',
      category: 'Web',
      description: '',
      longDescription: '',
      tags: '',
      githubUrl: '',
      liveUrl: '',
      image: '',
      features: '',
      challenges: '',
      learnings: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingProj) {
      onUpdate(editingProj.id, formData);
    } else {
      onAdd(formData);
    }
    handleCancel();
  };

  return (
    <div className="font-sans">
      <div className="flex items-center justify-between border-b border-accent/10 pb-4 mb-6">
        <h3 className="font-outfit text-lg font-bold text-white tracking-tight">Manage Projects</h3>
        {!isAdding && !editingProj && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary/80 transition-colors"
          >
            <Plus className="h-4.5 w-4.5" /> Add Project
          </button>
        )}
      </div>

      {/* Form Area */}
      {(isAdding || editingProj) && (
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-5 border border-accent/15 bg-surface/30 flex flex-col gap-4 mb-8">
          <h4 className="font-outfit text-sm font-bold text-white tracking-tight uppercase">
            {editingProj ? 'Edit Project' : 'New Project'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
                placeholder="e.g. FitTrack Android"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
              >
                <option value="Web">Web</option>
                <option value="Android">Android</option>
                <option value="SQA">SQA</option>
                <option value="Database">Database</option>
                <option value="AI">AI</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">GitHub URL</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Live Demo URL</label>
              <input
                type="url"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
                placeholder="React, Tailwind, Express"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Short Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
              placeholder="Short card summary description..."
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Long Description</label>
            <textarea
              name="longDescription"
              rows="3"
              value={formData.longDescription}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
              placeholder="Detailed description of the project..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Key Features (Line separated)</label>
              <textarea
                name="features"
                rows="3"
                value={formData.features}
                onChange={handleChange}
                className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
                placeholder="Feature 1&#10;Feature 2"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Challenges (Line separated)</label>
              <textarea
                name="challenges"
                rows="3"
                value={formData.challenges}
                onChange={handleChange}
                className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
                placeholder="Challenge 1&#10;Challenge 2"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Learnings (Line separated)</label>
              <textarea
                name="learnings"
                rows="3"
                value={formData.learnings}
                onChange={handleChange}
                className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
                placeholder="Learning 1&#10;Learning 2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl border border-accent/10 bg-[#1A1625] px-4 py-2 text-xs font-bold text-textSecondary hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-primary px-5 py-2 text-xs font-bold text-white hover:bg-primary/90"
            >
              Save Project
            </button>
          </div>
        </form>
      )}

      {/* List Area */}
      <div className="flex flex-col gap-4">
        {projects.map((proj) => (
          <div key={proj.id} className="glass-card rounded-xl p-4 border border-accent/10 bg-surface/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={proj.image}
                alt={proj.title}
                className="h-10 w-16 object-cover rounded-md"
              />
              <div>
                <h5 className="font-outfit text-sm font-bold text-white">{proj.title}</h5>
                <span className="text-[10px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full uppercase mt-1 inline-block">
                  {proj.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEditClick(proj)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface/50 border border-accent/10 text-textSecondary hover:text-white hover:border-accent/30"
                aria-label="Edit project"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(proj.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                aria-label="Delete project"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

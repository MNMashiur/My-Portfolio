import  { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function ManageBlogs({ blogs, onAdd, onUpdate, onDelete }) {
  const [editingBlog, setEditingBlog] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    image: '',
    readTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      image: blog.image || '',
      readTime: blog.readTime || '',
    });
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingBlog(null);
    setIsAdding(false);
    setFormData({
      title: '',
      summary: '',
      content: '',
      image: '',
      readTime: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingBlog) {
      onUpdate(editingBlog.id, formData);
    } else {
      onAdd(formData);
    }
    handleCancel();
  };

  return (
    <div className="font-sans">
      <div className="flex items-center justify-between border-b border-accent/10 pb-4 mb-6">
        <h3 className="font-outfit text-lg font-bold text-white tracking-tight">Manage Articles</h3>
        {!isAdding && !editingBlog && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary/80 transition-colors"
          >
            <Plus className="h-4.5 w-4.5" /> Add Post
          </button>
        )}
      </div>

      {/* Form Area */}
      {(isAdding || editingBlog) && (
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-5 border border-accent/15 bg-surface/30 flex flex-col gap-4 mb-8">
          <h4 className="font-outfit text-sm font-bold text-white tracking-tight uppercase">
            {editingBlog ? 'Edit Article' : 'New Article'}
          </h4>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
              placeholder="e.g. Speeding up Playwright Runs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Read Time</label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
                placeholder="e.g. 5 min read"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Banner Image URL</label>
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
            <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Summary / Short Intro</label>
            <input
              type="text"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
              placeholder="Write a catchy summary that lifts engagement..."
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-2">Full Content</label>
            <textarea
              name="content"
              rows="6"
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-accent/10 bg-[#1A1625] py-2.5 px-3 text-xs text-white focus:outline-none focus:border-accent/40"
              placeholder="Article markdown or plain content..."
            />
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
              Save Article
            </button>
          </div>
        </form>
      )}

      {/* List Area */}
      <div className="flex flex-col gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="glass-card rounded-xl p-4 border border-accent/10 bg-surface/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-10 w-16 object-cover rounded-md"
              />
              <div>
                <h5 className="font-outfit text-sm font-bold text-white">{blog.title}</h5>
                <span className="text-[9px] text-textSecondary mt-1 block">
                  Published: {blog.date} | {blog.readTime}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEditClick(blog)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface/50 border border-accent/10 text-textSecondary hover:text-white hover:border-accent/30"
                aria-label="Edit blog"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(blog.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                aria-label="Delete blog"
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

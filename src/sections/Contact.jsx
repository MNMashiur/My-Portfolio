import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import SectionTitle from '../components/SectionTitle';
import { Mail, Phone, MapPin, Send, CheckCircle, Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { SOCIAL_LINKS } from '../utils/constants';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

export default function Contact() {
  const { addMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setStatus('sending');

  addMessage({
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  });

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      },
      publicKey
    );

    setStatus('success');

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

  } catch (err) {
    console.error("EmailJS Full Error:", err);
    console.log("Status:", err.status);
    console.log("Text:", err.text);
    setStatus('error');
  }
};

  return (
    <section id="contact" className="relative bg-[#1A1625] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Get In Touch" subtitle="Contact Me" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-outfit text-2xl font-bold text-white tracking-tight mb-4">
                Open for Opportunities
              </h3>
              <p className="text-sm text-textSecondary leading-relaxed mb-8">
                I’m currently looking for internship opportunities, collaborative projects, and research work in Software Engineering, Blockchain Development, Software Quality Assurance, and AI/ML.
              </p>

              {/* Grid detail entries */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-accent border border-accent/10">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-accent">Email</span>
                    <a href={`mailto:${SOCIAL_LINKS.email}`} className="block text-sm font-semibold text-white hover:text-accent mt-0.5">
                      {SOCIAL_LINKS.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-accent border border-accent/10">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-accent">Phone</span>
                    <a href={`tel:${SOCIAL_LINKS.phone}`} className="block text-sm font-semibold text-white hover:text-accent mt-0.5">
                      {SOCIAL_LINKS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-accent border border-accent/10">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-accent">Location</span>
                    <span className="block text-sm font-semibold text-white mt-0.5">
                      {SOCIAL_LINKS.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="mt-12">
              <h4 className="font-outfit text-xs font-bold uppercase tracking-wider text-textSecondary mb-4">Connect Socially</h4>
              <div className="flex items-center gap-4">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E2442]/50 border border-accent/15 text-textSecondary hover:text-white transition-all hover:-translate-y-0.5"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E2442]/50 border border-accent/15 text-textSecondary hover:text-white transition-all hover:-translate-y-0.5"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.X}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E2442]/50 border border-accent/15 text-textSecondary hover:text-white transition-all hover:-translate-y-0.5"
                >
                  <Twitter className="h-5 w-5" />
                </a>

                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E2442]/50 border border-accent/15 text-textSecondary hover:text-white transition-all hover:-translate-y-0.5"
                >
                  <Instagram className="h-5 w-5" />
                </a>

                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2E2442]/50 border border-accent/15 text-textSecondary hover:text-white transition-all hover:-translate-y-0.5"
                >
                  <Facebook className="h-5 w-5" />
                </a>

              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 md:p-8 border border-accent/15 bg-surface/30">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <CheckCircle className="h-16 w-16 text-accent animate-bounce" />
                  <h4 className="font-outfit text-xl font-bold text-white mt-4">Message Sent Successfully!</h4>
                  <p className="text-sm text-textSecondary mt-2 max-w-sm leading-relaxed">
                    Thank you for reaching out. I've received your submission and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 rounded-xl bg-primary px-6 py-2.5 font-outfit text-xs font-bold uppercase tracking-wider text-white hover:bg-primary/80 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-textSecondary mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full rounded-xl border bg-surface/50 py-3 px-4 text-sm text-white placeholder-textSecondary/40 focus:outline-none focus:ring-1 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-accent/10 focus:border-accent/40 focus:ring-accent/40'
                          }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="text-[10px] text-red-400 mt-1 block">{errors.name}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-textSecondary mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full rounded-xl border bg-surface/50 py-3 px-4 text-sm text-white placeholder-textSecondary/40 focus:outline-none focus:ring-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-accent/10 focus:border-accent/40 focus:ring-accent/40'
                          }`}
                        placeholder="johndoe@example.com"
                      />
                      {errors.email && <span className="text-[10px] text-red-400 mt-1 block">{errors.email}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-textSecondary mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-surface/50 py-3 px-4 text-sm text-white placeholder-textSecondary/40 focus:outline-none focus:ring-1 ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-accent/10 focus:border-accent/40 focus:ring-accent/40'
                        }`}
                      placeholder="Project Proposal / Collaboration Inquiry"
                    />
                    {errors.subject && <span className="text-[10px] text-red-400 mt-1 block">{errors.subject}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-textSecondary mb-2">Your Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-surface/50 py-3 px-4 text-sm text-white placeholder-textSecondary/40 focus:outline-none focus:ring-1 ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-accent/10 focus:border-accent/40 focus:ring-accent/40'
                        }`}
                      placeholder="Tell me about your project context, timeline, and requirements..."
                    />
                    {errors.message && <span className="text-[10px] text-red-400 mt-1 block">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="mt-2 w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-3.5 flex items-center justify-center gap-2 font-outfit text-xs font-bold uppercase tracking-wider text-white hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  {status === 'error' && (
                    <span className="text-xs text-red-400 text-center mt-2 block">
                      Failed to send message via EmailJS. However, it was logged locally in the admin panel!
                    </span>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

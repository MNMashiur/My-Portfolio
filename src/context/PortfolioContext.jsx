/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useEffect } from 'react';
import { initialProjects } from '../data/projects';
import { initialBlogs } from '../data/blogs';
import { initialTestimonials } from '../data/testimonials';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  // Visitor counter state
  const [visitorStats] = useState(() => {
    try {
      const returning = localStorage.getItem('portfolio_returning_visitor');
      const savedCount = localStorage.getItem('portfolio_visit_count');

      let count = savedCount ? parseInt(savedCount, 10) : 0;

      const isSessionTracked = sessionStorage.getItem(
        'portfolio_session_counted'
      );

      if (!isSessionTracked) {
        count += 1;
        localStorage.setItem('portfolio_visit_count', count.toString());
        sessionStorage.setItem('portfolio_session_counted', 'true');
      }

      localStorage.setItem('portfolio_returning_visitor', 'true');

      return {
        visits: count,
        isReturning: !!returning,
      };
    } catch (error) {
      console.warn('Visitor tracking failed:', error);

      return {
        visits: 1,
        isReturning: false,
      };
    }
  });

  // Persistent data
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem('portfolio_blogs');
    return saved ? JSON.parse(saved) : initialBlogs;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('portfolio_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('portfolio_messages');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync storage
  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem(
      'portfolio_testimonials',
      JSON.stringify(testimonials)
    );
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('portfolio_messages', JSON.stringify(messages));
  }, [messages]);

  // Project CRUD
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: `project-${Date.now()}`,
      tags:
        typeof project.tags === 'string'
          ? project.tags.split(',').map((t) => t.trim())
          : project.tags,
      features:
        typeof project.features === 'string'
          ? project.features.split('\n').filter(Boolean)
          : project.features,
      challenges:
        typeof project.challenges === 'string'
          ? project.challenges.split('\n').filter(Boolean)
          : project.challenges,
      learnings:
        typeof project.learnings === 'string'
          ? project.learnings.split('\n').filter(Boolean)
          : project.learnings,
      screenshots: project.screenshots || [],
    };

    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = (id, updatedProject) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? {
              ...project,
              ...updatedProject,
            }
          : project
      )
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  // Blog CRUD
  const addBlog = (blog) => {
    const newBlog = {
      ...blog,
      id: `blog-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      readTime: blog.readTime || '3 min read',
      author: 'Mashiur Rahaman',
    };

    setBlogs((prev) => [newBlog, ...prev]);
  };

  const updateBlog = (id, updatedBlog) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id ? { ...blog, ...updatedBlog } : blog
      )
    );
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  // Testimonial CRUD
  const addTestimonial = (testimonial) => {
    const newTestimonial = {
      ...testimonial,
      id: `test-${Date.now()}`,
      avatar:
        testimonial.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60',
    };

    setTestimonials((prev) => [...prev, newTestimonial]);
  };

  const deleteTestimonial = (id) => {
    setTestimonials((prev) =>
      prev.filter((testimonial) => testimonial.id !== id)
    );
  };

  // Message CRUD
  const addMessage = (message) => {
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleString(),
      read: false,
    };

    setMessages((prev) => [newMessage, ...prev]);
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const markMessageAsRead = (id) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, read: true } : message
      )
    );
  };

  return (
    <PortfolioContext.Provider
      value={{
        visitorStats,
        projects,
        blogs,
        testimonials,
        messages,

        addProject,
        updateProject,
        deleteProject,

        addBlog,
        updateBlog,
        deleteBlog,

        addTestimonial,
        deleteTestimonial,

        addMessage,
        deleteMessage,
        markMessageAsRead,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
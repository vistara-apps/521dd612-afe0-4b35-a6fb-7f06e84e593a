'use client';

import { useState } from 'react';
import { Plus, Send } from 'lucide-react';
import { generateId } from '../../lib/utils';

interface IdeaSubmissionFormProps {
  onSubmit?: (idea: { title: string; description: string }) => void;
}

export function IdeaSubmissionForm({ onSubmit }: IdeaSubmissionFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.(formData);
      setFormData({ title: '', description: '' });
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center space-x-2 w-full"
      >
        <Plus className="w-5 h-5" />
        <span>Submit New Idea</span>
      </button>
    );
  }

  return (
    <div className="glass-card p-6 animate-slide-up">
      <h3 className="text-lg font-semibold text-fg mb-4">Submit Your Idea</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-fg mb-2">
            Idea Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter a catchy title for your idea..."
            className="w-full px-4 py-3 bg-surface border border-white border-opacity-10 rounded-lg text-fg placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            maxLength={100}
            required
          />
          <p className="text-xs text-text-secondary mt-1">
            {formData.title.length}/100 characters
          </p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-fg mb-2">
            Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Describe your idea in detail. What problem does it solve? How would it work?"
            rows={4}
            className="w-full px-4 py-3 bg-surface border border-white border-opacity-10 rounded-lg text-fg placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
            maxLength={500}
            required
          />
          <p className="text-xs text-text-secondary mt-1">
            {formData.description.length}/500 characters
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
            className={`btn-primary flex items-center space-x-2 flex-1 ${
              isSubmitting || !formData.title.trim() || !formData.description.trim()
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Idea'}</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setFormData({ title: '', description: '' });
            }}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

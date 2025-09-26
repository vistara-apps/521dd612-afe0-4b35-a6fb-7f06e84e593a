'use client';

import { useState } from 'react';
import { ThumbsUp, User, Calendar, TrendingUp } from 'lucide-react';
import { Idea } from '../../lib/types';
import { formatDate } from '../../lib/utils';

interface IdeaCardProps {
  idea: Idea;
  variant?: 'default' | 'hover';
  onVote?: (ideaId: string, weight: number) => void;
  userVote?: number;
}

export function IdeaCard({ idea, variant = 'default', onVote, userVote }: IdeaCardProps) {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (weight: number) => {
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      await onVote?.(idea.id, weight);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className={`glass-card p-6 transition-all duration-200 ${
      variant === 'hover' ? 'hover:bg-opacity-15 hover:scale-105' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-fg line-clamp-2">{idea.title}</h3>
        <div className="flex items-center space-x-1 text-accent">
          <TrendingUp className="w-4 h-4" />
          <span className="font-bold">{idea.totalWeight}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm mb-4 line-clamp-3">
        {idea.description}
      </p>

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span>User {idea.submittedByUserId.slice(-4)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(idea.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Voting */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Vote weight:</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 5].map((weight) => (
              <button
                key={weight}
                onClick={() => handleVote(weight)}
                disabled={isVoting}
                className={`w-8 h-8 rounded-full text-xs font-medium transition-all duration-200 ${
                  userVote === weight
                    ? 'bg-accent text-white'
                    : 'bg-surface text-text-secondary hover:bg-accent hover:text-white'
                } ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {weight}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleVote(1)}
          disabled={isVoting}
          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs transition-all duration-200 ${
            userVote
              ? 'bg-accent text-white'
              : 'bg-surface text-text-secondary hover:bg-accent hover:text-white'
          } ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ThumbsUp className="w-3 h-3" />
          <span>{userVote ? 'Voted' : 'Vote'}</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>Community Support</span>
          <span>{idea.totalWeight} votes</span>
        </div>
        <div className="w-full bg-surface rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((idea.totalWeight / 100) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

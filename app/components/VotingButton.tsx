'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface VotingButtonProps {
  variant: 'upvote' | 'downvote';
  weight?: number;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: (weight: number) => void;
}

export function VotingButton({ 
  variant, 
  weight = 1, 
  isActive = false, 
  disabled = false,
  onClick 
}: VotingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    try {
      await onClick?.(variant === 'upvote' ? weight : -weight);
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = variant === 'upvote' ? ThumbsUp : ThumbsDown;
  
  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? 'bg-accent text-white shadow-lg'
          : variant === 'upvote'
          ? 'bg-green-500 bg-opacity-20 text-green-400 hover:bg-opacity-30'
          : 'bg-red-500 bg-opacity-20 text-red-400 hover:bg-opacity-30'
      } ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
    >
      <Icon className="w-4 h-4" />
      <span>{isLoading ? 'Voting...' : `${variant === 'upvote' ? '+' : '-'}${weight}`}</span>
    </button>
  );
}

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function calculateWheelSegments(ideas: any[]): any[] {
  const totalWeight = ideas.reduce((sum, idea) => sum + idea.totalWeight, 0);
  
  if (totalWeight === 0) return [];
  
  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
    '#a55eea', '#26de81', '#fd79a8', '#fdcb6e', '#6c5ce7'
  ];
  
  let currentAngle = 0;
  
  return ideas.map((idea, index) => {
    const percentage = idea.totalWeight / totalWeight;
    const segmentAngle = percentage * 360;
    
    const segment = {
      id: idea.id,
      title: idea.title,
      weight: idea.totalWeight,
      color: colors[index % colors.length],
      startAngle: currentAngle,
      endAngle: currentAngle + segmentAngle,
      percentage: Math.round(percentage * 100)
    };
    
    currentAngle += segmentAngle;
    return segment;
  });
}

export function selectWinnerFromWheel(segments: any[], seed: string): any {
  // Use seed to generate deterministic random number
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  const random = Math.abs(hash) / 2147483647; // Normalize to 0-1
  const targetAngle = random * 360;
  
  const winner = segments.find(segment => 
    targetAngle >= segment.startAngle && targetAngle < segment.endAngle
  );
  
  return {
    winner,
    spinAngle: targetAngle + (Math.floor(random * 5) + 3) * 360, // Add multiple rotations
    targetAngle
  };
}

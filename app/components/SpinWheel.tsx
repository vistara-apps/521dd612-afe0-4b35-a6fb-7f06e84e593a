'use client';

import { useState, useRef } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { calculateWheelSegments, selectWinnerFromWheel, generateId } from '../../lib/utils';
import { mockIdeas } from '../../lib/mockData';

interface SpinWheelProps {
  variant?: 'active' | 'result';
  onSpinComplete?: (winner: any) => void;
}

export function SpinWheel({ variant = 'active', onSpinComplete }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<any>(null);
  const [spinResult, setSpinResult] = useState<any>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const segments = calculateWheelSegments(mockIdeas);

  const handleSpin = () => {
    if (isSpinning || segments.length === 0) return;

    setIsSpinning(true);
    setWinner(null);

    const seed = `spin_${Date.now()}_${generateId()}`;
    const result = selectWinnerFromWheel(segments, seed);
    
    setSpinResult(result);

    // Apply CSS animation
    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--spin-rotation', `${result.spinAngle}deg`);
      wheelRef.current.classList.add('spin-wheel-animation');
    }

    // Complete spin after animation
    setTimeout(() => {
      setIsSpinning(false);
      setWinner(result.winner);
      onSpinComplete?.(result);
      
      if (wheelRef.current) {
        wheelRef.current.classList.remove('spin-wheel-animation');
      }
    }, 3000);
  };

  const resetWheel = () => {
    setWinner(null);
    setSpinResult(null);
    if (wheelRef.current) {
      wheelRef.current.style.transform = 'rotate(0deg)';
      wheelRef.current.classList.remove('spin-wheel-animation');
    }
  };

  if (segments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">No ideas available to spin. Add some ideas first!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-accent"></div>
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="relative w-80 h-80 rounded-full border-4 border-accent shadow-2xl"
          style={{ transformOrigin: 'center' }}
        >
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            className="absolute inset-0"
          >
            {segments.map((segment, index) => {
              const centerX = 160;
              const centerY = 160;
              const radius = 150;
              
              const startAngleRad = (segment.startAngle - 90) * (Math.PI / 180);
              const endAngleRad = (segment.endAngle - 90) * (Math.PI / 180);
              
              const x1 = centerX + radius * Math.cos(startAngleRad);
              const y1 = centerY + radius * Math.sin(startAngleRad);
              const x2 = centerX + radius * Math.cos(endAngleRad);
              const y2 = centerY + radius * Math.sin(endAngleRad);
              
              const largeArcFlag = segment.endAngle - segment.startAngle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');

              // Text position
              const textAngle = (segment.startAngle + segment.endAngle) / 2;
              const textAngleRad = (textAngle - 90) * (Math.PI / 180);
              const textRadius = radius * 0.7;
              const textX = centerX + textRadius * Math.cos(textAngleRad);
              const textY = centerY + textRadius * Math.sin(textAngleRad);

              return (
                <g key={segment.id}>
                  <path
                    d={pathData}
                    fill={segment.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="wheel-segment"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                  >
                    {segment.title.length > 12 
                      ? segment.title.substring(0, 12) + '...' 
                      : segment.title
                    }
                  </text>
                  <text
                    x={textX}
                    y={textY + 15}
                    fill="white"
                    fontSize="10"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle}, ${textX}, ${textY + 15})`}
                  >
                    {segment.percentage}%
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Center Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">SPIN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex space-x-4">
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className={`btn-primary flex items-center space-x-2 ${
            isSpinning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Play className="w-5 h-5" />
          <span>{isSpinning ? 'Spinning...' : 'Spin Wheel'}</span>
        </button>

        <button
          onClick={resetWheel}
          disabled={isSpinning}
          className="btn-secondary flex items-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Winner Display */}
      {winner && (
        <div className="glass-card p-6 max-w-md text-center animate-fade-in">
          <h3 className="text-xl font-bold text-accent mb-2">🎉 Winner!</h3>
          <h4 className="text-lg font-semibold text-fg mb-2">{winner.title}</h4>
          <p className="text-text-secondary text-sm mb-4">
            Selected with {winner.percentage}% probability
          </p>
          <div className="text-xs text-text-secondary">
            Spin completed at {new Date().toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
}

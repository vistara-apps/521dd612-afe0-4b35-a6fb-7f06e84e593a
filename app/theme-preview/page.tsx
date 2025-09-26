'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { SpinWheel } from '../components/SpinWheel';
import { IdeaCard } from '../components/IdeaCard';
import { DeploymentStatusFeed } from '../components/DeploymentStatusFeed';
import { useTheme } from '../components/ThemeProvider';
import { mockIdeas } from '../../lib/mockData';

const themes = [
  { id: 'default', name: 'Default (Warm Social)', description: 'Dark teal with coral accents' },
  { id: 'celo', name: 'Celo', description: 'Black with yellow accents' },
  { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
  { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
  { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue accents' },
];

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();
  const [selectedIdea] = useState(mockIdeas[0]);

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-fg mb-4">Theme Preview</h1>
          <p className="text-text-secondary">
            Preview different blockchain themes for the Agent Wheel app
          </p>
        </div>

        {/* Theme Selector */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-fg mb-4">Select Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id as any)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  theme === themeOption.id
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-white border-opacity-10 hover:border-accent hover:border-opacity-50'
                }`}
              >
                <h3 className="font-semibold text-fg">{themeOption.name}</h3>
                <p className="text-sm text-text-secondary mt-1">{themeOption.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wheel Preview */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-fg mb-4">Spin Wheel</h3>
            <div className="scale-75 origin-top">
              <SpinWheel />
            </div>
          </div>

          {/* Idea Card Preview */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-fg mb-4">Idea Card</h3>
              <IdeaCard idea={selectedIdea} variant="hover" />
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-fg mb-4">Deployment Feed</h3>
              <div className="max-h-64 overflow-hidden">
                <DeploymentStatusFeed />
              </div>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-fg mb-4">Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-bg rounded-lg mx-auto mb-2 border border-white border-opacity-20"></div>
              <p className="text-xs text-text-secondary">Background</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-surface rounded-lg mx-auto mb-2 border border-white border-opacity-20"></div>
              <p className="text-xs text-text-secondary">Surface</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-lg mx-auto mb-2"></div>
              <p className="text-xs text-text-secondary">Accent</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-2"></div>
              <p className="text-xs text-text-secondary">Primary</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-fg rounded-lg mx-auto mb-2 border border-gray-600"></div>
              <p className="text-xs text-text-secondary">Foreground</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-text-secondary rounded-lg mx-auto mb-2"></div>
              <p className="text-xs text-text-secondary">Secondary</p>
            </div>
          </div>
        </div>

        {/* Button Styles */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-fg mb-4">Button Styles</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
            <button className="btn-primary opacity-50 cursor-not-allowed">Disabled</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

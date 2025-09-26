'use client';

import { useState } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { Settings2, Users, Zap } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'compact';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const [activeTab, setActiveTab] = useState('wheel');
  const { theme, setTheme } = useTheme();

  const tabs = [
    { id: 'wheel', label: 'Wheel', icon: Zap },
    { id: 'ideas', label: 'Ideas', icon: Users },
    { id: 'admin', label: 'Admin', icon: Settings2 },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="glass-card border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-fg">Agent Wheel</h1>
                <p className="text-sm text-text-secondary">Democratize your team's ideas</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Selector */}
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="bg-surface text-fg px-3 py-2 rounded-lg border border-white border-opacity-10 text-sm"
              >
                <option value="default">Default</option>
                <option value="celo">Celo</option>
                <option value="solana">Solana</option>
                <option value="base">Base</option>
                <option value="coinbase">Coinbase</option>
              </select>
              
              <Wallet>
                <ConnectWallet>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8" />
                    <Name />
                  </div>
                </ConnectWallet>
              </Wallet>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="glass-card border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-accent text-accent'
                      : 'border-transparent text-text-secondary hover:text-fg'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-white border-opacity-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-text-secondary">
            <p>&copy; 2024 Agent Wheel. Built on Base with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

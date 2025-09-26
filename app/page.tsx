'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { SpinWheel } from './components/SpinWheel';
import { IdeaCard } from './components/IdeaCard';
import { DeploymentStatusFeed } from './components/DeploymentStatusFeed';
import { IdeaSubmissionForm } from './components/IdeaSubmissionForm';
import { mockIdeas } from '../lib/mockData';
import { Idea } from '../lib/types';
import { generateId } from '../lib/utils';
import { Zap, Lightbulb, TrendingUp, Users } from 'lucide-react';

export default function HomePage() {
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas);
  const [userVotes, setUserVotes] = useState<Record<string, number>>({});
  const [recentWinner, setRecentWinner] = useState<any>(null);

  const handleIdeaSubmit = (newIdea: { title: string; description: string }) => {
    const idea: Idea = {
      id: generateId(),
      title: newIdea.title,
      description: newIdea.description,
      submittedByUserId: 'current-user',
      createdAt: new Date(),
      votes: [],
      totalWeight: 0
    };

    setIdeas(prev => [idea, ...prev]);
  };

  const handleVote = (ideaId: string, weight: number) => {
    setUserVotes(prev => ({ ...prev, [ideaId]: weight }));
    
    setIdeas(prev => prev.map(idea => 
      idea.id === ideaId 
        ? { ...idea, totalWeight: idea.totalWeight + weight }
        : idea
    ));
  };

  const handleSpinComplete = (result: any) => {
    setRecentWinner(result.winner);
    // Here you would typically trigger the Zara Build API
    console.log('Spinning complete! Winner:', result.winner);
  };

  const totalIdeas = ideas.length;
  const totalVotes = ideas.reduce((sum, idea) => sum + idea.totalWeight, 0);
  const topIdea = ideas.reduce((top, idea) => 
    idea.totalWeight > top.totalWeight ? idea : top, ideas[0]
  );

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-fg">
            Democratize Your Team's Ideas
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Submit ideas, vote with weighted power, and let the wheel decide what gets built next.
            Complete transparency, automated deployment.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-accent bg-opacity-20 rounded-lg mx-auto mb-3">
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-fg">{totalIdeas}</div>
            <div className="text-sm text-text-secondary">Total Ideas</div>
          </div>
          
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary bg-opacity-20 rounded-lg mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-fg">{totalVotes}</div>
            <div className="text-sm text-text-secondary">Total Votes</div>
          </div>
          
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-400 bg-opacity-20 rounded-lg mx-auto mb-3">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-fg">{topIdea?.totalWeight || 0}</div>
            <div className="text-sm text-text-secondary">Top Idea Votes</div>
          </div>
          
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-400 bg-opacity-20 rounded-lg mx-auto mb-3">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-fg">3</div>
            <div className="text-sm text-text-secondary">Apps Deployed</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Wheel */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-fg mb-2">Agent Voting Wheel</h2>
                <p className="text-text-secondary">
                  When an admin spins the wheel, ideas are selected proportionally to their vote weight.
                  The winning idea triggers automated app generation and deployment.
                </p>
              </div>
              
              <SpinWheel onSpinComplete={handleSpinComplete} />
              
              {recentWinner && (
                <div className="mt-8 p-4 bg-accent bg-opacity-10 border border-accent rounded-lg">
                  <h3 className="font-semibold text-accent mb-2">🎉 Latest Winner</h3>
                  <p className="text-fg font-medium">{recentWinner.title}</p>
                  <p className="text-text-secondary text-sm mt-1">
                    Now being built and deployed automatically...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Deployment Feed */}
          <div className="space-y-6">
            <DeploymentStatusFeed />
          </div>
        </div>

        {/* Ideas Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-fg">Community Ideas</h2>
            <div className="text-sm text-text-secondary">
              Vote with weights 1-5 to influence selection probability
            </div>
          </div>

          {/* Idea Submission */}
          <IdeaSubmissionForm onSubmit={handleIdeaSubmit} />

          {/* Ideas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ideas.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                variant="hover"
                onVote={handleVote}
                userVote={userVotes[idea.id]}
              />
            ))}
          </div>
        </div>

        {/* Audit Trail */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-fg mb-4">Transparency & Audit Trail</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-accent mb-2">Voting Records</h4>
              <p className="text-text-secondary">
                All votes are recorded with voter ID, weight, timestamp, and provenance for complete transparency.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-accent mb-2">Spin Results</h4>
              <p className="text-text-secondary">
                Each wheel spin is logged with a deterministic seed, ensuring reproducible and auditable results.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-accent mb-2">Deployment Logs</h4>
              <p className="text-text-secondary">
                Full build and deployment logs are maintained, with real-time status updates via webhooks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

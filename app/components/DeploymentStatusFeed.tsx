'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Loader, ExternalLink } from 'lucide-react';
import { Deployment } from '../../lib/types';
import { mockDeployments } from '../../lib/mockData';
import { formatDate } from '../../lib/utils';

interface DeploymentStatusFeedProps {
  variant?: 'queued' | 'building' | 'deployed' | 'failed';
}

export function DeploymentStatusFeed({ variant }: DeploymentStatusFeedProps) {
  const [deployments, setDeployments] = useState<Deployment[]>(mockDeployments);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDeployments(prev => prev.map(deployment => {
        if (deployment.status === 'building' && Math.random() > 0.7) {
          return {
            ...deployment,
            status: Math.random() > 0.8 ? 'failed' : 'deployed',
            endTime: new Date(),
            deployUrl: deployment.status === 'building' ? 'https://example-app.vercel.app' : deployment.deployUrl,
            logs: [
              ...deployment.logs,
              deployment.status === 'building' ? 'Deployment successful!' : 'Build failed!'
            ]
          };
        }
        return deployment;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: Deployment['status']) => {
    switch (status) {
      case 'queued':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'building':
        return <Loader className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'deployed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusColor = (status: Deployment['status']) => {
    switch (status) {
      case 'queued':
        return 'border-yellow-400 bg-yellow-400 bg-opacity-10';
      case 'building':
        return 'border-blue-400 bg-blue-400 bg-opacity-10';
      case 'deployed':
        return 'border-green-400 bg-green-400 bg-opacity-10';
      case 'failed':
        return 'border-red-400 bg-red-400 bg-opacity-10';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-fg">Deployment Status</h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Live Feed</span>
        </div>
      </div>

      <div className="space-y-3">
        {deployments.map((deployment) => (
          <div
            key={deployment.id}
            className={`glass-card p-4 border-l-4 ${getStatusColor(deployment.status)} animate-slide-up`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(deployment.status)}
                <div>
                  <h4 className="font-medium text-fg capitalize">{deployment.status}</h4>
                  <p className="text-sm text-text-secondary">
                    Idea ID: {deployment.ideaId}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-text-secondary">
                  Started: {formatDate(deployment.startTime)}
                </p>
                {deployment.endTime && (
                  <p className="text-xs text-text-secondary">
                    Ended: {formatDate(deployment.endTime)}
                  </p>
                )}
              </div>
            </div>

            {/* Deployment URL */}
            {deployment.deployUrl && deployment.status === 'deployed' && (
              <div className="mb-3">
                <a
                  href={deployment.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-accent hover:text-opacity-80 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">View Deployed App</span>
                </a>
              </div>
            )}

            {/* Logs */}
            <div className="bg-surface bg-opacity-50 rounded-lg p-3">
              <h5 className="text-xs font-medium text-text-secondary mb-2">Build Logs:</h5>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {deployment.logs.map((log, index) => (
                  <p key={index} className="text-xs font-mono text-text-secondary">
                    {log}
                  </p>
                ))}
              </div>
            </div>

            {/* Progress Bar for Building Status */}
            {deployment.status === 'building' && (
              <div className="mt-3">
                <div className="w-full bg-surface rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {deployments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-text-secondary">No deployments yet. Spin the wheel to get started!</p>
        </div>
      )}
    </div>
  );
}

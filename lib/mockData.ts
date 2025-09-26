import { Idea, Vote, Deployment, Spin } from './types';
import { generateId } from './utils';

export const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'AI-Powered Code Review Bot',
    description: 'An intelligent bot that automatically reviews pull requests and suggests improvements using advanced AI models.',
    submittedByUserId: 'user1',
    createdAt: new Date('2024-01-15'),
    votes: [],
    totalWeight: 85
  },
  {
    id: '2',
    title: 'Decentralized Task Management',
    description: 'A blockchain-based task management system where team members can earn tokens for completing tasks.',
    submittedByUserId: 'user2',
    createdAt: new Date('2024-01-16'),
    votes: [],
    totalWeight: 72
  },
  {
    id: '3',
    title: 'Smart Contract Auditor',
    description: 'Automated tool that scans smart contracts for common vulnerabilities and security issues.',
    submittedByUserId: 'user3',
    createdAt: new Date('2024-01-17'),
    votes: [],
    totalWeight: 91
  },
  {
    id: '4',
    title: 'NFT Marketplace for Digital Art',
    description: 'A curated marketplace specifically for digital artists to mint and sell their NFT collections.',
    submittedByUserId: 'user4',
    createdAt: new Date('2024-01-18'),
    votes: [],
    totalWeight: 63
  },
  {
    id: '5',
    title: 'DeFi Yield Optimizer',
    description: 'Automatically finds and moves funds to the highest-yielding DeFi protocols while managing risk.',
    submittedByUserId: 'user5',
    createdAt: new Date('2024-01-19'),
    votes: [],
    totalWeight: 78
  },
  {
    id: '6',
    title: 'Social Trading Platform',
    description: 'Follow and copy trades from successful crypto traders with built-in risk management.',
    submittedByUserId: 'user6',
    createdAt: new Date('2024-01-20'),
    votes: [],
    totalWeight: 56
  }
];

export const mockDeployments: Deployment[] = [
  {
    id: '1',
    ideaId: '1',
    status: 'deployed',
    deployUrl: 'https://ai-code-reviewer.vercel.app',
    startTime: new Date('2024-01-20T10:00:00Z'),
    endTime: new Date('2024-01-20T10:15:00Z'),
    logs: [
      'Build started...',
      'Installing dependencies...',
      'Building application...',
      'Deploying to production...',
      'Deployment successful!'
    ]
  },
  {
    id: '2',
    ideaId: '3',
    status: 'building',
    startTime: new Date('2024-01-21T14:30:00Z'),
    logs: [
      'Build started...',
      'Installing dependencies...',
      'Building application...'
    ]
  }
];

export const mockSpins: Spin[] = [
  {
    id: '1',
    winningIdeaId: '1',
    seed: 'spin_2024_01_20_001',
    timestamp: new Date('2024-01-20T09:45:00Z'),
    adminUserId: 'admin1'
  }
];

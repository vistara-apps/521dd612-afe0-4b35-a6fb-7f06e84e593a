export interface User {
  id: string;
  walletAddress: string;
  role: 'user' | 'admin';
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  submittedByUserId: string;
  createdAt: Date;
  votes: Vote[];
  totalWeight: number;
}

export interface Vote {
  id: string;
  ideaId: string;
  voterUserId: string;
  weight: number;
  timestamp: Date;
  provenance: string;
}

export interface Spin {
  id: string;
  winningIdeaId: string;
  seed: string;
  timestamp: Date;
  adminUserId: string;
  winningIdea?: Idea;
}

export interface Deployment {
  id: string;
  ideaId: string;
  status: 'queued' | 'building' | 'deployed' | 'failed';
  deployUrl?: string;
  startTime: Date;
  endTime?: Date;
  logs: string[];
  webhookPayload?: any;
}

export interface WheelSegment {
  id: string;
  title: string;
  weight: number;
  color: string;
  startAngle: number;
  endAngle: number;
}

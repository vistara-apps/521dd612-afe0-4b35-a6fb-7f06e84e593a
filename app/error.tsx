'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-red-500 bg-opacity-20 rounded-full mx-auto flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-fg mb-2">Something went wrong!</h2>
          <p className="text-text-secondary">
            We encountered an error while loading the Agent Wheel. Please try again.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="btn-primary w-full"
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="btn-secondary w-full"
          >
            Go Home
          </button>
        </div>

        {error.digest && (
          <p className="text-xs text-text-secondary">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}

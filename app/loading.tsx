export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-accent rounded-full mx-auto animate-pulse"></div>
        <h2 className="text-xl font-semibold text-fg">Loading Agent Wheel...</h2>
        <p className="text-text-secondary">Preparing your collaborative innovation space</p>
      </div>
    </div>
  );
}

import VotingGrid from '@/components/VotingGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-[rgb(19,19,19)]">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Vote for Feedback Loop Candidates
        </h1>
        
        <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          Vote for who you want to see in the next feedback loop. The candidates with the most votes will be featured in upcoming feedback loop sessions.
        </p>
        
        <VotingGrid />
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

interface Candidate {
  id: string;
  name: string;
  description: string;
  votes: number;
  imageUrl?: string;
}

const initialCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Donald J. Trump',
    description: 'President of the United States',
    votes: 0,
    imageUrl: '/45_donald_trump_w-1250.jpg'
  },
  {
    id: '2',
    name: 'Joe Biden',
    description: 'President of the United States',
    votes: 0,
    imageUrl: '/Joe_Biden_presidential_portrait.jpg'
  },
  {
    id: '3',
    name: 'Elon Musk',
    description: 'CEO of Tesla, SpaceX, and X',
    votes: 0,
    imageUrl: '/images (23).jpg'
  },
  {
    id: '4',
    name: 'Vitalik Buterin',
    description: 'Ethereum Founder',
    votes: 0,
    imageUrl: '/images (24).jpg'
  }
];

const VotingGrid = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState('');
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  // Calculate time remaining until 10:00 PM EST
  const calculateTimeRemaining = () => {
    const now = new Date();
    
    // Create a date object for 10:00 PM EST today
    const targetTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      22, // 10 PM
      0,  // 0 minutes
      0   // 0 seconds
    );
    
    // If it's already past 10 PM, set target to tomorrow
    if (now.getHours() >= 22) {
      targetTime.setDate(targetTime.getDate() + 1);
    }
    
    const diff = targetTime.getTime() - now.getTime();
    
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Format as HH:MM:SS if hours > 0, otherwise MM:SS
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  // Update timer every second
  useEffect(() => {
    setTimeRemaining(calculateTimeRemaining());
    
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Load voting data from local storage on component mount
  useEffect(() => {
    const storedVote = localStorage.getItem('votedCandidate');
    if (storedVote) {
      setVotedFor(storedVote);
    }
    
    // Load candidates from backend
    const fetchCandidates = async () => {
      try {
        const response = await fetch('/api/candidates');
        if (response.ok) {
          const data = await response.json();
          // If we have at least 4 candidates from the backend, use them
          if (data && data.length >= 4) {
            // Always use our initial candidates for names and descriptions, but keep votes from the backend
            const updatedCandidates = data.slice(0, 4).map((candidate: any, index: number) => {
              // Find the matching initial candidate by index
              const initialCandidate = initialCandidates[index];
              
              return {
                id: candidate._id || candidate.id,
                // Always use our initial values for name and description
                name: initialCandidate.name,
                description: initialCandidate.description,
                // Keep votes from the backend
                votes: candidate.votes || 0,
                // Always use our initial image
                imageUrl: initialCandidate.imageUrl
              };
            });
            
            setCandidates(updatedCandidates);
          }
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    
    fetchCandidates();
  }, []);

  const handleVote = async (candidateId: string) => {
    // If user has already voted, don't allow another vote
    if (votedFor) {
      setError('You have already voted');
      return;
    }
    
    setIsVoting(true);
    setError('');
    
    try {
      // Call the API to register the vote
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidateId }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to vote');
      }
      
      // Update local state
      setCandidates(prev => 
        prev.map(candidate => 
          candidate.id === candidateId 
            ? { ...candidate, votes: candidate.votes + 1 } 
            : candidate
        )
      );
      
      // Save vote to local storage
      localStorage.setItem('votedCandidate', candidateId);
      setVotedFor(candidateId);
      
    } catch (err) {
      console.error('Error voting:', err);
      setError('Failed to vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  // Calculate total votes
  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Timer */}
      <div className="mb-8 text-center">
        <div className="inline-block bg-[rgb(25,25,25)] rounded-lg px-4 py-2">
          <span className="text-gray-300 mr-2">Voting ends in:</span>
          <span className="text-white font-mono font-bold">{timeRemaining}</span>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-6 text-center text-sm">
          {error}
        </div>
      )}
      
      {/* Candidates in a horizontal row */}
      <div className="flex flex-wrap justify-center gap-4">
        {candidates.map((candidate) => (
          <div 
            key={candidate.id} 
            className="bg-[rgb(25,25,25)] rounded-lg overflow-hidden w-64 shadow-lg"
          >
            {/* Candidate image */}
            <div className="h-40 w-full bg-[rgb(35,35,35)] overflow-hidden">
              {candidate.imageUrl ? (
                <img 
                  src={candidate.imageUrl} 
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-4xl font-bold text-gray-500">
                    {candidate.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 flex flex-col h-[180px]">
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-white mb-1">{candidate.name}</h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{candidate.description}</p>
                
                {/* Vote count and percentage */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>{candidate.votes} votes</span>
                    <span>{totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-red-500 h-1.5 rounded-full" 
                      style={{ width: `${totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Sleeker vote button - now at the bottom of the card */}
              <div className="flex justify-center mt-auto">
                <button
                  onClick={() => handleVote(candidate.id)}
                  disabled={isVoting || votedFor !== null}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    isVoting 
                      ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                      : votedFor === candidate.id
                        ? 'bg-green-500 text-white'
                        : votedFor !== null
                          ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {isVoting 
                    ? 'Voting...' 
                    : votedFor === candidate.id 
                      ? '✓ Voted' 
                      : votedFor !== null 
                        ? 'Already Voted' 
                        : 'Vote'
                  }
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingGrid;

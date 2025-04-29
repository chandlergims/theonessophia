'use client';

import { useState } from 'react';

interface Candidate {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  votes: number;
}

interface CandidateCardProps {
  candidate: Candidate;
  onVote: (candidateId: string) => void;
  isVoting: boolean;
}

const CandidateCard = ({ candidate, onVote, isVoting }: CandidateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  return (
    <div 
      className={`bg-[rgb(25,25,25)] border border-gray-700 rounded-lg overflow-hidden transition-all duration-200 ${
        isHovered ? 'transform scale-105 shadow-lg' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {candidate.imageUrl && !imageError ? (
        <div className="relative h-48 w-full">
          <img
            src={candidate.imageUrl}
            alt={candidate.name}
            className="w-full h-48 object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="h-48 w-full bg-[rgb(35,35,35)] flex items-center justify-center">
          <div className="text-5xl font-bold text-gray-500">
            {candidate.name.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{candidate.name}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{candidate.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-gray-400">Votes:</span>
            <span className="text-white font-bold">{candidate.votes}</span>
          </div>
          
          <button
            onClick={() => onVote(candidate._id)}
            disabled={isVoting}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isVoting
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isVoting ? 'Voting...' : 'Vote'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;

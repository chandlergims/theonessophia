'use client';

import React, { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Here you would implement actual search functionality
  };

  return (
    <div className="max-w-6xl mx-auto pt-8 pb-4 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Feedback Loop Archives
      </h1>
      
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-8">
        <form onSubmit={handleSearch} className="flex">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              className="focus:ring-gray-500 focus:border-gray-500 block w-full pl-4 pr-10 py-2 text-sm bg-gray-700 border-0 rounded-l-md text-white placeholder-gray-400"
              placeholder="Search for feedback loops"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-r-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>
      
      {/* Feedback Loops section */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Feedback Loops
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-gray-700 rounded-lg p-3 flex items-center">
              <div className="bg-gray-600 h-12 w-12 rounded-md flex-shrink-0"></div>
              <div className="ml-3">
                <div className="font-medium text-white">Feedback Loop #{item}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

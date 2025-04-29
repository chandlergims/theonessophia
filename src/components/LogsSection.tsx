'use client';

import React, { useState } from 'react';

const LogsSection = () => {
  // Generate dates for today and the next few days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        id: i,
        date: date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        // Generate between 80-120 placeholder images for each date
        imageCount: Math.floor(Math.random() * 40) + 80
      });
    }
    
    return dates;
  };

  const dateEntries = generateDates();
  
  // State for tracking which date sections are expanded
  const [expandedDates, setExpandedDates] = useState<number[]>([]);
  // State for tracking how many images to show for each date
  const [visibleImages, setVisibleImages] = useState<Record<number, number>>({});

  // Toggle date expansion
  const toggleDateExpansion = (dateId: number) => {
    setExpandedDates(prev => {
      if (prev.includes(dateId)) {
        return prev.filter(id => id !== dateId);
      } else {
        return [...prev, dateId];
      }
    });
    
    // Initialize visible images count if not already set
    if (!visibleImages[dateId]) {
      setVisibleImages(prev => ({
        ...prev,
        [dateId]: 12 // Initially show 12 images
      }));
    }
  };

  // Load more images for a specific date
  const loadMoreImages = (dateId: number, totalImages: number) => {
    setVisibleImages(prev => {
      const currentVisible = prev[dateId] || 12;
      const newVisible = Math.min(currentVisible + 12, totalImages);
      return {
        ...prev,
        [dateId]: newVisible
      };
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Feedback Loop Logs
      </h2>
      
      <div className="space-y-4">
        {dateEntries.map((entry) => {
          const isExpanded = expandedDates.includes(entry.id);
          const visibleCount = visibleImages[entry.id] || 0;
          const hasMoreToLoad = visibleCount < entry.imageCount;
          
          return (
            <div key={entry.id} className="bg-white shadow overflow-hidden rounded-lg">
              <button 
                onClick={() => toggleDateExpansion(entry.id)}
                className="w-full px-4 py-5 sm:px-6 bg-gray-50 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {entry.date}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {entry.imageCount} feedback loop regeneration images
                  </p>
                </div>
                <div className="text-indigo-500">
                  <svg 
                    className={`h-6 w-6 transform ${isExpanded ? 'rotate-180' : ''} transition-transform duration-200`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {isExpanded && (
                <div className="border-t border-gray-200">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {Array.from({ length: visibleCount }).map((_, idx) => {
                        const loopNumber = idx + 1;
                        return (
                          <div 
                            key={idx} 
                            className="bg-gray-100 rounded-lg p-2 flex flex-col items-center justify-center aspect-square"
                          >
                            <div className="text-gray-400 text-xs mb-1">Image placeholder</div>
                            <div className="text-gray-500 text-xs">Loop #{loopNumber}</div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {hasMoreToLoad && (
                      <div className="mt-6 text-center">
                        <button
                          onClick={() => loadMoreImages(entry.id, entry.imageCount)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Load More ({visibleCount} of {entry.imageCount})
                        </button>
                      </div>
                    )}
                    
                    <div className="mt-4 text-sm text-gray-500 border-t border-gray-200 pt-4">
                      <p className="text-center">Click on an image to view the full feedback loop regeneration process.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogsSection;

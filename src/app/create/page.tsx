'use client';

import { useState } from 'react';

export default function CreateFeedbackLoop() {
  const [iterations, setIterations] = useState(5);
  
  return (
    <div className="min-h-screen bg-[rgb(19,19,19)]">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Create Feedback Loop
        </h1>
        
        <div className="bg-[rgb(25,25,25)] rounded-lg p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-gray-300 mb-6">
              The feedback loop creation feature will be available soon. This feature will be token gated.
            </p>
            
            {/* Preview of the interface */}
            <div className="bg-[rgb(35,35,35)] rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-medium text-white mb-4 text-left">Preview:</h3>
              
              <div className="mb-6">
                <label className="block text-lg font-medium text-white mb-2 text-left">
                  Upload image
                </label>
                <div className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-not-allowed">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-400">Click to upload (disabled)</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-lg font-medium text-white mb-2 text-left">
                  Number of iterations
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={iterations}
                  onChange={(e) => setIterations(parseInt(e.target.value))}
                  className="w-full h-2 bg-[rgb(45,45,45)] rounded-lg appearance-none cursor-pointer accent-red-500"
                  style={{ colorScheme: 'dark' }}
                />
                <div className="text-white text-center mt-2">{iterations}</div>
              </div>
              
              <div className="flex justify-center pt-4">
                <button
                  disabled={true}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-[rgb(45,45,45)] text-gray-400 cursor-not-allowed border border-gray-700"
                >
                  Coming Soon
                </button>
              </div>
            </div>
            
            <div className="space-y-4 text-left mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">1</div>
                <p className="ml-3 text-gray-300">Upload your image to start the feedback loop process</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">2</div>
                <p className="ml-3 text-gray-300">Set the number of iterations you want to generate</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">3</div>
                <p className="ml-3 text-gray-300">Our system will generate multiple iterations based on your image</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">4</div>
                <p className="ml-3 text-gray-300">Save your favorite iterations to your account</p>
              </div>
            </div>
            
            <div className="inline-block bg-[rgb(35,35,35)] rounded-lg px-4 py-2 text-sm text-gray-300">
              Token gating ensures high-quality submissions and prevents abuse
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

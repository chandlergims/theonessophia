'use client';

import { useState } from 'react';

interface AddCandidateFormProps {
  onAddCandidate: () => void;
}

const AddCandidateForm = ({ onAddCandidate }: AddCandidateFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          imageUrl: imageUrl.trim() || '',
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add candidate');
      }
      
      // Reset form
      setName('');
      setDescription('');
      setImageUrl('');
      setIsFormVisible(false);
      
      // Notify parent component
      onAddCandidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8">
      {!isFormVisible ? (
        <button
          onClick={() => setIsFormVisible(true)}
          className="w-full py-3 bg-[rgb(25,25,25)] hover:bg-[rgb(35,35,35)] text-white font-medium rounded-lg border border-gray-700 flex items-center justify-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Candidate
        </button>
      ) : (
        <div className="bg-[rgb(25,25,25)] border border-gray-700 rounded-lg p-4">
          <h3 className="text-xl font-bold text-white mb-4">Add New Candidate</h3>
          
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-[rgb(35,35,35)] border border-gray-600 rounded-md text-white focus:ring-gray-500 focus:border-gray-500"
                placeholder="Enter candidate name"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-[rgb(35,35,35)] border border-gray-600 rounded-md text-white focus:ring-gray-500 focus:border-gray-500"
                placeholder="Enter candidate description"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">
                Image URL (optional)
              </label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 bg-[rgb(35,35,35)] border border-gray-600 rounded-md text-white focus:ring-gray-500 focus:border-gray-500"
                placeholder="Enter image URL (leave empty for initial letter)"
                disabled={isSubmitting}
              />
              <p className="mt-1 text-xs text-gray-400">
                If no image URL is provided, the candidate's initial letter will be displayed
              </p>
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="px-4 py-2 bg-[rgb(35,35,35)] text-white rounded-md hover:bg-[rgb(45,45,45)]"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Candidate'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCandidateForm;

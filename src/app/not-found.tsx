import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[rgb(19,19,19)] flex items-center justify-center">
      <div className="max-w-md w-full bg-[rgb(25,25,25)] rounded-lg p-8 shadow-lg text-center">
        <h2 className="text-3xl font-bold text-white mb-4">404 - Page Not Found</h2>
        <p className="text-gray-300 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

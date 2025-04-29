import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full bg-[rgb(19,19,19)] shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center pl-0">
            <Link href="/" className="font-bold text-2xl text-red-500">
              Regenesis
            </Link>
          </div>
          <div className="flex items-center space-x-4 pr-0">
            <Link 
              href="/logs" 
              className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logs
            </Link>
            <Link 
              href="/create" 
              className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Create Feedback Loop
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <a 
              href="https://x.com/RegenesisLLM" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#111827] flex flex-col items-center justify-center px-4 text-white">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-[#FF8C00]">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-400 mt-2">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6 space-y-3">
          <Link
            to="/"
            className="inline-block bg-[#FF8C00] text-white px-6 py-3 rounded-md font-medium hover:bg-[#e67e00] transition-colors"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="block w-full border border-gray-600 text-gray-300 px-6 py-3 rounded-md font-medium hover:border-[#FF8C00] hover:text-[#FF8C00] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
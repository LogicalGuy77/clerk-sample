import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full space-y-4 text-center">
        <h1 className="text-3xl font-bold text-red-600">404</h1>
        <p className="text-xl font-semibold text-gray-800">Page Not Found</p>
        <p className="text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

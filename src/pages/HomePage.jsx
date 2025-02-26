import { SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full space-y-4 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">
          Welcome to My App
        </h1>
        <p className="text-gray-600">Please sign in to access your dashboard</p>
        <div className="mt-4">
          <SignInButton mode="modal">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              Sign In
            </button>
          </SignInButton>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <Link to="/about" className="underline hover:text-indigo-600">
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
}

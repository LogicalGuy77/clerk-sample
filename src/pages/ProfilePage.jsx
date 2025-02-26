import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Profile
            </h1>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Name:</span>{" "}
                  <span>{user?.fullName || "Not provided"}</span>
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span>{" "}
                  <span>
                    {user?.primaryEmailAddress?.emailAddress || "Not provided"}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">User ID:</span>{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                    {user?.id}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

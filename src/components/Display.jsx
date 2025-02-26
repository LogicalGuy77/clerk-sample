import { useAuth, UserButton } from "@clerk/clerk-react";

export default function Display() {
  const { userId, sessionId } = useAuth();
  console.log("UserID", userId);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome!</h1>
          <UserButton />
        </div>

        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-medium">User ID:</span>{" "}
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {userId}
            </span>
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Session ID:</span>{" "}
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {sessionId}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

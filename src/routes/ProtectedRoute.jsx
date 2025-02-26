import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // If user is not signed in, redirect to the home page
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  // Render child routes if user is authenticated
  return <Outlet />;
}

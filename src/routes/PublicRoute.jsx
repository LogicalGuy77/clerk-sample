import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute({ redirectAuthenticated = false }) {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // If redirectAuthenticated is true and user is signed in,
  // redirect to the dashboard
  if (redirectAuthenticated && isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render child routes
  return <Outlet />;
}

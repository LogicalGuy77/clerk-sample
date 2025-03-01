import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import FileManager from "../pages/FileManager";
import Analysis from "../pages/Analysis";

// Define all routes in a centralized location
const router = createBrowserRouter([
  // Public routes (accessible to all users)
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/about",
        element: <div>About Page</div>,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },

  // Public routes that redirect authenticated users
  {
    element: <PublicRoute redirectAuthenticated />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },

  // Protected routes (only for authenticated users)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/file",
        element: <FileManager />,
      },
      {
        path: "/analysis",
        element: <Analysis />,
      },
    ],
  },
]);

export default router;

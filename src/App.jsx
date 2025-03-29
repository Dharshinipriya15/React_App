import React from "react"; // ✅ Add this import
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import UserListPage from "./pages/UserListPage";
import EditUser from "./pages/EditUser";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/users", element: <UserListPage /> },
  { path: "/edit/:id", element: <EditUser /> },
]);

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;

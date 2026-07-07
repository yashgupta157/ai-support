import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import UploadLogsPage from "./pages/UploadLogs";
import LogHistoryPage from "./pages/LogHistory";
import Commands from "./pages/Commands";
import SavedCommands from "./pages/SavedCommads";
import Security from "./pages/Security";
import Network from "./pages/Network";
import Devices from "./pages/Devices";
import Settings from "./pages/Settings";
import Tickets from "./pages/Tickets";
import Users from "./pages/Users";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Redirect */}

        <Route
          path="/"
          element={<Navigate to="/register" replace />}
        />

        {/* Public Routes */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/chat"
            element={<Chat />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/upload"
            element={<UploadLogsPage />}
          />

          <Route
            path="/logs"
            element={<LogHistoryPage />}
          />

          <Route
            path="/commands"
            element={<Commands />}
          />

          <Route
            path="/saved-commands"
            element={<SavedCommands />}
          />

          <Route
            path="/security"
            element={<Security />}
          />

          <Route
            path="/network"
            element={<Network />}
          />

          <Route
            path="/devices"
            element={<Devices />}
          />

          <Route
            path="/tickets"
            element={<Tickets />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

          <Route
            path="/users"
            element={<Users />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <div className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950">

          <Header
            setSidebarOpen={setSidebarOpen}
          />

        </div>

        {/* Page */}
        <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 lg:px-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}
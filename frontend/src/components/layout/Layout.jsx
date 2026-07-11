import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-white">

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex flex-1 min-w-0 flex-col overflow-hidden">

        {/* Header */}
        <div className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950">
          <Header setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Page */}
        <main className="flex-1 overflow-y-auto bg-slate-950 px-4 py-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
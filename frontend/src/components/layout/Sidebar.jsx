import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Upload,
  Terminal,
  Settings,
  ShieldCheck,
  Star,
  Globe,
  Users,
  X,
} from "lucide-react";

import SidebarLogo from "./SidebarLogo";
import SearchBar from "./SearchBar";
import ConversationList from "./ConversationList";
import SidebarMenu from "./SidebarMenu";
import UserCard from "./UserCard";

import { useConversation } from "../../context/ConversationContext";
import { useSearch } from "../../context/SearchContext";
import { useAuthContext } from "../../context/AuthContext";

const menuItems = [
  {
    icon: <LayoutDashboard size={20} />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <MessageSquare size={20} />,
    title: "AI Chat",
    path: "/chat",
  },
  {
    icon: <Upload size={20} />,
    title: "Upload Logs",
    path: "/upload",
  },
  {
    icon: <Users size={20} />,
    title: "Users",
    path: "/users",
  },
  {
    icon: <Terminal size={20} />,
    title: "Commands",
    path: "/commands",
  },
  {
    icon: <Star size={20} />,
    title: "Saved Commands",
    path: "/saved-commands",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Security",
    path: "/security",
  },
  {
    icon: <Globe size={20} />,
    title: "Network Toolkit",
    path: "/network",
  },
  {
    icon: <Terminal size={20} />,
    title: "Device Management",
    path: "/devices",
  },
  {
    icon: <FileText size={20} />,
    title: "Tickets",
    path: "/tickets",
  },
  {
    icon: <Settings size={20} />,
    title: "Settings",
    path: "/settings",
  },
];

export default function Sidebar({ open, setOpen }) {
  const { user } = useAuthContext();

  const {
    conversations,
    selectedConversation,
    setSelectedConversation,
    loadMessages,
    renameConversation,
    deleteConversation,
  } = useConversation();

  const { search } = useSearch();

  const filteredMenuItems = menuItems.filter((item) =>
    item.path === "/users" ? user?.role === "admin" : true
  );

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-80 max-w-[85vw]
          bg-slate-950 border-r border-slate-800
          flex flex-col
          overflow-hidden
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:w-80
        `}
      >
        {/* Mobile Close */}
        <div className="flex justify-end p-4 lg:hidden shrink-0">
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            <X size={22} />
          </button>
        </div>

        {/* Logo */}
        <div className="shrink-0">
          <SidebarLogo />
        </div>

        {/* Search */}
        <div className="shrink-0">
          <SearchBar />
        </div>

        {/* Scrollable Area */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Conversations */}
          <div className="px-4">
            <h3 className="mb-3 text-xs uppercase text-slate-500">
              Conversations
            </h3>

            <ConversationList
              conversations={conversations}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
              loadMessages={loadMessages}
              renameConversation={renameConversation}
              deleteConversation={deleteConversation}
              search={search}
            />
          </div>

          {/* Menu */}
          <div className="mt-6 border-t border-slate-800 px-4 pt-4">
            <SidebarMenu menuItems={filteredMenuItems} />
          </div>
        </div>

        {/* Fixed Bottom */}
        <div className="shrink-0">
          <UserCard />
        </div>
      </aside>
    </>
  );
}
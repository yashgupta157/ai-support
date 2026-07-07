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
import NewChatButton from "./NewChatButton";
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
    newConversation,
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
    fixed left-0 top-0 z-50
    h-screen w-80
    bg-slate-950
    border-r border-slate-800
    flex flex-col
    transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    lg:static
    lg:translate-x-0
  `}
>
        {/* Mobile Close */}
        <div className="flex justify-end p-4 lg:hidden">
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            <X size={22} />
          </button>
        </div>

        <SidebarLogo />

        <SearchBar />

        <NewChatButton newConversation={newConversation} />

        {/* Conversations */}
<div
  className="flex-1 overflow-y-auto min-h-0 px-4"
  style={{ WebkitOverflowScrolling: "touch" }}
>          <h3 className="mb-3 text-xs uppercase text-slate-500">
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
        <div className="border-t border-slate-800 px-4 py-3 overflow-y-auto max-h-72">
          <SidebarMenu menuItems={filteredMenuItems} />
        </div>

        {/* User */}
        <UserCard />
      </aside>
    </>
  );
}
import {
  MessageSquare,
  FileText,
  Terminal,
  CalendarDays,
} from "lucide-react";

import StatCard from "./StatCard";

export default function DashboardCards({
  stats,
  loading,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Conversations"
        value={loading ? 0 : stats.totalConversations}
        icon={<MessageSquare size={30} className="text-white" />}
        color="bg-cyan-600"
      />

      <StatCard
        title="Logs Uploaded"
        value={loading ? 0 : stats.logsUploaded}
        icon={<FileText size={30} className="text-white" />}
        color="bg-green-600"
      />

      <StatCard
        title="Messages"
        value={loading ? 0 : stats.totalMessages}
        icon={<Terminal size={30} className="text-white" />}
        color="bg-purple-600"
      />

      <StatCard
        title="Today's Messages"
        value={loading ? 0 : stats.todayMessages}
        icon={<CalendarDays size={30} className="text-white" />}
        color="bg-yellow-500"
      />

    </div>
  );
}
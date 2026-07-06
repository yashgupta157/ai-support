import {
  User,
  UserCog,
  Laptop,
  Calendar,
  Flag,
  CircleDot,
} from "lucide-react";

export default function TicketInfo({ ticket }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

      {/* Reporter */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <User size={18} />
          <span>Reporter</span>
        </div>

        <h3 className="text-lg font-semibold">
          {ticket.reporter?.name || "Unknown"}
        </h3>

        <p className="text-sm text-slate-500">
          {ticket.reporter?.email}
        </p>

      </div>

      {/* Assignee */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <UserCog size={18} />
          <span>Assigned To</span>
        </div>

        <h3 className="text-lg font-semibold">
          {ticket.assignee?.name || "Unassigned"}
        </h3>

        <p className="text-sm text-slate-500">
          {ticket.assignee?.email || ""}
        </p>

      </div>

      {/* Device */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <Laptop size={18} />
          <span>Device</span>
        </div>

        <h3 className="text-lg font-semibold">
          {ticket.device?.displayName ||
            ticket.device?.hostname ||
            "No Device"}
        </h3>

        <p className="text-sm text-slate-500">
          {ticket.device?.ipAddress || ""}
        </p>

      </div>

      {/* Created */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <Calendar size={18} />
          <span>Created</span>
        </div>

        <h3 className="text-lg font-semibold">
          {new Date(ticket.createdAt).toLocaleDateString()}
        </h3>

        <p className="text-sm text-slate-500">
          {new Date(ticket.createdAt).toLocaleTimeString()}
        </p>

      </div>

      {/* Priority */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <Flag size={18} />
          <span>Priority</span>
        </div>

        <h3 className="text-lg font-semibold capitalize">
          {ticket.priority}
        </h3>

      </div>

      {/* Status */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <CircleDot size={18} />
          <span>Status</span>
        </div>

        <h3 className="text-lg font-semibold capitalize">
          {ticket.status.replace("_", " ")}
        </h3>

      </div>

    </div>
  );
}
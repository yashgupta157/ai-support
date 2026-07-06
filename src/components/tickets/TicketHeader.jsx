import { AlertCircle, CheckCircle2, Clock3, ShieldAlert } from "lucide-react";

export default function TicketHeader({ ticket }) {
  const priorityColor = {
    low: "bg-green-600",
    medium: "bg-yellow-600",
    high: "bg-orange-600",
    critical: "bg-red-600",
  };

  const statusColor = {
    open: "bg-blue-600",
    in_progress: "bg-purple-600",
    resolved: "bg-green-600",
    closed: "bg-gray-600",
  };

  const statusIcon = {
    open: <AlertCircle size={16} />,
    in_progress: <Clock3 size={16} />,
    resolved: <CheckCircle2 size={16} />,
    closed: <ShieldAlert size={16} />,
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-start justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            {ticket.title}
          </h1>

          <p className="mt-3 text-slate-400">
            {ticket.description}
          </p>

        </div>

        <div className="flex gap-3">

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${priorityColor[ticket.priority]}`}
          >
            {ticket.priority.toUpperCase()}
          </span>

          <span
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white ${statusColor[ticket.status]}`}
          >
            {statusIcon[ticket.status]}
            {ticket.status.replace("_", " ")}
          </span>

        </div>

      </div>

    </div>
  );
}
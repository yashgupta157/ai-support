import {
  CheckCircle,
  Clock,
  UserPlus,
  MessageSquare,
  Sparkles,
  Archive,
  CircleDot,
} from "lucide-react";

export default function TicketTimeline({ ticket }) {
  function getIcon(event) {
    if (event.startsWith("status"))
      return <CheckCircle size={18} className="text-green-400" />;

    if (event === "ticket_created")
      return <CircleDot size={18} className="text-blue-400" />;

    if (event === "ticket_assigned")
      return <UserPlus size={18} className="text-purple-400" />;

    if (event === "comment_added")
      return <MessageSquare size={18} className="text-cyan-400" />;

    if (
      event.includes("reclassified") ||
      event.includes("categorized")
    )
      return <Sparkles size={18} className="text-yellow-400" />;

    if (event === "archived")
      return <Archive size={18} className="text-red-400" />;

    return <Clock size={18} className="text-slate-400" />;
  }

  function formatEvent(event) {
    return event
      .replace("status:", "Status changed to ")
      .replaceAll("_", " ");
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold">
        Activity Timeline
      </h2>

      {!ticket.history?.length ? (
        <div className="text-slate-500">
          No activity yet.
        </div>
      ) : (
        <div className="space-y-5">

          {ticket.history.map((item) => (

            <div
              key={item._id}
              className="flex gap-4"
            >

              <div className="mt-1">
                {getIcon(item.event)}
              </div>

              <div className="flex-1">

                <div className="font-medium capitalize">
                  {formatEvent(item.event)}
                </div>

                <div className="mt-1 text-sm text-slate-400">

                  {item.by?.name && (
                    <span>
                      By {item.by.name}
                    </span>
                  )}

                  <div>
                    {new Date(item.at).toLocaleString()}
                  </div>

                </div>

                {item.meta && (
                  <pre className="mt-3 rounded bg-slate-950 p-3 text-xs text-slate-300 overflow-auto">
                    {JSON.stringify(item.meta, null, 2)}
                  </pre>
                )}

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}
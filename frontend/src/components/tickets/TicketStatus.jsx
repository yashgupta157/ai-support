import { useAuthContext } from "../../context/AuthContext";

export default function TicketStatus({
  ticket,
  changeStatus,
}) {

  const { user } = useAuthContext();

  if (user.role === "viewer") return null;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <h3 className="font-semibold mb-4">
        Status
      </h3>

      <select
        value={ticket.status}
        onChange={(e) =>
          changeStatus(ticket._id, e.target.value)
        }
        className="w-full rounded-lg bg-slate-800 p-3"
      >
        <option value="open">Open</option>

        <option value="in_progress">
          In Progress
        </option>

        <option value="resolved">
          Resolved
        </option>

        {user.role === "admin" && (
          <option value="closed">
            Closed
          </option>
        )}
      </select>

    </div>
  );
}
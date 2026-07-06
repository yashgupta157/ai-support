import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function TicketAssign({
  ticket,
  getTicket,
}) {
  const { user } = useAuthContext();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(
    ticket.assignee?._id || ""
  );
  const [loading, setLoading] = useState(false);

  // Only Admin can assign tickets
  if (user?.role !== "admin") {
    return null;
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await api.get("/users/technicians");

      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    }
  }

  async function assignTicket() {
    if (!selectedUser) {
      return toast.error("Select a user");
    }

    try {
      setLoading(true);

      await api.post(
        `/tickets/${ticket._id}/assign`,
        {
          assignee: selectedUser,
        }
      );

      toast.success("Ticket Assigned");

      if (getTicket) {
        await getTicket(ticket._id);
      }

    } catch (err) {
      console.error(err);

      toast.error("Assignment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <h3 className="mb-4 text-lg font-semibold">
        Assign Ticket
      </h3>

      <select
        value={selectedUser}
        onChange={(e) =>
          setSelectedUser(e.target.value)
        }
        className="w-full rounded-lg bg-slate-800 p-3"
      >
        <option value="">
          Select Technician
        </option>

        {users.map((u) => (

          <option
            key={u._id}
            value={u._id}
          >
            {u.name} ({u.role})
          </option>

        ))}
      </select>

      <button
        onClick={assignTicket}
        disabled={loading}
        className="mt-4 w-full rounded-lg bg-indigo-600 py-3 font-semibold hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading
          ? "Assigning..."
          : "Assign Ticket"}
      </button>

    </div>
  );
}
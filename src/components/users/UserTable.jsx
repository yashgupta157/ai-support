import {
  Pencil,
  Trash2,
} from "lucide-react";

export default function UserTable({
  users,
  loading,
  onEdit,
  onDelete,
  onRoleChange,
  onStatusChange,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-slate-900 p-8 text-center">
        Loading users...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-900 p-8 text-center text-slate-400">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <table className="w-full">

        <thead className="border-b border-slate-800 bg-slate-950">

          <tr>

            <th className="px-6 py-4 text-left">
              User
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-left">
              Role
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-right">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user._id}
              className="border-b border-slate-800 hover:bg-slate-800/40"
            >

              <td className="px-6 py-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <span className="font-medium">
                    {user.name}
                  </span>

                </div>

              </td>

              <td className="px-6 py-4 text-slate-400">
                {user.email}
              </td>

              <td className="px-6 py-4">

                <select
                  value={user.role}
                  onChange={(e) =>
                    onRoleChange(user._id, e.target.value)
                  }
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
                >
                  <option value="admin">
                    Admin
                  </option>

                  <option value="technician">
                    Technician
                  </option>

                  <option value="viewer">
                    Viewer
                  </option>

                </select>

              </td>

              <td className="px-6 py-4">

                <select
                  value={user.status}
                  onChange={(e) =>
                    onStatusChange(user._id, e.target.value)
                  }
                  className={`rounded-lg px-3 py-2 text-white ${
                    user.status === "active"
                      ? "bg-green-600"
                      : user.status === "inactive"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  }`}
                >

                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>

                  <option value="blocked">
                    Blocked
                  </option>

                </select>

              </td>

              <td className="px-6 py-4">

                <div className="flex justify-end gap-2">

                  <button
                    onClick={() => onEdit(user)}
                    className="rounded-lg bg-blue-600 p-2 hover:bg-blue-700"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Delete this user?"
                        )
                      ) {
                        onDelete(user._id);
                      }
                    }}
                    className="rounded-lg bg-red-600 p-2 hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
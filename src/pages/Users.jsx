import { useMemo, useState } from "react";
import { Plus, Search, Users as UsersIcon } from "lucide-react";

import useUsers from "../hooks/useUsers";

import UserTable from "../components/users/UserTable";
import UserModal from "../components/users/UserModal";

export default function Users() {
  const {
    users,
    loading,
    createUser,
    updateUser,
    deleteUser,
    changeRole,
    changeStatus,
  } = useUsers();

  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const keyword = search.toLowerCase();

      return (
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.role.toLowerCase().includes(keyword)
      );
    });
  }, [users, search]);

  const totalUsers = users.length;
  const admins = users.filter((u) => u.role === "admin").length;
  const technicians = users.filter(
    (u) => u.role === "technician"
  ).length;
  const viewers = users.filter(
    (u) => u.role === "viewer"
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 p-8">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="flex items-center gap-3 text-3xl font-bold">

            <UsersIcon />

            User Management

          </h1>

          <p className="mt-2 text-slate-400">
            Manage users, roles and permissions.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedUser(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 hover:bg-cyan-700"
        >
          <Plus size={18} />
          Add User
        </button>

      </div>

      {/* Stats */}

      <div className="mb-8 grid gap-5 md:grid-cols-4">

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-slate-400">Total Users</p>
          <h2 className="mt-3 text-4xl font-bold">
            {totalUsers}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-slate-400">Admins</p>
          <h2 className="mt-3 text-4xl font-bold text-red-400">
            {admins}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-slate-400">
            Technicians
          </p>
          <h2 className="mt-3 text-4xl font-bold text-green-400">
            {technicians}
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <p className="text-slate-400">
            Viewers
          </p>
          <h2 className="mt-3 text-4xl font-bold text-yellow-400">
            {viewers}
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="relative mb-8">

        <Search
          size={18}
          className="absolute left-4 top-4 text-slate-500"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search users..."
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 outline-none"
        />

      </div>

      {/* Table */}

      <UserTable
        users={filteredUsers}
        loading={loading}
        onEdit={(user) => {
          setSelectedUser(user);
          setOpenModal(true);
        }}
        onDelete={deleteUser}
        onRoleChange={changeRole}
        onStatusChange={changeStatus}
      />

      {/* Modal */}

      {openModal && (
        <UserModal
          user={selectedUser}
          onClose={() => setOpenModal(false)}
          onCreate={createUser}
          onUpdate={updateUser}
        />
      )}

    </div>
  );
}
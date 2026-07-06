import { useEffect, useState } from "react";
import userService from "../services/userService";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Fetch Users
  // =========================

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await userService.getUsers();

      setUsers(res.users || []);
      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Create User
  // =========================

  const createUser = async (data) => {
    try {
      await userService.createUser(data);
      await fetchUsers();
    } catch (err) {
      throw err;
    }
  };

  // =========================
  // Update User
  // =========================

  const updateUser = async (id, data) => {
    try {
      await userService.updateUser(id, data);
      await fetchUsers();
    } catch (err) {
      throw err;
    }
  };

  // =========================
  // Delete User
  // =========================

  const deleteUser = async (id) => {
    try {
      await userService.deleteUser(id);
      await fetchUsers();
    } catch (err) {
      throw err;
    }
  };

  // =========================
  // Change Role
  // =========================

  const changeRole = async (id, role) => {
    try {
      await userService.changeRole(id, role);
      await fetchUsers();
    } catch (err) {
      throw err;
    }
  };

  // =========================
  // Change Status
  // =========================

  const changeStatus = async (id, status) => {
    try {
      await userService.changeStatus(id, status);
      await fetchUsers();
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    changeRole,
    changeStatus,
  };
}
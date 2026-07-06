import api from "./api";

const userService = {
  // Get all users
  getUsers: async () => {
    const res = await api.get("/users");
    return res.data;
  },

  // Get single user
  getUser: async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },

  // Create user
  createUser: async (userData) => {
    const res = await api.post("/users", userData);
    return res.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const res = await api.put(`/users/${id}`, userData);
    return res.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  },

  // Change role
  changeRole: async (id, role) => {
    const res = await api.patch(`/users/${id}/role`, {
      role,
    });

    return res.data;
  },

  // Change status
  changeStatus: async (id, status) => {
    const res = await api.patch(`/users/${id}/status`, {
      status,
    });

    return res.data;
  },
};

export default userService;
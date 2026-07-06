import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuthContext } from "../context/AuthContext";

export default function useAuth() {
  const [loading, setLoading] = useState(false);

  const auth = useAuthContext();
  const navigate = useNavigate();

  async function login(email, password) {
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      auth.login(
        res.data.user,
        res.data.token
      );

      toast.success("Welcome back!");

      navigate("/dashboard");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Login failed."
      );

    } finally {
      setLoading(false);
    }
  }

  async function register(name, email, password) {
    setLoading(true);

    try {

      const res = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      auth.login(
        res.data.user,
        res.data.token
      );

      toast.success(
        "Account created successfully!"
      );

      navigate("/dashboard");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Registration failed."
      );

    } finally {
      setLoading(false);
    }
  }

  function logout() {
    auth.logout();
    navigate("/login");
  }

  return {
    login,
    register,
    logout,
    loading,
  };
}
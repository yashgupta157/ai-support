import { useEffect, useState } from "react";
import api from "../services/api";

export default function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [system, setSystem] = useState(null);

  async function fetchDashboard() {
    try {
      const res = await api.get("/dashboard");

      // console.log("Dashboard API:", res.data);

      setStats(res.data.stats);
      setSystem(res.data.system);

    } catch (err) {
      console.error("Dashboard Error:", err.response || err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(fetchDashboard, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    loading,
    stats,
    system,
    refresh: fetchDashboard,
  };
}
import { useEffect, useState } from "react";
import api from "../services/api";

export default function useLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadLogs() {
    try {
      const res = await api.get("/logs");
      setLogs(res.data.logs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteLog(id) {
    try {
      await api.delete(`/logs/${id}`);

      setLogs((prev) =>
        prev.filter((log) => log._id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  return {
    logs,
    loading,
    loadLogs,
    deleteLog,
  };
}
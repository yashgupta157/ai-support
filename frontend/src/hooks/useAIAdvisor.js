import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export default function useAIAdvisor(system) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = useCallback(async () => {
    if (!system) return;

    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/ai/system-analysis", system);
      const payload = res.data;

      // Validate payload shape locally
      function isValid(obj) {
        if (!obj || typeof obj !== "object") return false;
        if (typeof obj.summary !== "string") return false;
        if (!Number.isFinite(obj.healthScore)) return false;
        if (!Array.isArray(obj.recommendations)) return false;
        if (!Array.isArray(obj.commands)) return false;
        return true;
      }

      if (isValid(payload)) {
        setData(payload);
      } else if (payload && payload.raw) {
        // backend couldn't parse — surface raw reply for debugging
        setData({ raw: payload.raw });
      } else {
        setError("Invalid AI response format");
      }
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [system]);

  useEffect(() => {
    // Run immediately when system becomes available
    if (system) analyze();

    // Refresh every 60 seconds
    const id = setInterval(() => {
      analyze();
    }, 60000);

    return () => clearInterval(id);
  }, [system, analyze]);

  return {
    data,
    loading,
    error,
    analyzeNow: analyze,
  };
}

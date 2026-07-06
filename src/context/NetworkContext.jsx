import React, { createContext, useState, useCallback } from "react";
import api from "../services/api";

export const NetworkContext = createContext(null);

export function NetworkProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyze = useCallback(async (type, target) => {
    if (!target || !String(target).trim()) return;
    setLoading(true);

    try {
      const res = await api.post("/network/analyze", { type, target });
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setResult({ error: err?.message || "Network error" });
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResult = useCallback(() => setResult(null), []);

  return (
    <NetworkContext.Provider value={{ loading, result, analyze, clearResult }}>
      {children}
    </NetworkContext.Provider>
  );
}

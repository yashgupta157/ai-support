import { useState, useContext } from "react";
import api from "../services/api";
import { NetworkContext } from "../context/NetworkContext";

export default function useNetwork() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const ctx = useContext(NetworkContext);

  if (ctx) return ctx;

  async function analyze(type, target) {
    if (!target || !String(target).trim()) return;

    setLoading(true);

    try {
      const res = await api.post("/network/analyze", { type, target });
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    result,
    analyze,
  };
}
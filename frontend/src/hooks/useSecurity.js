import { useState, useEffect } from "react";
import api from "../services/api";

export default function useSecurity() {
  const [security, setSecurity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState([]);
  const [scanLoading, setScanLoading] = useState(false);

  async function fetchSecurity() {
    try {
      setLoading(true);
      const res = await api.get("/security/status");
      setSecurity(res.data);
      // Keep report in sync if backend returns a report-like structure
      if (res.data?.report) setReport(res.data.report);
    } catch (err) {
      console.error("useSecurity error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function scanSystem() {
    try {
      setScanLoading(true);
      const res = await api.get("/security/scan");
      // Expected shape: { success: true, result: [...] }
      const result = res.data?.result ?? [];
      setReport(result);
    } catch (err) {
      console.error("scanSystem error:", err);
    } finally {
      setScanLoading(false);
    }
  }

  useEffect(() => {
    fetchSecurity();
    const id = setInterval(fetchSecurity, 30000);
    return () => clearInterval(id);
  }, []);

  return { security, loading, refresh: fetchSecurity, report, scanSystem, scanLoading };
}
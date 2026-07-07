import { useEffect, useState } from "react";
import api from "../services/api"; // adjust the path if needed

export default function useHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const res = await api.get("/chat/history");

      setHistory(res.data.chats);
    } catch (err) {
      console.error(err);
    }
  }

  return { history, fetchHistory };
}
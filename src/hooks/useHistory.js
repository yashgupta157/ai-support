import { useEffect, useState } from "react";
import axios from "axios";

export default function useHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/chat/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(res.data.chats);

    } catch (err) {
      console.error(err);
    }
  }

  return { history, fetchHistory };
}
import { useEffect, useState } from "react";
import api from "../services/api";

export default function useSavedCommands() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadCommands() {
    try {
      const res = await api.get("/commands");
      setCommands(res.data.commands);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCommand(id) {
    try {
      await api.delete(`/commands/${id}`);

      setCommands((prev) =>
        prev.filter((cmd) => cmd._id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadCommands();
  }, []);

  return {
    commands,
    loading,
    deleteCommand,
  };
}
import { useState } from "react";
import api from "../services/api";

export default function useCommandGenerator() {
  const [loading, setLoading] = useState(false);
  const [command, setCommand] = useState("");

  async function generate(prompt) {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await api.post("/commands/generate", {
        prompt,
      });

      setCommand(res.data.command);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    command,
    generate,
  };
}
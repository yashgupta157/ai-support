import { useState, useCallback } from "react";
import api from "../services/api";

export default function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);

  const [listLoading, setListLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  // ==========================
  // Fetch Tickets
  // ==========================
  const fetchTickets = useCallback(async (params = {}) => {
    setListLoading(true);

    try {
      const res = await api.get("/tickets", { params });

      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error("Fetch Tickets Error:", err);
    } finally {
      setListLoading(false);
    }
  }, []);

  const fetchReviewedTickets = useCallback(async () => {
    await fetchTickets({ reviewed: true });
  }, [fetchTickets]);

  // ==========================
  // Get Ticket
  // ==========================
  const getTicket = useCallback(async (id) => {
    setDetailLoading(true);

    try {
      const res = await api.get(`/tickets/${id}`);

      setSelected(res.data.ticket);

      return res.data.ticket;
    } catch (err) {
      console.error("Get Ticket Error:", err);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  // ==========================
  // Create Ticket
  // ==========================
  const createTicket = useCallback(async (payload) => {
    setCreateLoading(true);

    try {
      const res = await api.post("/tickets", payload);

      // Refresh list from database
      await fetchTickets();

      // Select new ticket
      setSelected(res.data.ticket);

      return res.data.ticket;
    } catch (err) {
      console.error("Create Ticket Error:", err);
    } finally {
      setCreateLoading(false);
    }
  }, [fetchTickets]);

  // ==========================
  // Add Comment
  // ==========================
  const addComment = useCallback(async (id, message) => {
    try {
      const res = await api.post(`/tickets/${id}/comment`, {
        message,
      });

      setSelected(res.data.ticket);

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === id ? res.data.ticket : ticket
        )
      );

      return res.data.ticket;
    } catch (err) {
      console.error("Add Comment Error:", err);
    }
  }, []);

  // ==========================
  // Change Status
  // ==========================
  const changeStatus = useCallback(async (id, status) => {
    try {
      const res = await api.post(`/tickets/${id}/status`, {
        status,
      });

      setSelected(res.data.ticket);

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === id ? res.data.ticket : ticket
        )
      );

      return res.data.ticket;
    } catch (err) {
      console.error("Change Status Error:", err);
    }
  }, []);

  // ==========================
  // Apply AI Suggestion
  // ==========================
  const applySuggestion = useCallback(async (id, suggestion) => {
    try {
      if (!suggestion) return;

      const payload = {};

      if (suggestion.priority) {
        payload.priority = suggestion.priority;
      }

      if (Array.isArray(suggestion.tags)) {
        payload.tags = [...new Set(suggestion.tags)];
      }

      const res = await api.put(`/tickets/${id}`, payload);

      const updated = res.data.ticket;

      setSelected(updated);

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === id ? updated : ticket
        )
      );

      return updated;
    } catch (err) {
      console.error("Apply Suggestion Error:", err);
    }
  }, []);

  // ==========================
  // AI Categorize
  // ==========================
  const categorizeTicket = useCallback(async (id) => {
    try {
      const res = await api.post(`/tickets/${id}/categorize`);

      const updated = res.data.ticket;

      setSelected(updated);

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === id ? updated : ticket
        )
      );

      return {
        ticket: updated,
        classification: res.data.classification,
      };
    } catch (err) {
      console.error("Categorize Ticket Error:", err);
    }
  }, []);

  return {
    tickets,
    selected,

    listLoading,
    createLoading,
    detailLoading,

    fetchTickets,
    fetchReviewedTickets,

    getTicket,
    setSelected,

    createTicket,

    addComment,
    changeStatus,

    categorizeTicket,
    applySuggestion,
  };
}
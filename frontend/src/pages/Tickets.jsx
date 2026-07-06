import { useEffect, useState } from "react";
import api from "../services/api";
import useTickets from "../hooks/useTickets";

import TicketList from "../components/tickets/TicketList";
import TicketDetail from "../components/tickets/TicketDetail";
import TicketForm from "../components/tickets/TicketForm";

export default function Tickets() {
  const ticketsHook = useTickets();
  const { tickets, fetchTickets, fetchReviewedTickets, selected, setSelected, loading } = ticketsHook;
  const [showReviewed, setShowReviewed] = useState(false);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
  const loadPage = async () => {
    try {
      const deviceRes = await api.get("/devices");
      setDevices(deviceRes.data.devices || []);

      if (showReviewed) {
        await fetchReviewedTickets();
      } else {
        await fetchTickets();
      }
    } catch (err) {
      console.error(err);
    }
  };

  loadPage();
}, [showReviewed]);
  
  return (
    <div className="p-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">🎫 Tickets</h1>
          <p className="text-sm text-slate-400">Filter for AI-reviewed tickets or browse all requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={showReviewed}
              onChange={(e) => setShowReviewed(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-500"
            />
            Show AI-reviewed only
          </label>
          <button
            onClick={() => {
  if (showReviewed) {
    fetchReviewedTickets();
  } else {
    fetchTickets();
  }
}}
            className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TicketForm createTicket={ticketsHook.createTicket} devices={devices} />
          <div className="mt-4">
            <TicketList
              tickets={tickets}
              loading={loading}
              onSelect={(t) => setSelected(t)}
              selectedId={selected?._id}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <TicketDetail
            ticket={selected}
            getTicket={ticketsHook.getTicket}
            addComment={ticketsHook.addComment}
            changeStatus={ticketsHook.changeStatus}
            categorizeTicket={ticketsHook.categorizeTicket}
            applySuggestion={ticketsHook.applySuggestion}
          />
        </div>
      </div>
    </div>
  );
}

import TicketHeader from "./TicketHeader";
import TicketInfo from "./TicketInfo";
import TicketAssign from "./TicketAssign";
import TicketStatus from "./TicketStatus";
import TicketAISuggestion from "./TicketAISuggestion";
import TicketComments from "./TicketComments";
import TicketTimeline from "./TicketTimeline";

export default function TicketDetail({
  ticket,
  getTicket,
  addComment,
  changeStatus,
  categorizeTicket,
  applySuggestion,
}) {
  if (!ticket) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        Select a ticket
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <TicketHeader ticket={ticket} />

      <TicketInfo ticket={ticket} />

      <TicketAssign
        ticket={ticket}
        getTicket={getTicket}
      />

      <TicketStatus
        ticket={ticket}
        changeStatus={changeStatus}
      />

      <TicketAISuggestion
        ticket={ticket}
        categorizeTicket={categorizeTicket}
        applySuggestion={applySuggestion}
        getTicket={getTicket}
      />

      <TicketComments
        ticket={ticket}
        addComment={addComment}
        getTicket={getTicket}
      />

      <TicketTimeline
        ticket={ticket}
      />

    </div>
  );
}
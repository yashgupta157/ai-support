import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function TicketComments({
  ticket,
  addComment,
  getTicket,
}) {
  const { user } = useAuthContext();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleComment() {
    if (!message.trim()) return;

    try {
      setLoading(true);

      await addComment(ticket._id, message);

      setMessage("");

      if (getTicket) {
        await getTicket(ticket._id);
      }

      toast.success("Comment Added");

    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center gap-2 mb-5">
        <MessageSquare size={20} />
        <h2 className="text-xl font-semibold">
          Comments
        </h2>
      </div>

      {/* Comments */}

      <div className="space-y-4 max-h-96 overflow-y-auto">

        {ticket.comments?.length ? (

          ticket.comments.map((comment) => (

            <div
              key={comment._id}
              className="rounded-xl bg-slate-800 p-4"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h4 className="font-semibold">
                    {comment.author?.name || "Unknown User"}
                  </h4>

                  <p className="text-xs text-slate-400">
                    {comment.author?.email}
                  </p>

                </div>

                <div className="text-xs text-slate-500">

                  {new Date(
                    comment.createdAt
                  ).toLocaleString()}

                </div>

              </div>

              <p className="mt-3 text-slate-300">
                {comment.message}
              </p>

            </div>

          ))

        ) : (

          <div className="rounded-xl bg-slate-800 p-8 text-center text-slate-500">

            No comments yet

          </div>

        )}

      </div>

      {/* Add Comment */}

      <div className="mt-6">

        <textarea
          rows={4}
          placeholder="Write a comment..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 outline-none focus:border-indigo-500"
        />

        <div className="mt-4 flex justify-between items-center">

          <div className="text-sm text-slate-500">
            Logged in as {user?.name}
          </div>

          <button
            onClick={handleComment}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 hover:bg-indigo-700 disabled:opacity-50"
          >

            <Send size={16} />

            {loading
              ? "Sending..."
              : "Add Comment"}

          </button>

        </div>

      </div>

    </div>
  );
}
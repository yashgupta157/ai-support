import AssistantMessage from "./AssistantMessage";
import UserMessage from "./UserMessage";
import TypingIndicator from "./TypingIndicator";
import SuggestedPrompts from "./SuggestedPrompts";
import { useConversation } from "../../context/ConversationContext";

export default function ChatWindow({
  messages,
  loading,
  bottomRef,
  onPromptClick,
}) {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

      {/* Welcome Screen */}
      {!loading &&
        !messages.length &&
        !selectedConversation && (
          <div className="flex flex-col items-center justify-center h-full">

            <h2 className="text-4xl font-bold mb-3">
              👋 Welcome to InfraGPT
            </h2>

            <p className="text-slate-400 mb-8 text-center max-w-xl">
              Your AI Infrastructure Engineer.
              Ask anything about Windows Server,
              Active Directory, Networking,
              Azure, Linux, VMware, Cyber Security
              and Cloud Infrastructure.
            </p>

            <SuggestedPrompts
              onPromptClick={onPromptClick}
            />

          </div>
        )}

      {/* Messages */}
      {messages.map((message, index) =>
        message.role === "user" ? (
          <UserMessage
            key={index}
            message={message}
          />
        ) : (
          <AssistantMessage
            key={index}
            message={message}
          />
        )
      )}

      {/* AI Typing */}
      {loading && <TypingIndicator />}

      <div ref={bottomRef} />

    </div>
  );
}
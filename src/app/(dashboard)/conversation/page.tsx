import { ConversationUI } from "@/components/conversation/ConversationUI";

export default function ConversationPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="text-2xl font-heading font-semibold text-center mb-6">
        Conversation
      </h1>
      <ConversationUI />
    </div>
  );
}

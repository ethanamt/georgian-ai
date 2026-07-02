import { ConversationUI } from "@/components/conversation/ConversationUI";

export default function ConversationPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="font-heading text-2xl font-bold tracking-tight text-center mb-8">Conversation</h1>
      <ConversationUI />
    </div>
  );
}

import { ChatWindow } from "@/components/dashboard/chat/chat-window";
import { PageHeader } from "@/components/shared/page-header";
import { sessionMessages } from "@/lib/mock-data";

export default function LiveChatPage() {
  return (
    <div>
      <PageHeader
        title="Playgrounds"
        description="Playground for testing chat interactions with mock messages."
      />
      <ChatWindow messages={sessionMessages} />
    </div>
  );
}

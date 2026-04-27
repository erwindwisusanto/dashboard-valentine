import { SessionsWorkspace } from "@/components/dashboard/sessions/sessions-workspace";
import { PageHeader } from "@/components/shared/page-header";
import { sessionMessagesById, sessions } from "@/lib/mock-data";

export default function SessionsPage() {
  return (
    <div>
      <PageHeader
        title="Chat Sessions"
        description="WhatsApp-style layout: left list by MSISDN and right live chat bubbles."
      />

      <SessionsWorkspace sessions={sessions} sessionMessagesById={sessionMessagesById} />
    </div>
  );
}

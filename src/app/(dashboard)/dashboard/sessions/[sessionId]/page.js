import { SessionMessageTimeline } from "@/components/dashboard/sessions/session-message-timeline";
import { BackButton } from "@/components/shared/back-button";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sessionMessagesById, sessions } from "@/lib/mock-data";

export default async function SessionDetailPage({ params }) {
  const { sessionId } = await params;
  const session = sessions.find((item) => item.id === sessionId) ?? sessions[0];
  const messages = sessionMessagesById[session.id] ?? [];

  return (
    <div>
      <div className="mb-3">
        <BackButton fallbackHref="/dashboard/sessions" />
      </div>

      <PageHeader
        title={`Session Detail · ${session.id}`}
        description="Inspect session metadata and conversation history."
      />

      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Session Metadata</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">MSISDN:</span> {session.msisdn}
            </p>
            <p>
              <span className="text-muted-foreground">Agent:</span> {session.agent}
            </p>
            <p>
              <span className="text-muted-foreground">Status:</span> {session.status}
            </p>
            <p>
              <span className="text-muted-foreground">Updated:</span> {session.updatedAt}
            </p>
          </CardContent>
        </Card>

        <SessionMessageTimeline messages={messages} />
      </div>
    </div>
  );
}

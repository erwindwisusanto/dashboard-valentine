import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyticsSummary, sessions } from "@/lib/mock-data";

export default function DashboardOverviewPage() {
  return (
    <div>
      <PageHeader
        title="Overview"
        description="High-level summary of prompts, agents, sessions, and token usage."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Tokens" value={analyticsSummary.totalTokens.toLocaleString()} description="Today" />
        <StatCard title="Sessions" value={analyticsSummary.sessions} description="Across all tenants" />
        <StatCard title="Avg / Session" value={analyticsSummary.avgPerSession} description="Token average" />
        <StatCard title="Active Agents" value={analyticsSummary.activeAgents} description="Currently online" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            {sessions.map((session) => (
              <div key={session.id} className="rounded-md border p-2">
                <p className="font-medium">{session.msisdn}</p>
                <p className="text-muted-foreground">{session.lastMessage}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>UI Scope Reminder</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This project intentionally contains frontend UI skeleton only: no authentication, no API integration,
            and no database implementation.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

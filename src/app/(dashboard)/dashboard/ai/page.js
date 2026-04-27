import { AgentCards } from "@/components/dashboard/agents/agent-cards";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { agents } from "@/lib/mock-data";

export default function AIPage() {
  const grouped = agents.reduce((acc, agent) => {
    const key = agent.aiAgentName || "AI Agent";
    if (!acc[key]) acc[key] = [];
    acc[key].push(agent);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        title="AI"
        description="Menu AI berisi nama AI Agent, dan di dalamnya terdapat agents."
        actionLabel="Create AI Agent"
      />

      <div className="flex flex-col gap-4">
        {Object.entries(grouped).map(([aiAgentName, items]) => (
          <Card key={aiAgentName}>
            <CardHeader>
              <CardTitle>{aiAgentName}</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <AgentCards agents={items ?? []} detailBasePath="/dashboard/ai" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

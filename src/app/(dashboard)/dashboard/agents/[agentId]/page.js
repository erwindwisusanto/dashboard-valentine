import { PromptManagementPanel } from "@/components/dashboard/agents/prompt-management-panel";
import { BackButton } from "@/components/shared/back-button";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { agentPromptComparisons, agents, prompts } from "@/lib/mock-data";

export default async function AgentDetailPage({ params }) {
  const { agentId } = await params;
  const agent = agents.find((item) => item.id === agentId) ?? agents[0];

  const systemPrompts = prompts.filter((prompt) => !prompt.name.toLowerCase().includes("kb router"));
  const kbRouterPrompts = prompts.filter((prompt) => prompt.name.toLowerCase().includes("kb router"));

  return (
    <div>
      <div className="mb-3">
        <BackButton fallbackHref="/dashboard/ai" />
      </div>

      <PageHeader
        title={`Agent Detail · ${agent.name}`}
        description="Manage System Prompt and KB Router Prompt directly in this agent."
      />

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Agent Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <p>
              <span className="text-muted-foreground">Tenant:</span> {agent.tenant}
            </p>
            <p>
              <span className="text-muted-foreground">Status:</span> {agent.status}
            </p>
            <p>
              <span className="text-muted-foreground">Sessions Today:</span> {agent.sessionsToday}
            </p>
            <p>
              <span className="text-muted-foreground">System Prompt:</span> {agent.systemPrompt}
            </p>
            <p>
              <span className="text-muted-foreground">KB Router:</span> {agent.kbRouterPrompt}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <PromptManagementPanel
          title="System Prompt"
          description="Default Save button is disabled until you edit content."
          initialName={agent.systemPrompt}
          initialContent={agentPromptComparisons.systemPrompt.current}
          candidates={systemPrompts}
        />

        <PromptManagementPanel
          title="KB Router Prompt"
          description="Edit and save KB Router prompt for this agent."
          initialName={agent.kbRouterPrompt}
          initialContent={agentPromptComparisons.kbRouterPrompt.current}
          candidates={kbRouterPrompts}
        />
      </div>

    </div>
  );
}

import { ProfessionalAnalytics } from "@/components/dashboard/analytics/professional-analytics";
import { TokenUsageChart } from "@/components/dashboard/analytics/token-usage-chart";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyticsSummary, tokenBoxByAgent, tokenUsageByAgent, tokenUsageBySession } from "@/lib/mock-data";

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics · Token Usage"
        description="Professional dashboard with pie diagram, box diagram, and detailed breakdown."
      />

      <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Tokens" value={analyticsSummary.totalTokens.toLocaleString()} description="Last 24h" />
        <StatCard title="Sessions" value={analyticsSummary.sessions} description="Last 24h" />
        <StatCard title="Avg / Session" value={analyticsSummary.avgPerSession} description="Tokens" />
        <StatCard title="Active Agents" value={analyticsSummary.activeAgents} description="Now" />
      </div>

      <div className="mb-4">
        <ProfessionalAnalytics pieData={tokenUsageByAgent} boxData={tokenBoxByAgent} />
      </div>

      <Tabs defaultValue="agent">
        <TabsList>
          <TabsTrigger value="agent">By Agent</TabsTrigger>
          <TabsTrigger value="session">By Session</TabsTrigger>
        </TabsList>
        <TabsContent value="agent">
          <TokenUsageChart title="Token Usage per Agent" data={tokenUsageByAgent} />
        </TabsContent>
        <TabsContent value="session">
          <TokenUsageChart title="Token Usage per Session" data={tokenUsageBySession} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

import Link from "next/link";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function AgentCards({ agents, detailBasePath = "/dashboard/ai" }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {agents.map((agent) => (
        <Card key={agent.id}>
          <CardHeader>
            <CardTitle>{agent.name}</CardTitle>
            <CardDescription>{agent.tenant}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <StatusBadge value={agent.status} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">System Prompt</span>
              <span className="text-right">{agent.systemPrompt}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">KB Router</span>
              <span className="text-right">{agent.kbRouterPrompt}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Sessions Today</span>
              <span>{agent.sessionsToday}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              nativeButton={false}
              variant="outline"
              className="w-full"
              render={<Link href={`${detailBasePath}/${agent.id}`} />}
            >
              Open Agent Detail
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

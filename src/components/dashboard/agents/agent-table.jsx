import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";

export function AgentTable({ agents }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Agent</TableHead>
          <TableHead>Tenant</TableHead>
          <TableHead>System Prompt</TableHead>
          <TableHead>KB Router</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Sessions Today</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map((agent) => (
          <TableRow key={agent.id}>
            <TableCell className="font-medium">{agent.name}</TableCell>
            <TableCell>{agent.tenant}</TableCell>
            <TableCell>{agent.systemPrompt}</TableCell>
            <TableCell>{agent.kbRouterPrompt}</TableCell>
            <TableCell>
              <StatusBadge value={agent.status} />
            </TableCell>
            <TableCell>{agent.sessionsToday}</TableCell>
            <TableCell className="text-right">
              <Button nativeButton={false} variant="outline" size="sm" render={<Link href={`/dashboard/agents/${agent.id}`} />}>
                Detail
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

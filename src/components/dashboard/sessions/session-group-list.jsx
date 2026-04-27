import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";

export function SessionGroupList({ sessions }) {
  return (
    <div className="grid gap-3">
      {sessions.map((session) => (
        <Card key={session.id} size="sm">
          <CardHeader>
            <CardTitle className="text-sm">{session.msisdn}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{session.agent}</span>
              <StatusBadge value={session.status} />
            </div>
            <p className="truncate text-xs text-muted-foreground">{session.lastMessage}</p>
            <Button nativeButton={false} size="sm" variant="outline" render={<Link href={`/dashboard/sessions/${session.id}`} />}>
              Open Session
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

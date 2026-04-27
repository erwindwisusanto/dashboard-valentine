"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";

export function SessionsWorkspace({ sessions, sessionMessagesById }) {
  const [activeSessionId, setActiveSessionId] = useState(sessions[0]?.id);

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeSessionId) ?? sessions[0],
    [activeSessionId, sessions]
  );

  const messages = sessionMessagesById[activeSession?.id] ?? [];

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <Card className="h-[70vh]">
        <CardHeader>
          <CardTitle>MSISDN Sessions</CardTitle>
        </CardHeader>
        <CardContent className="h-full overflow-y-auto">
          <div className="flex flex-col gap-2 pb-20">
            {sessions.map((session) => (
              <button
                key={session.id}
                type="button"
                onClick={() => setActiveSessionId(session.id)}
                className={
                  session.id === activeSession?.id
                    ? "rounded-md border bg-muted p-2 text-left"
                    : "rounded-md border p-2 text-left hover:bg-muted/50"
                }
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{session.msisdn}</p>
                  <span className="text-[10px] text-muted-foreground">{session.updatedAt.split(" ")[1]}</span>
                </div>
                <p className="text-xs text-muted-foreground">{session.agent}</p>
                <p className="truncate text-xs text-muted-foreground">{session.lastMessage}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="h-[70vh]">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div>
              <CardTitle>{activeSession?.msisdn}</CardTitle>
              <p className="text-xs text-muted-foreground">{activeSession?.agent}</p>
            </div>
            <StatusBadge value={activeSession?.status} />
          </div>
        </CardHeader>

        <CardContent className="flex h-[calc(70vh-82px)] flex-col">
          <div className="flex-1 overflow-y-auto rounded-md border bg-background p-3">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={`${activeSession?.id}-${message.id}`}
                  className={
                    message.sender === "user"
                      ? "ml-auto max-w-[80%] rounded-xl bg-primary px-3 py-2 text-primary-foreground"
                      : "mr-auto max-w-[80%] rounded-xl bg-muted px-3 py-2"
                  }
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="mt-1 text-[10px] opacity-70">{message.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <Input placeholder="Type a message..." />
            <Button>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function SessionsWorkspace({ sessions, sessionMessagesById }) {
  const [activeSessionId, setActiveSessionId] = useState(sessions[0]?.id);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [draftMessage, setDraftMessage] = useState("");
  const [messagesBySession, setMessagesBySession] = useState(sessionMessagesById);
  const messageListRef = useRef(null);

  const filteredSessions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return sessions;
    return sessions.filter(
      (session) =>
        session.msisdn.toLowerCase().includes(query) || (session.name ?? "").toLowerCase().includes(query)
    );
  }, [searchQuery, sessions]);

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeSessionId) ?? sessions[0],
    [activeSessionId, sessions]
  );

  const messages = messagesBySession[activeSession?.id] ?? [];

  const handleSelectSession = (sessionId) => {
    setActiveSessionId(sessionId);
    setIsMobileChatOpen(true);
  };

  const handleSendMessage = () => {
    const text = draftMessage.trim();
    if (!text || !activeSession?.id) return;

    setMessagesBySession((prev) => {
      const currentMessages = prev[activeSession.id] ?? [];
      const nextMessage = {
        id: Date.now(),
        sender: "user",
        text,
        time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      };

      return {
        ...prev,
        [activeSession.id]: [...currentMessages, nextMessage],
      };
    });

    setDraftMessage("");
  };

  useEffect(() => {
    if (!messageListRef.current) return;
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [activeSession?.id, messages.length]);

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <div className={isMobileChatOpen ? "hidden lg:block" : "block"}>
        <div className="h-[74vh]">
          <div className="mb-3">
            <p className="mb-2 text-sm font-semibold">MSISDN Sessions</p>
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search phone number or name..."
            />
          </div>

          <div className="h-[calc(74vh-72px)] overflow-y-auto">
            <div className="flex flex-col gap-2 pb-10">
              {filteredSessions.map((session) => (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => handleSelectSession(session.id)}
                  className={
                    session.id === activeSession?.id
                      ? "rounded-md border bg-muted p-2 text-left"
                      : "rounded-md border p-2 text-left hover:bg-muted/50"
                  }
                >
                  <div className="flex items-start gap-2">
                    <Avatar size="sm">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-muted-foreground">{session.name}</p>
                        <span className="text-[10px] text-muted-foreground">{session.updatedAt.split(" ")[1]}</span>
                      </div>
                      <p className="text-base font-bold">{session.msisdn}</p>
                      <p className="text-xs text-muted-foreground">{session.agent}</p>
                      <p className="truncate text-xs text-muted-foreground">{session.lastMessage}</p>
                    </div>
                  </div>
                </button>
              ))}
              {filteredSessions.length === 0 ? (
                <p className="rounded-md border p-3 text-xs text-muted-foreground">No phone number found.</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className={isMobileChatOpen ? "block" : "hidden lg:block"}>
        <div className="flex h-[74vh] flex-col lg:h-[74vh]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Button
                size="icon-sm"
                variant="ghost"
                className="lg:hidden"
                onClick={() => setIsMobileChatOpen(false)}
                aria-label="Back to sessions"
              >
                <ArrowLeft />
              </Button>
              <Avatar size="sm">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">{activeSession?.name}</p>
                <p className="text-base font-bold">{activeSession?.msisdn}</p>
                <p className="text-xs text-muted-foreground">{activeSession?.agent}</p>
              </div>
            </div>
            <StatusBadge value={activeSession?.status} />
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div ref={messageListRef} className="min-h-0 flex-1 overflow-y-auto rounded-md border bg-background p-3">
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
                    <p className="text-base leading-relaxed">{message.text}</p>
                    <p className="mt-1 text-[10px] opacity-70">{message.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 mt-3 flex gap-2 bg-background pt-2">
              <Input
                className="h-10 text-base"
                placeholder="Type a message..."
                value={draftMessage}
                onChange={(event) => setDraftMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button className="h-10 px-3" onClick={handleSendMessage}>
                <Send />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

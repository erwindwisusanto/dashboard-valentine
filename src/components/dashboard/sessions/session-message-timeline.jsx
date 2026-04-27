import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SessionMessageTimeline({ messages }) {
  return (
    <Card className="h-[70vh]">
      <CardHeader>
        <CardTitle>Session Messages</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(70vh-82px)]">
        <div className="flex h-full flex-col gap-3 overflow-y-auto rounded-md border p-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.sender === "user"
                  ? "ml-auto max-w-[80%] rounded-lg bg-primary px-3 py-2 text-primary-foreground"
                  : "mr-auto max-w-[80%] rounded-lg bg-muted px-3 py-2 text-foreground"
              }
            >
              <p className="text-sm">{message.text}</p>
              <p className="mt-1 text-[10px] opacity-70">{message.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

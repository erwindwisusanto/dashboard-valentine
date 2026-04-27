import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ChatWindow({ messages }) {
  return (
    <Card className="mx-auto h-[70vh] max-w-3xl">
      <CardHeader>
        <CardTitle>Playground Chat (WhatsApp-style UI)</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.sender === "user"
                  ? "ml-auto max-w-[75%] rounded-xl bg-primary px-3 py-2 text-primary-foreground"
                  : "mr-auto max-w-[75%] rounded-xl bg-muted px-3 py-2"
              }
            >
              <p className="text-sm">{message.text}</p>
              <p className="mt-1 text-[10px] opacity-70">{message.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <Input placeholder="Type a message..." />
          <Button>Send</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

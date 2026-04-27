import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function buildRows(previousText, currentText) {
  const previousLines = previousText.split("\n");
  const currentLines = currentText.split("\n");
  const length = Math.max(previousLines.length, currentLines.length);

  return Array.from({ length }).map((_, index) => {
    const previous = previousLines[index] ?? "";
    const current = currentLines[index] ?? "";
    const changed = previous !== current;

    return {
      line: index + 1,
      previous,
      current,
      changed,
      previousType: previous && changed ? "removed" : "context",
      currentType: current && changed ? "added" : "context",
    };
  });
}

function DiffCell({ line, value, type }) {
  return (
    <div
      className={
        type === "added"
          ? "grid grid-cols-[48px_20px_1fr] border-b bg-emerald-500/10"
          : type === "removed"
            ? "grid grid-cols-[48px_20px_1fr] border-b bg-red-500/10"
            : "grid grid-cols-[48px_20px_1fr] border-b"
      }
    >
      <span className="border-r px-2 py-1 text-right text-xs text-muted-foreground">{line}</span>
      <span className="border-r px-2 py-1 text-xs text-muted-foreground">{type === "added" ? "+" : type === "removed" ? "-" : " "}</span>
      <pre className="overflow-x-auto px-2 py-1 text-xs whitespace-pre-wrap">{value || " "}</pre>
    </div>
  );
}

function GitLikeDiff({ current, previous }) {
  const rows = buildRows(previous, current);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Previous</CardTitle>
          <CardDescription>Reference version</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            {rows.map((row) => (
              <DiffCell key={`previous-${row.line}`} line={row.line} value={row.previous} type={row.previousType} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current</CardTitle>
          <CardDescription>Latest active version</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            {rows.map((row) => (
              <DiffCell key={`current-${row.line}`} line={row.line} value={row.current} type={row.currentType} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function PromptComparePane({ comparisons }) {
  return (
    <Tabs defaultValue="systemPrompt">
      <TabsList>
        <TabsTrigger value="systemPrompt">System Prompt</TabsTrigger>
        <TabsTrigger value="kbRouterPrompt">KB Router Prompt</TabsTrigger>
      </TabsList>

      <TabsContent value="systemPrompt">
        <GitLikeDiff
          current={comparisons.systemPrompt.current}
          previous={comparisons.systemPrompt.previous}
        />
      </TabsContent>

      <TabsContent value="kbRouterPrompt">
        <GitLikeDiff
          current={comparisons.kbRouterPrompt.current}
          previous={comparisons.kbRouterPrompt.previous}
        />
      </TabsContent>
    </Tabs>
  );
}

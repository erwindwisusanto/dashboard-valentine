import Link from "next/link";

import { BackButton } from "@/components/shared/back-button";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { promptVersions, prompts } from "@/lib/mock-data";

export default async function PromptDetailPage({ params }) {
  const { promptId } = await params;
  const prompt = prompts.find((item) => item.id === promptId) ?? prompts[0];

  return (
    <div>
      <div className="mb-3">
        <BackButton fallbackHref="/dashboard/ai" />
      </div>

      <PageHeader
        title={`Prompt Detail · ${prompt.name}`}
        description="Edit prompt content and review version history (UI placeholder)."
      />

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Edit Prompt</CardTitle>
            <CardDescription>No real save operation wired.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Input defaultValue={prompt.name} />
            <Textarea
              defaultValue={`You are ${prompt.name}. Use concise style, ask clarifying question when needed, and stay factual.`}
              className="min-h-40"
            />
            <div>
              <Button>Save Changes (Mock)</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Versioning</CardTitle>
            <CardDescription>UI-only revision timeline.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            {promptVersions.map((version) => (
              <div key={version.id} className="rounded-md border p-2">
                <p className="font-medium">{version.id}</p>
                <p className="text-xs text-muted-foreground">{version.summary}</p>
                <p className="text-xs text-muted-foreground">{version.createdAt}</p>
              </div>
            ))}
            <Button
              nativeButton={false}
              variant="outline"
              className="mt-2"
              render={<Link href={`/dashboard/prompts/${prompt.id}/compare`} />}
            >
              Compare with Previous
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

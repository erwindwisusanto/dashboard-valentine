import { PromptTable } from "@/components/dashboard/prompts/prompt-table";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { prompts } from "@/lib/mock-data";

export default function PromptsPage() {
  return (
    <div>
      <PageHeader
        title="System Prompt Management"
        description="Manage prompt versions, edit content, and compare revisions."
        actionLabel="Create Prompt"
      />
      <Card>
        <CardContent>
          <PromptTable prompts={prompts} />
        </CardContent>
      </Card>
    </div>
  );
}

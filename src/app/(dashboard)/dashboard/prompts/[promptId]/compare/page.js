import { PromptComparePane } from "@/components/dashboard/prompts/prompt-compare-pane";
import { BackButton } from "@/components/shared/back-button";
import { PageHeader } from "@/components/shared/page-header";
import { promptComparisons } from "@/lib/mock-data";

export default async function PromptComparePage({ params }) {
  const { promptId } = await params;

  return (
    <div>
      <div className="mb-3">
        <BackButton fallbackHref="/dashboard/ai" />
      </div>

      <PageHeader
        title={`Prompt Comparison · ${promptId}`}
        description="GitHub-like split diff for current vs previous prompts, including KB Router Prompt."
      />
      <PromptComparePane comparisons={promptComparisons} />
    </div>
  );
}

import { KbUploadPanel } from "@/components/dashboard/knowledge-base/kb-upload-panel";
import { PageHeader } from "@/components/shared/page-header";

export default function KnowledgeBasePage() {
  return (
    <div>
      <PageHeader
        title="Knowledge Base"
        description="Upload KB files and inspect JSON/text breakdown before ingestion."
      />
      <KbUploadPanel />
    </div>
  );
}

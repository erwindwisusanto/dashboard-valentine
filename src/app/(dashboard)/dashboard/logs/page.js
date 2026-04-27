import { LogTable } from "@/components/dashboard/logs/log-table";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { logs } from "@/lib/mock-data";

export default function LogsPage() {
  return (
    <div>
      <PageHeader
        title="Logs Viewer"
        description="Search and filter operational logs by type and source."
      />
      <Card>
        <CardContent>
          <LogTable logs={logs} />
        </CardContent>
      </Card>
    </div>
  );
}

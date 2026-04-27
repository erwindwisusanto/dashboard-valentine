import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";

export function PromptTable({ prompts }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Version</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prompts.map((prompt) => (
          <TableRow key={prompt.id}>
            <TableCell className="font-medium">{prompt.name}</TableCell>
            <TableCell>{prompt.version}</TableCell>
            <TableCell>
              <StatusBadge value={prompt.status} />
            </TableCell>
            <TableCell>{prompt.updatedAt}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button nativeButton={false} variant="outline" size="sm" render={<Link href={`/dashboard/prompts/${prompt.id}`} />}>
                  Edit
                </Button>
                <Button
                  nativeButton={false}
                  variant="ghost"
                  size="sm"
                  render={<Link href={`/dashboard/prompts/${prompt.id}/compare`} />}
                >
                  Compare
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

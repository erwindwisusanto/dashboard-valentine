"use client";

import { toast } from "sonner";
import { FaCodeCompare, FaPenToSquare, FaPlus, FaTrash } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

export function PromptCrudActions({ scope = "Prompt" }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast.success(`${scope} created (mock)`, {
            description: "This is a UI-only action. No backend write yet.",
          })
        }
      >
        <FaPlus data-icon="inline-start" />
        Add
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast.info(`${scope} edited (mock)`, {
            description: "Changes are simulated in this frontend skeleton.",
          })
        }
      >
        <FaPenToSquare data-icon="inline-start" />
        Edit
      </Button>

      <Button
        variant="destructive"
        onClick={() =>
          toast.error(`${scope} deleted (mock)`, {
            description: "Delete action is currently a placeholder.",
          })
        }
      >
        <FaTrash data-icon="inline-start" />
        Delete
      </Button>

      <Button
        variant="secondary"
        onClick={() =>
          toast.message(`${scope} comparison opened`, {
            description: "Use the Compare tab to inspect current vs previous versions.",
          })
        }
      >
        <FaCodeCompare data-icon="inline-start" />
        Compare
      </Button>
    </div>
  );
}

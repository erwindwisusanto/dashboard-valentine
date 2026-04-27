export const logs = [
  {
    id: "log-1",
    type: "info",
    source: "agent-sales-id",
    message: "Prompt loaded successfully.",
    timestamp: "2026-04-27 13:02:10",
  },
  {
    id: "log-2",
    type: "fallback",
    source: "agent-support-id",
    message: "Fallback triggered due to low intent confidence.",
    timestamp: "2026-04-27 13:00:44",
  },
  {
    id: "log-3",
    type: "error",
    source: "agent-retention-id",
    message: "Template rendering timeout in response composer.",
    timestamp: "2026-04-27 12:58:30",
  },
  {
    id: "log-4",
    type: "follow-up",
    source: "agent-support-id",
    message: "Scheduled follow-up message for unresolved ticket.",
    timestamp: "2026-04-27 12:55:11",
  },
];

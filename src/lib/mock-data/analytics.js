export const analyticsSummary = {
  totalTokens: 142300,
  sessions: 257,
  avgPerSession: 554,
  activeAgents: 8,
};

export const tokenUsageByAgent = [
  { label: "Support Assistant", value: 46000, color: "#6366f1" },
  { label: "Sales Assistant", value: 38500, color: "#22c55e" },
  { label: "Retention Bot", value: 22100, color: "#f59e0b" },
  { label: "Onboarding Bot", value: 17300, color: "#ef4444" },
];

export const tokenUsageBySession = [
  { label: "sess-1001", value: 1200 },
  { label: "sess-1002", value: 950 },
  { label: "sess-1003", value: 760 },
  { label: "sess-1004", value: 700 },
];

export const tokenBoxByAgent = [
  { label: "Support", min: 210, q1: 390, median: 560, q3: 740, max: 980 },
  { label: "Sales", min: 180, q1: 340, median: 500, q3: 690, max: 910 },
  { label: "Retention", min: 120, q1: 250, median: 360, q3: 520, max: 770 },
  { label: "Onboarding", min: 110, q1: 220, median: 330, q3: 470, max: 680 },
];

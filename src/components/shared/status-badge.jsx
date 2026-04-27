import { Badge } from "@/components/ui/badge";

const variantByValue = {
  active: "default",
  draft: "secondary",
  maintenance: "outline",
  open: "default",
  closed: "secondary",
  info: "secondary",
  error: "destructive",
  fallback: "outline",
  "follow-up": "default",
};

export function StatusBadge({ value }) {
  return <Badge variant={variantByValue[value] ?? "secondary"}>{value}</Badge>;
}

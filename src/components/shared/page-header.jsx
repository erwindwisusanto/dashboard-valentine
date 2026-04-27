import { Button } from "@/components/ui/button";

export function PageHeader({ title, description, actionLabel }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {actionLabel ? <Button>{actionLabel}</Button> : null}
    </div>
  );
}

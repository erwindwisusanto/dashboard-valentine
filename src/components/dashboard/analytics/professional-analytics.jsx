import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function PieLegend({ data, total }) {
  return (
    <div className="flex flex-col gap-2">
      {data.map((item) => {
        const percentage = ((item.value / total) * 100).toFixed(1);
        return (
          <div key={item.label} className="flex items-center justify-between rounded-md border px-2 py-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span>{item.label}</span>
            </div>
            <span className="text-muted-foreground">{percentage}%</span>
          </div>
        );
      })}
    </div>
  );
}

function PieChartCard({ data }) {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const stops = data
    .reduce(
      (acc, item) => {
        const start = acc.offset;
        const angle = (item.value / total) * 360;
        const end = start + angle;

        return {
          offset: end,
          parts: [...acc.parts, `${item.color} ${start}deg ${end}deg`],
        };
      },
      { offset: 0, parts: [] }
    )
    .parts.join(", ");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Share by Agent</CardTitle>
        <CardDescription>Pie diagram for token contribution distribution.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-[220px_1fr]">
        <div className="flex items-center justify-center">
          <div
            className="relative size-44 rounded-full"
            style={{ background: `conic-gradient(${stops})` }}
          >
            <div className="absolute inset-9 rounded-full bg-background" />
          </div>
        </div>
        <PieLegend data={data} total={total} />
      </CardContent>
    </Card>
  );
}

function scale(value, min, max) {
  if (max === min) return 0;
  return ((value - min) / (max - min)) * 100;
}

function BoxPlotCard({ data }) {
  const values = data.flatMap((item) => [item.min, item.q1, item.median, item.q3, item.max]);
  const minAll = Math.min(...values);
  const maxAll = Math.max(...values);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Distribution (Box Diagram)</CardTitle>
        <CardDescription>Per-agent min, Q1, median, Q3, and max session token usage.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {data.map((item) => {
          const left = scale(item.min, minAll, maxAll);
          const q1 = scale(item.q1, minAll, maxAll);
          const median = scale(item.median, minAll, maxAll);
          const q3 = scale(item.q3, minAll, maxAll);
          const right = scale(item.max, minAll, maxAll);

          return (
            <div key={item.label} className="grid gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground">{item.min} - {item.max} tokens</span>
              </div>

              <div className="relative h-9 rounded-md border bg-muted/30">
                <div
                  className="absolute top-1/2 h-px bg-foreground/50"
                  style={{ left: `${left}%`, width: `${Math.max(right - left, 1)}%` }}
                />
                <div
                  className="absolute top-2 bottom-2 rounded-sm border bg-primary/20"
                  style={{ left: `${q1}%`, width: `${Math.max(q3 - q1, 1)}%` }}
                />
                <div
                  className="absolute top-2 bottom-2 w-px bg-primary"
                  style={{ left: `${median}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function ProfessionalAnalytics({ pieData, boxData }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <PieChartCard data={pieData} />
      <BoxPlotCard data={boxData} />
    </div>
  );
}

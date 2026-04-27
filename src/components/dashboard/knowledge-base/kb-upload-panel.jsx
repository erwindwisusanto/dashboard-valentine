"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function flattenJson(value, prefix = "") {
  if (value === null || typeof value !== "object") {
    return [{ path: prefix || "(root)", value: String(value) }];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenJson(item, `${prefix}[${index}]`));
  }

  return Object.entries(value).flatMap(([key, nested]) => {
    const nextPath = prefix ? `${prefix}.${key}` : key;
    return flattenJson(nested, nextPath);
  });
}

const mockJsonRaw = JSON.stringify(
  {
    kbId: "kb-onboarding-001",
    title: "Onboarding FAQ",
    locale: "id-ID",
    chunks: [
      { id: "ch-1", topic: "activation", text: "Aktivasi paket dilakukan melalui menu Packages." },
      { id: "ch-2", topic: "billing", text: "Tagihan dapat dicek pada halaman Billing." },
    ],
    metadata: { updatedBy: "Platform Team", updatedAt: "2026-04-27" },
  },
  null,
  2
);

const mockTxtRaw = `# Retention Playbook\n\nIf user asks to cancel:\n1. Confirm reason briefly\n2. Offer retention package\n3. Escalate to human if user rejects twice\n\nTone: empathetic and concise.`;

const defaultFiles = [
  {
    name: "onboarding-faq.json",
    size: mockJsonRaw.length,
    kind: "json",
    raw: mockJsonRaw,
    parsed: JSON.parse(mockJsonRaw),
  },
  {
    name: "retention-playbook.txt",
    size: mockTxtRaw.length,
    kind: "text",
    raw: mockTxtRaw,
    parsed: null,
  },
];

export function KbUploadPanel() {
  const [files, setFiles] = useState(defaultFiles);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(defaultFiles[0].kind === "json" ? "json" : "text");

  const activeFile = files[activeIndex];


  const jsonBreakdown = useMemo(() => {
    if (!activeFile || activeFile.kind !== "json" || !activeFile.parsed) return [];
    return flattenJson(activeFile.parsed).slice(0, 120);
  }, [activeFile]);

  async function handleFiles(event) {
    const selected = Array.from(event.target.files ?? []);

    const parsedFiles = await Promise.all(
      selected.map(async (file) => {
        const raw = await file.text();
        const extension = file.name.split(".").pop()?.toLowerCase() || "";
        const looksLikeJson = extension === "json";

        if (looksLikeJson) {
          try {
            const parsed = JSON.parse(raw);
            return {
              name: file.name,
              size: file.size,
              kind: "json",
              raw,
              parsed,
            };
          } catch {
            return {
              name: file.name,
              size: file.size,
              kind: "text",
              raw,
              parsed: null,
            };
          }
        }

        return {
          name: file.name,
          size: file.size,
          kind: "text",
          raw,
          parsed: null,
        };
      })
    );

    setFiles((prev) => [...parsedFiles, ...prev]);
    setActiveIndex(0);
    if (parsedFiles[0]) {
      setActiveTab(parsedFiles[0].kind === "json" ? "json" : "text");
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Upload Knowledge Base Files</CardTitle>
          <CardDescription>Supports .json and .txt files (UI-only parser).</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Input type="file" accept=".json,.txt,.md,text/plain,application/json" multiple onChange={handleFiles} />

          <div className="flex flex-col gap-2">
            {files.map((file, index) => (
              <button
                key={`${file.name}-${index}`}
                type="button"
                className={
                  index === activeIndex
                    ? "rounded-md border bg-muted px-2 py-2 text-left"
                    : "rounded-md border px-2 py-2 text-left hover:bg-muted/50"
                }
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <Badge variant="outline">{file.kind}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{file.size.toLocaleString()} bytes</p>
              </button>
            ))}
          </div>

          <Button variant="outline">Upload to KB (Mock)</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>File Breakdown</CardTitle>
          <CardDescription>
            {activeFile ? `Inspecting ${activeFile.name}` : "Select a file to inspect content"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeFile ? (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="text">Raw Text</TabsTrigger>
                <TabsTrigger value="json" disabled={activeFile.kind !== "json"}>
                  JSON Paths
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text">
                <div className="max-h-[520px] overflow-auto rounded-md border border-zinc-700 bg-[#1e1e1e] p-3">
                  <pre className="font-mono text-xs whitespace-pre-wrap text-zinc-100">{activeFile.raw}</pre>
                </div>
              </TabsContent>

              <TabsContent value="json">
                <div className="max-h-[520px] overflow-auto rounded-md border border-zinc-700 bg-[#1e1e1e]">
                  <div className="grid grid-cols-[1.3fr_1fr] border-b border-zinc-700 bg-[#252526] px-3 py-2 font-mono text-xs font-medium text-zinc-100">
                    <span>Path</span>
                    <span>Value</span>
                  </div>
                  <div className="flex flex-col">
                    {jsonBreakdown.length === 0 ? (
                      <p className="px-3 py-3 font-mono text-xs text-zinc-300">JSON parse not available.</p>
                    ) : (
                      jsonBreakdown.map((row) => (
                        <div key={`${row.path}-${row.value}`} className="grid grid-cols-[1.3fr_1fr] border-b border-zinc-700 px-3 py-2 font-mono text-xs text-zinc-100">
                          <code className="text-[#9cdcfe]">{row.path}</code>
                          <span className="truncate text-[#ce9178]">{row.value}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <p className="text-sm text-muted-foreground">No file selected.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FaFloppyDisk } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PromptManagementPanel({
  title,
  description,
  initialName,
  initialContent,
}) {
  const [name, setName] = useState(initialName);
  const [content, setContent] = useState(initialContent);
  const [savedName, setSavedName] = useState(initialName);
  const [savedContent, setSavedContent] = useState(initialContent);

  const isDirty = name !== savedName || content !== savedContent;

  function handleSave() {
    setSavedName(name);
    setSavedContent(content);
    toast.success(`${title} saved`, {
      description: "Saved successfully (mock).",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Input value={name} onChange={(event) => setName(event.target.value)} />
        <Textarea className="min-h-44" value={content} onChange={(event) => setContent(event.target.value)} />

        <div className="flex justify-end">
          <Button disabled={!isDirty} onClick={handleSave}>
            <FaFloppyDisk data-icon="inline-start" />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

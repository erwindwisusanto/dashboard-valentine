"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

export function BackButton({ fallbackHref = "/dashboard" }) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
          return;
        }
        router.push(fallbackHref);
      }}
    >
      <FaArrowLeft data-icon="inline-start" />
      Back
    </Button>
  );
}

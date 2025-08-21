"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function UpdateProfileButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      Update {pending && <Loader2 className="animate-spin" />}
    </Button>
  );
}

export { UpdateProfileButton };

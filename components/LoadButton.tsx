/**
 * LoadButton component.
 *
 * @param limit - The maximum number of items that can be loaded.
 * @param currentLength - The current number of items loaded.
 * @returns The LoadButton component.
 */

"use client";
import { RiAddFill } from "react-icons/ri";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoadButton({
  limit,
  currentLength,
}: {
  limit: number;
  currentLength: number;
}) {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  return (
    <div className="col-span-full flex items-center justify-center">
      <Button
        className="aspect-square rounded-full p-0"
        onClick={() => {
          router.push(`/?offset=${offset + 1}`);
          setOffset(offset + 1);
        }}
        disabled={!!limit && currentLength >= limit}
      >
        <RiAddFill />
      </Button>
    </div>
  );
}

/**
 * Renders a delete button component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Session | null} props.session - The user session.
 * @param {string} props.email - The email associated with the post.
 * @param {string} props.id - The ID of the post.
 * @returns {JSX.Element} The delete button component.
 */

"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import { RiDeleteBinLine, RiMoreFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  session,
  email,
  id,
}: {
  session: Session | null;
  email: string;
  id: string;
}) {
  const router = useRouter();
  return (
    <>
      {/* @ts-ignore */}
      {session?.user?.email == email && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <RiMoreFill className="cursor-pointer text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                fetch("/api/post", {
                  method: "DELETE",
                  body: JSON.stringify({ id }),
                  cache: "no-cache",
                }).then((res) => {
                  if (res.ok) {
                    router.push("/");
                    router.refresh();
                  }
                });
              }}
            >
              <RiDeleteBinLine className="mr-3 text-lg" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}

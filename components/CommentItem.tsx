/**
 * Renders a single comment item.
 * @param {CommentItemProps} props - The props for the CommentItem component.
 * @returns {JSX.Element} The rendered CommentItem component.
 */

import Image from "next/image";
import profile from "@/public/p.png";
import { Session } from "next-auth";
import { RiMoreFill, RiDeleteBinLine } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface CommentItemProps {
  id: string;
  name: string;
  date: string;
  content: string;
  email: string;
  session: Session | null;
}

export default function CommentItem({
  id,
  name,
  date,
  content,
  email,
  session,
}: CommentItemProps) {
  return (
    <div>
      <div className="relative flex flex-col gap-5 border-b border-b-gray-200 py-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="relative aspect-square w-10 overflow-hidden rounded-full">
              <Image src={profile} alt="profile" fill sizes="100%" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-bold">{name}</p>
              <p className="text-sm text-gray-400">{date}</p>
            </div>
          </div>
          {/* @ts-ignore */}
          {session?.user?.email == email && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <RiMoreFill className="cursor-pointer text-gray-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    fetch("/api/post/comment", {
                      method: "DELETE",
                      body: JSON.stringify({ id }),
                      cache: "no-cache",
                    }).then((res) => {
                      if (res.ok) {
                        window.location.reload();
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
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
}

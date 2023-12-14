import Image from "next/image";
import profile from "@/public/p.png";

interface CommentItemProps {
  name: string;
  date: string;
  content: string;
}

export default function CommentItem({ name, date, content }: CommentItemProps) {
  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-b-gray-100 py-5">
        <div className="flex items-center gap-3">
          <div className="relative aspect-square w-10 overflow-hidden rounded-full">
            <Image src={profile} alt="profile" fill />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold">{name}</p>
            <p className="text-sm text-gray-400">{date}</p>
          </div>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
}

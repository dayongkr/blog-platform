/**
 * Represents the page component for creating a new post.
 */
"use client";
import { Button } from "@/components/ui/button";
import { Editor } from "novel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BounceLoader } from "react-spinners";

export default function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  return (
    <div className="flex w-full max-w-4xl flex-col justify-center gap-5 py-8">
      {loading && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[99] flex items-center justify-center backdrop-blur-sm">
          <BounceLoader />
        </div>
      )}
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Enter the title"
        className="w-full border-b border-b-gray-200 bg-transparent py-5 text-4xl font-bold outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor
        className={
          "border-stone-200sm:rounded-lg relative h-[500px] w-full overflow-y-auto sm:border sm:shadow-lg"
        }
        defaultValue={""}
        disableLocalStorage={true}
        onDebouncedUpdate={(editor) => {
          setContent(editor?.getHTML() ?? "");
          setDescription(editor?.getText().slice(0, 100) ?? "");
        }}
        debounceDuration={500}
      />
      <div className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="!bg-slate-900"
              disabled={content.length === 0 || title.length === 0}
            >
              Publish
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to publish this post?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will not be able to edit it after publishing.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="!bg-slate-900"
                onClick={() => {
                  setLoading(true);
                  fetch("/api/publish", {
                    method: "POST",
                    body: JSON.stringify({
                      title,
                      content,
                      description,
                      email: session.data?.user?.email,
                    }),
                    cache: "no-cache",
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      router.refresh();
                      router.push(`/posts/${res.id}`);
                      setLoading(false);
                    })
                    .catch((err) => console.log(err));
                }}
                disabled={loading}
              >
                Publish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

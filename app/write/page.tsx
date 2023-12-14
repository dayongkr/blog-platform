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

export default function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="bgwhi flex w-full max-w-4xl flex-col justify-center gap-5">
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
        }}
        debounceDuration={500}
      />
      <div className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="!bg-slate-900">Publish</Button>
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
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="!bg-slate-900">
                Publish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

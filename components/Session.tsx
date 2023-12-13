"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function Session({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={180}
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}

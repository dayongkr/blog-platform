/**
 * Renders a session provider component that wraps its children with the provided session object.
 * @param children - The children components to be wrapped by the session provider.
 * @param session - The session object containing user authentication information.
 * @returns The rendered session provider component.
 */

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

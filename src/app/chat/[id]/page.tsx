import type { Metadata } from "next";
import { ChatRoomPage } from "./ChatRoomPage";

export const metadata: Metadata = {
  title: "Chat | Hassan",
};

export default async function ChatRoom({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ChatRoomPage conversationId={id} />;
}

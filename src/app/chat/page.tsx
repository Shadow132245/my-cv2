import type { Metadata } from "next";
import { ChatListPage } from "./ChatListPage";

export const metadata: Metadata = {
  title: "Messages | Hassan",
};

export default function ChatList() {
  return <ChatListPage />;
}

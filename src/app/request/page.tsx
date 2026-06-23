import type { Metadata } from "next";
import { RequestPage } from "./RequestPage";

export const metadata: Metadata = {
  title: "Hire Me | Hassan",
  description: "Request a project — let's build something together.",
};

export default function Request() {
  return <RequestPage />;
}

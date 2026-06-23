import type { Metadata } from "next";
import { TermsPage } from "./TermsPage";

export const metadata: Metadata = {
  title: "Terms of Service | Hassan",
};

export default function Terms() {
  return <TermsPage />;
}

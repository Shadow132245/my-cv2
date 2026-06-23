import type { Metadata } from "next";
import { AdminTermsPage } from "./AdminTermsPage";

export const metadata: Metadata = {
  title: "Terms of Service | Admin",
};

export default function AdminTerms() {
  return <AdminTermsPage />;
}

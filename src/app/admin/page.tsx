import type { Metadata } from "next";
import { AdminPage } from "./AdminPage";

export const metadata: Metadata = {
  title: "Admin | Hassan",
};

export default function Admin() {
  return <AdminPage />;
}

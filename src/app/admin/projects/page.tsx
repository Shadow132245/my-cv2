import type { Metadata } from "next";
import { AdminProjectsPage } from "./AdminProjectsPage";

export const metadata: Metadata = {
  title: "Manage Projects | Admin",
};

export default function AdminProjects() {
  return <AdminProjectsPage />;
}

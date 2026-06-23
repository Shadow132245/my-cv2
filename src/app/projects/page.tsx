import type { Metadata } from "next";
import { ProjectsPage } from "./ProjectsPage";

export const metadata: Metadata = {
  title: "Projects | Hassan",
  description: "Portfolio projects by Hassan.",
};

export default function Projects() {
  return <ProjectsPage />;
}

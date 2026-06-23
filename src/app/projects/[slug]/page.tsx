import type { Metadata } from "next";
import { ProjectDetailPage } from "./ProjectDetailPage";

export const metadata: Metadata = {
  title: "Project | Hassan",
};

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetailPage slug={slug} />;
}

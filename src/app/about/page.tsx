import type { Metadata } from "next";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = {
  title: "About | Hassan",
  description: "Learn more about Hassan — a full-stack developer.",
};

export default function About() {
  return <AboutPage />;
}

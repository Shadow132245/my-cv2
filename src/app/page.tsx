"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useProjects } from "@/hooks/useProjects";

export default function HomePage() {
  const { projects } = useProjects({ featured: true });

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 py-32 md:py-48 relative">
          <FadeIn>
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium mb-4">
              Full-Stack Developer
            </div>
          </FadeIn>
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Hassan
              </span>
            </h1>
          </FadeIn>
          <FadeIn>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl">
              I build professional web applications, desktop tools, and APIs
              using Python, TypeScript, React, and Rust. Focused on clean
              architecture and user experience.
            </p>
          </FadeIn>
          <FadeIn>
            <div className="flex gap-4">
              <Link href="/projects">
                <Button size="lg">View Projects</Button>
              </Link>
              <Link href="/request">
                <Button variant="secondary" size="lg">
                  Hire Me
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold">Featured Projects</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Some of my recent work
                </p>
              </div>
              <Link
                href="/projects"
                className="hidden sm:inline-flex items-center text-sm font-medium text-indigo-600 hover:underline"
              >
                View all projects →
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((p, i) => (
              <FadeIn key={p.id} delay={i * 100}>
                <ProjectCard project={p} index={i} />
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/projects">
                <Button variant="secondary">View all projects</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative border-t border-gray-200 dark:border-gray-800 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-50/50 to-transparent dark:from-indigo-950/20" />
        <div className="max-w-6xl mx-auto px-4 text-center relative">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-3">Let&apos;s Work Together</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
              Have a project in mind? I&apos;m always open to new opportunities
              and collaborations.
            </p>
            <Link href="/request">
              <Button size="lg">Start a Project</Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

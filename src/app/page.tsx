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
      <section className="relative overflow-hidden bg-grid">
        <div className="bg-glow absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-indigo-950" />
        <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-32 md:py-48 relative">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium mb-6 border border-indigo-200/50 dark:border-indigo-700/50">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Available for new projects
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
              Full-stack developer
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                crafting digital products
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl leading-relaxed">
              I build web applications, desktop tools, and APIs using Python,
              TypeScript, React, and Rust. Focused on clean architecture,
              performance, and user experience.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-wrap gap-4">
              <Link href="/projects">
                <Button size="lg">View Projects</Button>
              </Link>
              <Link href="/request">
                <Button variant="secondary" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                  Portfolio
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                  Featured Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="mt-2 sm:mt-0 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
              >
                View all projects
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.slice(0, 3).map((p, i) => (
              <FadeIn key={p.id} delay={i * 100}>
                <ProjectCard project={p} index={i} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/10" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <FadeIn>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Collaborate
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
              Let&apos;s work together
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              Have a project in mind? I&apos;m always open to discussing new
              opportunities and bringing ideas to life.
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

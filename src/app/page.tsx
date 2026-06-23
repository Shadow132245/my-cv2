"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useProjects } from "@/hooks/useProjects";

export default function HomePage() {
  const { projects } = useProjects({ featured: true });

  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Hi, I&apos;m{" "}
            <span className="text-indigo-600">Hassan</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Full-stack developer specializing in Python, web technologies, and
            desktop applications. I build professional, performant, and
            user-focused digital products.
          </p>
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
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <Link
              href="/projects"
              className="text-sm text-indigo-600 hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            Have a project in mind? Let&apos;s discuss it. I&apos;m always open
            to new opportunities and collaborations.
          </p>
          <Link href="/request">
            <Button size="lg">Start a Project</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

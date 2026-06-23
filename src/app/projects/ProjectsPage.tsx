"use client";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { useProjects } from "@/hooks/useProjects";
import { useState } from "react";

const CATEGORIES = ["All", "Web", "Desktop", "Backend", "Tool"];

export function ProjectsPage() {
  const [category, setCategory] = useState("All");
  const { projects, loading } = useProjects({
    category: category === "All" ? undefined : category,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
      <FadeIn>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
          Work
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-2">Projects</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          A collection of things I&apos;ve built.
        </p>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="flex gap-2 mb-12 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                category === c
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </FadeIn>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden animate-pulse bg-white dark:bg-gray-900"
            >
              <div className="aspect-video bg-gray-100 dark:bg-gray-800" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full" />
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800/50">
          <p className="text-gray-400 dark:text-gray-500">No projects found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <FadeIn key={p.id} delay={i * 80}>
              <ProjectCard project={p} index={i} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}

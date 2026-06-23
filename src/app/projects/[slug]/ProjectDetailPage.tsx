"use client";

import { useEffect, useState } from "react";
import { getProjectBySlug } from "@/hooks/useProjects";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Project } from "@/types";

export function ProjectDetailPage({ slug }: { slug: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectBySlug(slug).then((p) => {
      setProject(p);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 animate-pulse space-y-4">
        <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl" />
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
        <h1 className="text-3xl font-bold mb-2">Project Not Found</h1>
        <p className="text-gray-500">The project you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28">
      <FadeIn>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium mb-4 border border-indigo-200/50 dark:border-indigo-700/50">
          {project.category}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
          {project.title}
        </h1>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="flex flex-wrap gap-2 mb-10">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={150}>
        <div className="prose prose-gray dark:prose-invert max-w-none mb-10">
          {project.longDescription.split("\n").map((line, i) => {
            if (line.startsWith("**") && line.endsWith("**")) {
              return (
                <h3 key={i} className="text-lg font-semibold mt-6 mb-2 text-gray-900 dark:text-gray-100">
                  {line.replace(/\*\*/g, "")}
                </h3>
              );
            }
            if (line.startsWith("•")) {
              return (
                <li key={i} className="text-sm text-gray-600 dark:text-gray-400 ml-4">
                  {line.replace("• ", "")}
                </li>
              );
            }
            if (line.trim() === "") return <br key={i} />;
            return (
              <p key={i} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {line}
              </p>
            );
          })}
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div className="flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              Source Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              Live Demo
            </a>
          )}
          {project.downloads?.map((d, i) => (
            <a
              key={i}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              {d.label}
            </a>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getProjectBySlug } from "@/hooks/useProjects";
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
      <div className="max-w-4xl mx-auto px-4 py-16 animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
        <p className="text-gray-500">The project you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.techStack.map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
          >
            {t}
          </span>
        ))}
      </div>

      {project.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {project.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${project.title} screenshot ${i + 1}`}
              className="rounded-xl border border-gray-200 dark:border-gray-800"
            />
          ))}
        </div>
      )}

      <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {project.longDescription || project.description}
        </p>
      </div>

      <div className="flex gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            View on GitHub
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

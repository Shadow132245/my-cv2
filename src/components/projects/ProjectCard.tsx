"use client";

import Link from "next/link";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-indigo-500 transition-colors"
    >
      <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-sm overflow-hidden">
        {project.images[0] ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span>No image</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg group-hover:text-indigo-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.techStack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

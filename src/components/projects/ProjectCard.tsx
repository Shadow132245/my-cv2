"use client";

import Link from "next/link";
import type { Project } from "@/types";

const BG_GRADIENTS = [
  "from-indigo-400 to-purple-500",
  "from-emerald-400 to-cyan-500",
  "from-orange-400 to-pink-500",
  "from-blue-400 to-violet-500",
  "from-rose-400 to-red-500",
  "from-teal-400 to-green-500",
];

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const gradient = BG_GRADIENTS[index % BG_GRADIENTS.length];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5 transition-all duration-300 bg-white dark:bg-gray-900"
    >
      <div className={`aspect-video bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
        {project.images[0] ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-white/80 text-lg font-bold tracking-wide">
            {project.title}
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.techStack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200"
            >
              {t}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

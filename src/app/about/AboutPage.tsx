"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const SKILLS = [
  { cat: "Languages", items: ["Python", "TypeScript", "Rust", "SQL"] },
  { cat: "Backend", items: ["FastAPI", "Django", "Node.js", "PostgreSQL"] },
  { cat: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { cat: "Desktop", items: ["Tauri", "Electron", "PyQt"] },
  { cat: "Tools", items: ["Docker", "Git", "CI/CD", "Linux"] },
  { cat: "Cloud", items: ["Firebase", "Vercel", "Supabase", "AWS"] },
];

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28">
      <FadeIn>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
          About
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-8">
          Who I Am
        </h1>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="prose prose-gray dark:prose-invert max-w-none mb-16">
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            I&apos;m a full-stack developer with a passion for building
            software that makes a difference. With expertise spanning
            Python, web development, and desktop applications, I craft
            solutions that are both technically sound and user-friendly.
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
            My approach combines clean architecture with pragmatic
            engineering — I believe the best code is the code that solves
            the problem without creating new ones.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={150}>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
          Expertise
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-8">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
          {SKILLS.map((group) => (
            <div
              key={group.cat}
              className="p-4 sm:p-5 rounded-xl border border-gray-200/50 dark:border-gray-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors bg-white dark:bg-gray-900/50"
            >
              <h3 className="font-semibold text-xs text-indigo-600 dark:text-indigo-400 mb-3 uppercase tracking-wider">
                {group.cat}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
          Career
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-8">
          Experience
        </h2>
        <div className="space-y-8">
          <div className="relative pl-8 border-l-2 border-indigo-200 dark:border-indigo-800">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white dark:border-gray-950" />
            <div>
              <h3 className="font-semibold">Full-Stack Developer</h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                2024 — Present
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                Building web applications, REST APIs, and desktop tools using
                modern technologies. Developed OtpVault (Tauri + React + Rust)
                and various web projects with Next.js and FastAPI.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

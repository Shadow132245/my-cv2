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
    <div className="max-w-4xl mx-auto px-4 py-20">
      <FadeIn>
        <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium mb-3">
          About Me
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Who I Am</h1>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            I&apos;m a full-stack developer with expertise in Python, web
            development, and desktop applications. I build professional,
            scalable, and user-friendly digital products using modern
            technologies.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={150}>
        <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {SKILLS.map((group) => (
            <div
              key={group.cat}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-500/50 transition-colors bg-white dark:bg-gray-900"
            >
              <h3 className="font-semibold text-sm text-indigo-600 dark:text-indigo-400 mb-3 uppercase tracking-wider">
                {group.cat}
              </h3>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <h2 className="text-2xl font-bold mb-6">Experience</h2>
        <div className="relative pl-8 border-l-2 border-indigo-200 dark:border-indigo-800 space-y-8">
          <div className="relative">
            <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-indigo-600 border-4 border-white dark:border-gray-900" />
            <h3 className="font-semibold text-lg">Full-Stack Developer</h3>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">2022 — Present</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
              Building web applications, REST APIs, and desktop tools using
              modern technologies. Developed OtpVault (Tauri + React + Rust)
              and various web projects with Next.js and FastAPI.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

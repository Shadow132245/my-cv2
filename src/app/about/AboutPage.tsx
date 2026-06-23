"use client";

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">About Me</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          I&apos;m a full-stack developer with expertise in Python, web
          development, and desktop applications. I build professional,
          scalable, and user-friendly digital products.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Skills & Technologies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { cat: "Languages", items: ["Python", "TypeScript", "Rust", "SQL"] },
            { cat: "Backend", items: ["FastAPI", "Django", "Node.js", "PostgreSQL"] },
            { cat: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"] },
            { cat: "Desktop", items: ["Tauri", "Electron", "PyQt"] },
            { cat: "Tools", items: ["Docker", "Git", "CI/CD", "Linux"] },
            { cat: "Cloud", items: ["Firebase", "Vercel", "Supabase", "AWS"] },
          ].map((group) => (
            <div
              key={group.cat}
              className="p-3 rounded-lg border border-gray-200 dark:border-gray-800"
            >
              <h3 className="font-medium text-sm text-indigo-600 mb-2">
                {group.cat}
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">Experience</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium">Full-Stack Developer</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              2022 — Present
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Building web applications, REST APIs, and desktop tools using modern
              technologies. Developed OtpVault (Tauri + React + Rust) and various
              web projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

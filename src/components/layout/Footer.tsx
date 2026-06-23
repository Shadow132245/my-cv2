import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-800/50 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="sm:col-span-2">
            <Link
              href="/"
              className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              Hassan<span className="text-indigo-600">.</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              Full-stack developer specializing in Python, web development, and
              desktop applications. Building professional digital products with
              modern technologies.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/projects", label: "Projects" },
                { href: "/request", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:fghfghffdgfhfgh@gmail.com"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Email
              </a>
              <a
                href="https://github.com/Shadow132245"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                GitHub
              </a>
              <Link
                href="/terms"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200/50 dark:border-gray-800/50 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Shadow132245. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

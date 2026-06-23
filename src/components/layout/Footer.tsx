import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-indigo-600 mb-2">Hassan</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Full-stack developer specializing in Python, web development, and
              desktop applications.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Quick Links</h4>
            <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/about" className="hover:text-indigo-600">About</Link>
              <Link href="/projects" className="hover:text-indigo-600">Projects</Link>
              <Link href="/request" className="hover:text-indigo-600">Hire Me</Link>
              <Link href="/terms" className="hover:text-indigo-600">Terms of Service</Link>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Contact</h4>
            <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
              <a href="mailto:hassan@example.com" className="hover:text-indigo-600">hassan@example.com</a>
              <a href="https://github.com/hassan" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">GitHub</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Hassan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

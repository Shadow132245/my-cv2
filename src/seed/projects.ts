import type { Project } from "@/types";

export const seedProjects: Omit<Project, "id">[] = [
  {
    title: "OtpVault",
    slug: "otpvault",
    description:
      "A secure, cross-platform desktop 2FA TOTP vault built with Tauri, React, and Rust. Features AES-256-GCM encryption, Argon2id key derivation, QR scanning, and Supabase cloud backup.",
    longDescription:
      "OtpVault is a professional-grade desktop application purpose-built for managing two-factor authentication (TOTP) codes securely. In an era where account security is paramount, OtpVault provides a local-first, encrypted vault that puts users in full control of their 2FA secrets.\n\n"
      + "**What it does:**\n"
      + "OtpVault stores, generates, and displays TOTP codes (the 6-digit codes used by Google Authenticator, Authy, etc.) in a single unified interface. Users can add accounts via QR code scanning (webcam or image upload) or manual entry, and all secrets are encrypted at rest using AES-256-GCM.\n\n"
      + "**Architecture & Tech Choices:**\n"
      + "The app follows a hybrid architecture: a Rust backend (via Tauri) handles all cryptographic operations, while a React + TypeScript frontend provides the UI. Rust was chosen deliberately for the security layer — memory-safety guarantees prevent buffer-overflow attacks on encryption routines, and the crypto runs in a sandboxed WebView, isolated from the browser's JavaScript context. Argon2id (the OWASP-recommended password hashing scheme) derives the encryption key from the user's master password, ensuring that even if the vault file is stolen, it cannot be brute-forced. Supabase acts as an opaque cloud relay — the server stores only encrypted blobs keyed by email, seeing zero plaintext secrets.\n\n"
      + "**Key features:**\n"
      + "• AES-256-GCM encryption at rest with Argon2id key derivation\n"
      + "• QR code scanning via webcam or file (pure Rust decoder via rqrr)\n"
      + "• Encrypted cloud backup/restore to Supabase (zero-knowledge)\n"
      + "• Dark/light theme with RTL-aware bilingual UI (English/Arabic)\n"
      + "• System tray integration with lock-on-minimize\n"
      + "• Export/import encrypted backup files for offline portability\n\n"
      + "**The result:** A desktop 2FA manager that is more secure than browser-based alternatives (secrets never touch the DOM) and more private than cloud solutions (the server is cryptographically blind).",
    techStack: [
      "Rust",
      "React",
      "TypeScript",
      "Tauri",
      "AES-256-GCM",
      "Argon2id",
      "Supabase",
      "Tailwind CSS",
    ],
    images: [],
    githubUrl: "https://github.com/Shadow132245",
    liveUrl: "",
    downloads: [
      { label: "Windows 64-bit", url: "https://www.mediafire.com/file/tavnk1u00sye7sk/OtpVault_0.1.0_x64_en-US.msi/file" },
      { label: "Windows 32-bit", url: "https://www.mediafire.com/file/e6ewbs4q4qp4sxy/OtpVault_0.1.0_x86_en-US.msi/file" },
    ],
    category: "Desktop",
    featured: true,
    order: 1,
    createdAt: 0,
    updatedAt: 0,
  },
  {
    title: "The Last Peace of Art",
    slug: "the-last-peace-of-art",
    description:
      "A full-stack bilingual web application built with Next.js 16, featuring Google authentication, Prisma ORM, PostgreSQL, and internationalization (Arabic/English).",
    longDescription:
      "The Last Peace of Art is a full-stack bilingual web application designed as a modern, interactive platform with complete internationalization support. It showcases production-grade full-stack engineering practices.\n\n"
      + "**What it does:**\n"
      + "The platform provides a rich user experience in both Arabic and English, with server-side rendering for SEO, Google OAuth for authentication, a PostgreSQL-backed data layer via Prisma ORM, and file storage via Vercel Blob. It features responsive design, dark/light theme support, and comprehensive test coverage.\n\n"
      + "**Architecture & Tech Choices:**\n"
      + "Built on Next.js 16 App Router, the project leverages React Server Components for optimal performance — data fetching happens on the server, reducing client-side JavaScript bundles. Prisma ORM with PostgreSQL provides type-safe database access with auto-generated TypeScript types, eliminating an entire class of runtime errors. better-auth handles authentication with Google OAuth, supporting session management and middleware-based route protection. next-intl provides full i18n with lazy-loaded translations and RTL layout switching. The testing strategy combines Vitest for unit/integration tests with Playwright for end-to-end browser tests, ensuring reliability across the full stack.\n\n"
      + "**Key features:**\n"
      + "• Full bilingual support (Arabic/English) with RTL layout switching\n"
      + "• Google OAuth authentication via better-auth\n"
      + "• Server-side rendering for SEO optimization\n"
      + "• PostgreSQL database with Prisma ORM (type-safe queries)\n"
      + "• File storage via Vercel Blob\n"
      + "• Comprehensive test suite (Vitest + Playwright E2E)\n"
      + "• Responsive design optimized for mobile and desktop\n\n"
      + "**The result:** A production-ready bilingual web application demonstrating modern Next.js patterns, from internationalization to type-safe database access and automated testing.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "better-auth",
      "Tailwind CSS",
      "Vercel",
      "Playwright",
    ],
    images: [],
    githubUrl: "https://github.com/Shadow132245",
    liveUrl: "https://lastpeace.vercel.app/",
    category: "Web",
    featured: true,
    order: 2,
    createdAt: 0,
    updatedAt: 0,
  },
];

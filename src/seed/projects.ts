import type { Project } from "@/types";

export const seedProjects: Omit<Project, "id">[] = [
  {
    title: "OtpVault",
    slug: "otpvault",
    description:
      "A secure, cross-platform desktop 2FA TOTP vault built with Tauri, React, and Rust. Features AES-256-GCM encryption, Argon2id key derivation, QR scanning, and Supabase cloud backup.",
    longDescription:
      "OtpVault is a professional desktop application for managing two-factor authentication (2FA) codes. Built with Tauri (Rust backend + React frontend), it provides military-grade encryption using AES-256-GCM with Argon2id key derivation. Features include QR code scanning via webcam or file upload, manual TOTP entry, encrypted cloud backup to Supabase, dark/light theme, RTL-aware bilingual UI (English/Arabic), and system tray integration. The entire vault is encrypted at rest and in transit — the server sees zero plaintext data.",
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
    githubUrl: "",
    liveUrl: "",
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
      "A full-stack web application built with Next.js 16, featuring authentication, internationalization, and a modern tech stack.",
    longDescription:
      "A full-stack web application showcasing modern web development practices. Built with Next.js 16 App Router, Prisma ORM with PostgreSQL, better-auth for authentication, next-intl for bilingual support (Arabic/English), and deployed on Vercel. Features include server-side rendering, API routes, database migrations, and comprehensive testing with Vitest and Playwright.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "better-auth",
      "Tailwind CSS",
      "Vercel",
    ],
    images: [],
    githubUrl: "",
    liveUrl: "",
    category: "Web",
    featured: true,
    order: 2,
    createdAt: 0,
    updatedAt: 0,
  },
];

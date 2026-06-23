# Hassan Portfolio — Project Map

## [TECH_STACK]

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | Next.js | 16.2.9 | App Router, SSR, API routes |
| UI | React | 19.2.4 | Component library |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| Language | TypeScript | 5.x | Type safety |
| Auth | Firebase Auth + Google OAuth | — | Sign-in/Sign-up |
| Database | Cloud Firestore | — | Real-time NoSQL, chat persistence |
| SDK Client | firebase | 12.15.0 | Browser Firebase integration |
| SDK Server | firebase-admin | 14.0.0 | Server-side Firestore access |
| Animations | CSS + IntersectionObserver | — | FadeIn scroll animations |
| Hosting | Vercel | — | Production deployment |

## [SYSTEM_FLOW]

```
[Visitor → Site]
    │
    ├── Public Pages
    │    ├── /              Hero (gradient + animated) + Featured Projects + CTA
    │    ├── /about         Bio + Skills grid + Timeline experience
    │    ├── /projects      Project grid (filterable by category)
    │    ├── /projects/[s]  Project detail (tech stack, downloads, links)
    │    └── /terms         Terms of Service (Firestore or static fallback)
    │
    ├── Project Request
    │    ├── Fill form (name, email, type, budget, description)
    │    ├── Creates Firestore /conversations/{id}
    │    └── Redirect → /chat/[id] (if signed in)
    │
    ├── Google OAuth (Firebase Auth)
    │    ├── Popup → Google Account
    │    ├── First-time → /users/{uid} created (role: "client")
    │    └── Admin set manually in Firestore
    │
    ├── Chat System (Real-time via Firestore onSnapshot)
    │    ├── /chat              Conversation list (client → own, admin → all)
    │    ├── /chat/[id]         Messages + paste URL → auto-embed images/videos
    │    └── Tip: paste .jpg/.png/.gif/.mp4 URLs to embed media
    │
    └── Admin Panel (role === "admin")
         ├── /admin              Dashboard (stats + navigation)
         ├── /admin/projects     CRUD (title, desc, tech, downloads, images)
         ├── /admin/terms        Editor (plain text, versioned)
         └── /chat               All conversations
```

## [ARCHITECTURE]

```
┌────────────────────────────────────────────────────────────┐
│                      Vercel                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Next.js 16                          │  │
│  │                                                       │  │
│  │  Client Pages               API Routes                │  │
│  │  ─────────────              ──────────                │  │
│  │  /  /about                  POST /api/seed            │  │
│  │  /projects  /projects/[s]   (seed project data)       │  │
│  │  /request  /chat  /chat/[id]                          │  │
│  │  /admin  /admin/projects    Firebase SDK (client)     │  │
│  │  /admin/terms  /terms       ─────────────────────     │  │
│  │                            getFirebaseApp() →         │  │
│  │  Components:               { auth, db, storage }      │  │
│  │  ────────────              lazy init, client-only     │  │
│  │  FadeIn (scroll anim)                                 │  │
│  │  Navbar (auth-aware)       Firebase Admin (server)    │  │
│  │  Footer (email/GitHub)     ─────────────────────      │  │
│  │  ProjectCard (gradients)   getAdmin() → adminDb       │  │
│  │  Button / Input / TextArea lazy init, graceful down   │  │
│  │  ChatWindow / RequestForm                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                             │                               │
└─────────────────────────────┼───────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
          ┌─────────────────┐  ┌─────────────────┐
          │   Firebase Auth  │  │  Cloud Firestore │
          │   Google OAuth   │  │  (NoSQL, Real-   │
          │                  │  │   time via on-   │
          │                  │  │   Snapshot)      │
          └─────────────────┘  └─────────────────┘
```

### Firestore Collections

```
/users/{uid}
  ├── name, email, photoURL, role ("client"|"admin"), createdAt

/projects/{id}                     ← public read, admin write
  ├── title, slug, description, longDescription
  ├── techStack[], images[], downloads[{label, url}]
  ├── githubUrl, liveUrl, category, featured, order
  ├── createdAt, updatedAt

/conversations/{id}                ← client reads own, admin reads all
  ├── clientId, name, email, projectType, budget, description
  ├── status ("new"|"in_progress"|"completed")
  ├── lastMessage, lastMessageAt, unreadCount
  ├── createdAt, updatedAt

/conversations/{id}/messages/{msgId}
  ├── senderId, name, role, text, files[{url,type,name}], createdAt

/terms/latest                      ← public read, admin write
  ├── content, version, updatedAt, publishedAt
```

### Key Design Decisions

1. **Lazy Firebase Init** — `getFirebaseApp()` uses `typeof window` guard + static ESM imports (NOT `require()`) to avoid SSR build errors
2. **FadeIn scroll animations** — Pure CSS transitions + IntersectionObserver (no heavy animation library needed)
3. **URL-based media** — Chat supports pasting image/video URLs that auto-embed (no file upload service needed)
4. **Project downloads** — `downloads[{label, url}]` field for installers/binaries
5. **Admin role** — Firestore field `users/{uid}.role`, set manually via Firebase console
6. **Commit author fix** — `git commit --amend` to match repo owner for Vercel Hobby plan

## [SESSION LOG]

### Date: 2026-06-23

| Step | Action | Detail |
|------|--------|--------|
| 1 | Architecture plan | Firebase + Next.js 16.2.9, 13 pages, real-time chat |
| 2 | Scaffold | `create-next-app` with TypeScript + Tailwind v4 |
| 3 | Firebase SDK | Installed firebase 12.15.0, firebase-admin 14.0.0 |
| 4 | Lazy init pattern | `getFirebaseApp()` + `getAdmin()` to avoid SSR errors |
| 5 | Auth | Google OAuth via Firebase, AuthContext, Navbar |
| 6 | Pages | Home, About, Projects, Project Detail, Terms |
| 7 | Request form | Creates Firestore conversation, redirects to chat |
| 8 | Chat system | Real-time via onSnapshot, conversation list |
| 9 | File upload | Changed from Firebase Storage → URL-paste (simpler, no cost) |
| 10 | Admin panel | Dashboard, Projects CRUD, Terms editor |
| 11 | Seed data | OtpVault + The Last Peace of Art pre-configured |
| 12 | Build verification | `next build` passed — 13 pages, TypeScript ✅ |
| 13 | Push to GitHub | `git@github.com:Shadow132245/my-cv2.git` |
| 14 | Vercel blocked | Fixed by making repo Public + `--amend` commit author |
| 15 | Contact info | Footer updated: fghfghffdgfhfgh@gmail.com + github.com/Shadow132245 |
| 16 | Project data | OtpVault: mediafire downloads (64/32bit). Last Peace: lastpeace.vercel.app |
| 17 | Design polish | Gradient hero, FadeIn animations, hover effects, professional cards |
| 18 | Admin form | Added downloads field (Label\|URL format) |
| 19 | ProjectDetail | Shows GitHub, Live Demo, Download buttons |

## [ENV TEMPLATE]

```env
# From Firebase Console → Project Settings → Your apps → Web App
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# From Firebase → Project Settings → Service Accounts → Generate new private key
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
FIREBASE_ADMIN_PROJECT_ID=

# Your UID from Firestore /users/{uid} (set role to "admin" manually)
ADMIN_UID=
```

## [ORPHANS & PENDING]

| Item | Status | Notes |
|---|---|---|
| Firebase project setup | ❌ PENDING | User must create Firebase project + fill env vars |
| Admin UID config | ❌ PENDING | Sign in → Firestore → set role="admin" |
| Deploy to Vercel | ❌ PENDING | Import repo, add env vars, Deploy |
| POST /api/seed | ❌ PENDING | After deploy, seed OtpVault + Last Peace data |
| Dark mode toggle | ❌ PENDING | Currently follows system preference only |
| Screenshots | ❌ PENDING | Add actual project images to Firebase Storage or URLs |
| Custom domain | ❌ PENDING | Can add custom domain in Vercel |

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
| Media | URL embed | — | Paste image/video links in chat |
| SDK Client | firebase | 12.15.0 | Browser Firebase integration |
| SDK Server | firebase-admin | 14.0.0 | Server-side Firestore access |
| Animations | motion | 12.40.0 | Page/component transitions |
| Hosting | Vercel | — | Production deployment |

## [SYSTEM_FLOW]

```
[Visitor → Site]
    │
    ├── Public Pages
    │    ├── /              Hero + Featured Projects
    │    ├── /about         Bio + Skills + Experience
    │    ├── /projects      All projects (filterable by category)
    │    ├── /projects/[s]  Project detail
    │    └── /terms         Terms of Service (Firestore or fallback static)
    │
    ├── Project Request
    │    ├── Fill form (name, email, type, budget, description)
    │    ├── Creates Firestore /conversations/{id}
    │    ├── Google OAuth recommended (for chat access)
    │    └── Redirect → /chat/[id]
    │
    ├── Google OAuth (Firebase Auth)
    │    ├── Popup → Google Account
    │    ├── First-time → /users/{uid} created
    │    └── Role defaults to "client" (admin set manually in Firestore)
    │
    ├── Chat System
    │    ├── /chat              Conversation list (client sees own, admin sees all)
    │    ├── /chat/[id]         Real-time messages via Firestore onSnapshot
    │    ├── File upload        → Firebase Storage /chats/{convId}/*
    │    ├── Messages           → /conversations/{id}/messages/{msgId}
    │    └── Admin sees all, client sees own
    │
    └── Admin Panel (role === "admin")
         ├── /admin              Dashboard with stats
         ├── /admin/projects     CRUD portfolio projects
         ├── /admin/terms        Edit Terms of Service
         └── /chat               Conversations view
```

## [ARCHITECTURE]

```
┌────────────────────────────────────────────────────────────┐
│                      Vercel                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Next.js 16                          │  │
│  │                                                       │  │
│  │  ┌── Client Components ──┐  ┌── API Routes ────────┐  │  │
│  │  │                        │  │                       │  │  │
│  │  │ /          (Home)      │  │ POST /api/seed       │  │  │
│  │  │ /about     (About)     │  │ (admin project seed) │  │  │
│  │  │ /projects  (List)      │  │                       │  │  │
│  │  │ /projects/[s] (Det.)   │  └───────────────────────┘  │  │
│  │  │ /request   (Form)      │                              │  │
│  │  │ /chat      (List)      │  ┌── Firebase SDK ────────┐  │  │
│  │  │ /chat/[id] (Room)      │  │                        │  │  │
│  │  │ /admin     (Dashboard) │  │ auth.google.signIn()   │  │  │
│  │  │ /admin/projects (CRUD) │  │ firestore.onSnapshot() │  │  │
│  │  │ /admin/terms (Editor)  │  │ storage.upload()       │  │  │
│  │  │ /terms      (ToS)      │  │                        │  │  │
│  │  │                        │  └────────────────────────┘  │  │
│  │  └────────────────────────┘                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                             │                                  │
└─────────────────────────────┼──────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
     ┌──────────────┐ ┌────────────┐ ┌──────────────┐
     │ Firebase Auth │ │ Cloud      │ │ Firebase     │
     │ Google OAuth  │ │ Firestore  │ │ Storage      │
     │               │ │ (NoSQL,    │ │ (images,     │
     │               │ │  real-time) │ │  videos)     │
     └──────────────┘ └────────────┘ └──────────────┘
```

### Firestore Collections

```
/users/{uid}
  ├── name, email, photoURL, role ("client"|"admin"), createdAt

/projects/{id}                     ← public read, admin write
  ├── title, slug, description, longDescription
  ├── techStack: string[], images: string[]
  ├── githubUrl, liveUrl, category, featured, order
  ├── createdAt, updatedAt

/conversations/{id}                ← client reads own, admin reads all
  ├── clientId, clientName, clientEmail
  ├── projectType, budget, description
  ├── status ("new"|"in_progress"|"completed")
  ├── lastMessage, lastMessageAt, unreadCount
  ├── createdAt, updatedAt

/conversations/{id}/messages/{msgId}
  ├── senderId, senderName, senderRole
  ├── text, files: [{url, type, name}], createdAt

/terms/latest                      ← public read, admin write
  ├── content (plain text), version, updatedAt, publishedAt
```

### Key Design Decisions

1. **Lazy Firebase Init** — `getFirebaseApp()` (firebase.ts) initializes only on client side, avoiding SSR build errors
2. **getAdmin()** (firebase-admin.ts) lazy-initializes with graceful fallback when env vars missing
3. **All Firebase queries are reactive** via `onSnapshot` for real-time updates
4. **Admin role** is a Firestore field (`users/{uid}.role`), set manually or via Firebase console
5. **No OAuth popup for chat alone** — user can submit request without auth, but chat requires sign-in

## [ORPHANS & PENDING]

| Item | Status | Notes |
|---|---|---|
| M1 — Project scaffold | ✅ DONE | Next.js 16 + Tailwind + TypeScript |
| M1 — Firebase SDK | ✅ DONE | firebase 12.15.0, firebase-admin 14.0.0 |
| M1 — Lazy Firebase init | ✅ DONE | getFirebaseApp(), getAdmin() |
| M2 — Google OAuth | ✅ DONE | AuthContext + Navbar |
| M2 — Protected routes | ✅ DONE | Chat + Admin guard via useAuth |
| M2 — Layout (Navbar/Footer) | ✅ DONE | Responsive, auth-aware |
| M3 — Home page | ✅ DONE | Hero + Featured Projects + CTA |
| M3 — About page | ✅ DONE | Bio + Skills grid + Experience |
| M3 — Projects list | ✅ DONE | Category filter + loading skeleton |
| M3 — Project detail | ✅ DONE | SSR slug → client fetch |
| M3 — Terms of Service | ✅ DONE | Firestore-backed with fallback static |
| M4 — Request form | ✅ DONE | Creates conversation, redirects to chat |
| M4 — Conversation list | ✅ DONE | Client sees own, admin sees all |
| M4 — Chat room | ✅ DONE | Real-time messages via onSnapshot |
| M5 — File upload | ✅ DONE (URL-based) | Paste image/video URL → auto-embed in chat |
| M6 — Admin dashboard | ✅ DONE | Stats + navigation cards |
| M6 — Projects CRUD | ✅ DONE | Add/edit/delete with form |
| M6 — Terms editor | ✅ DONE | Text editor with versioning |
| M7 — Seed data | ✅ DONE | OtpVault + The Last Peace of Art |
| M7 — Animations | ❌ PENDING | Add motion library transitions |
| M7 — SEO meta tags | ✅ DONE | Per-page metadata |
| M7 — Loading/empty/error states | ✅ DONE | Skeleton, empty messages, error banners |
| M8 — Firestore rules | ✅ DONE | Role-based read/write security |
| M8 — Storage rules | ✅ DONE | Authenticated chat uploads |
| M8 — Env template | ✅ DONE | .env.local.example |
| M8 — Vercel deploy | ❌ PENDING | Requires Firebase project + env vars |
| — Firebase project setup | ❌ PENDING | User must create Firebase project |
| — Admin UID configuration | ❌ PENDING | Set ADMIN_UID + admin role in Firestore |
| — Responsive polish | 🟡 PARTIAL | Basic responsive done, needs testing |
| — Dark mode toggle | ❌ PENDING | Currently follows system preference |

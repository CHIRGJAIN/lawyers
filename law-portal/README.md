# LexLink – LinkedIn-style Lawyer Portal

## Getting Started
```bash
cd law-portal
npm install
npm run dev
```
Visit http://localhost:3000 to explore the experience.

## Architecture & Stack
- **Framework**: Next.js (App Router) + React 18 + TypeScript
- **Styling**: TailwindCSS with LinkedIn-inspired tokens defined in `app/globals.css` and `tailwind.config.ts`
- **Routing helpers**: see `lib/routes.ts`
- **Mock data**: `lib/data.ts` seeds lawyers, feed posts, and news widgets

## Core Layout & Components
- `components/layout/Navbar.tsx` – sticky global nav with search, icon tabs, and skip link
- `components/layout/PageShell.tsx` – responsive 3-column shell (280px / fluid / 320px)
- `components/LeftSidebar.tsx`, `components/RightSidebar.tsx` – profile snapshot, analytics, news, suggested lawyers
- `components/feed/StartComposer.tsx` – “Start a legal update” entry point routing to `/compose`
- `components/FeedPost.tsx` – reusable post card with like toggle, comment/share links, referral CTA
- `components/messaging/MessageBar.tsx` – floating messaging dock with mini header, conversation list, and inline replies

## Pages & Flows
- `/` – home feed (composer + posts)
- `/compose` – full composer route with autofocus + actions
- `/profile/[id]` – lawyer profile with featured cases, experience, and updates
- `/messages` – two-pane messaging placeholder with thread list and consultation CTA
- `/settings` – account preferences form with inline “Settings saved” state
- `/login` & `/register` – auth flows that redirect to `/` or `/profile/me`
- `/network`, `/opportunities`, `/alerts` – structured stubs for future data wiring

Every interactive element uses `<Link/>` or router navigation and preserves focus outlines for accessibility.

## Theming & Utilities
- CSS variables in `app/globals.css` mirror LinkedIn’s palette (lnk-blue, lnk-text, etc.)
- Utility classes: `.card`, `.btn-primary`, `.btn-outline`, `.btn-ghost`, `.input`, `.pill`
- Hover states elevate cards, nav items highlight when active, and focus-visible applies a consistent ring

## Extending LexLink
- Replace mock avatars/cover images in `public/avatars` & `public/feed`
- Connect `/messages` to real threads and WebSocket providers
- Persist settings and posts by wiring forms to your API layer
- Expand `/opportunities` with live marketplace data and filters

This project is frontend-only; integrate authentication, persistence, and messaging backends as needed.

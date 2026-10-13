# Project Context and Conventions

## Core Architectural Principles

1. **Tech Stack**: React 19 + TypeScript + Vite + React Router (`react-router-dom`).
2. **Single-Page Application Routing**: All routes (`/`, `/tools`, `/tools/gifToZip`, `/me`) must be defined as React page components under `src/pages/` and registered in `src/App.tsx`.
3. **Pure Client-Side Operations**: Tools like GIF processing must run entirely in the browser using client-side Web APIs and WebAssembly/JS libraries (`jszip`, `omggif`).

## Naming Conventions & Code Style

* **Files and Directories**:
  * React Component files: `PascalCase.tsx` (e.g., `src/pages/Tools/GifToZip.tsx`, `src/pages/Me.tsx`).
  * Non-component utilities & assets: `camelCase.ts` or `camelCase.svg`.
* **TypeScript Discipline**:
  * Explicitly type all state, props, and async event handlers.
  * No `any` types unless interfacing with un-typed external JS libraries.
* **Styling**: Shared Shōwa CRT pixel tokens live in `src/styles/crtPixel.css`. Use `DotGothic16` for body/CJK and `Press Start 2P` for short Latin labels.

## Main Interface and Tools Design System

* Home remains an operating-system desktop: `DesktopBackground` provides pixel city wallpapers, `DesktopIcons` provides draggable shortcuts, `MacMenuBar` provides system menus, and `Dock` is the persistent taskbar. Do not replace the desktop with a dashboard or card-based home page.
* `CrtTube` wraps the live UI in a thin bezel, squircle glass, calibrated barrel filter, soft phosphor glow and canvas scanlines. Keep reflections outside the warped layer.
* Desktop tubes use a 4:3 ratio; portrait tubes use 3:4. Size the interface in `em` from the tube's font size. Put scrolling content in `.screen-board`, keeping the header and navigation visible.
* Use cream (`--crt-cream`), pink (`--crt-pink`), rose (`--crt-rose`) and tan (`--crt-tan`) panels on the blue phosphor ground. Dark ink (`--crt-ink`) is for light surfaces.
* Apply `.px` stepped corners to panels, buttons and bars. Draw frames with inset `box-shadow`; use no visible CSS borders. Media crop handles must remain unclipped.
* Reuse `CrtHeader` and `CrtNavigation`. `Tools/Layout.tsx` supplies the shared frame for individual utilities. Tools remain fully client-side and preserve existing conversion behavior.
* Pair interactive hover styles with active and keyboard focus states. File selection areas support Enter and Space. Use reduced-motion preferences for optional effects.
* Verify screenshots at desktop and phone sizes, including curved navigation, glass seams, visible controls and scroll access. Keep application windows inside the measured desktop area.

## Deployment Contract

* **Branch Strategy**: Development occurs on feature branches or `main`.
* **Automated Publishing**: Never manually compile or copy `dist/` into the source tree. GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to the `gh-pages` branch upon pushing to `main`.

## SEO Conventions

* **Meta Tags Management**: We use `react-helmet-async` for dynamic SEO tags. Every new page component MUST include a `<Helmet>` block containing at least a `<title>` and `<meta name="description" content="..." />`.
* **Headings**: Ensure each page has exactly one clear `<h1>` that describes its primary purpose.
* **Sitemap**: When adding new public routes, make sure to add the new URL to `public/sitemap.xml`.
* **Robots**: `public/robots.txt` is configured to allow crawling.

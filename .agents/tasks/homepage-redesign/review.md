# Homepage Redesign — Code Review

**Commit:** `52e47e0` feat: full homepage redesign — warm palette, Source Serif 4, all home sections rebuilt from scratch.  
**tsc evidence:** Commit message records `tsc: clean (0 errors)`; spot-check `npx tsc --noEmit --skipLibCheck` exits 0.

---

## Per-Requirement Verification

### Req 1 — globals.css: warm ivory/terracotta tokens, existing tokens preserved
**PASS.** `@theme inline` in `src/app/globals.css` retains all prior navy/gold/teal/purple/orange tokens and adds the full warm palette (`--color-surface`, `--color-surface-dim`, `--color-primary-warm`, etc.).

### Req 2 — layout.tsx: Source Serif 4, --font-serif, both variables on `<html>`, Navbar + Footer
**PASS.** `Source_Serif_4` imported from `next/font/google` with `variable: "--font-serif"`. `<html>` carries `${inter.variable} ${sourceSerif.variable}`. `<Navbar>` and `<Footer>` are rendered as siblings of `{children}` in the layout body.

### Req 3 — Navbar: fixed top, no year switcher, lucide-react only (Building2, Menu, X), Source Serif 4 brand, 7 nav links
**PASS.** `fixed top-0 inset-x-0 z-50`. No year switcher logic. Only `Building2`, `Menu`, `X` from `lucide-react`. Brand uses `font-serif`. `NAV_LINKS` has exactly 7 entries: Home, About, Tracks, Speakers, Programme, Gallery, Contact.

### Req 4 — Footer: dark bg-[#211a15], 4-column grid, lucide icons only (MapPin, Mail, ExternalLink)
**PASS.** `bg-[#211a15]` on `<footer>`. Inner grid is `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`. Icons are `MapPin`, `Mail`, `ExternalLink` from `lucide-react` only.

### Req 5 — page.tsx: server component, all data fetched with hardcoded "2026", HomeHero→…→HomePartners, no Navbar/Footer
**PASS.** `export default async function Home()` (no `"use client"`). All 10 `Promise.all` fetches pass the string literal `"2026"`. Renders the required 8-component sequence: `HomeHero → HomeAbout → HomeTracks → HomeSpeakers → HomeSchedule → HomeFees → HomeGallery → HomePartners`. No Navbar or Footer in JSX.

Minor observation (not a blocker): `cfpData` is destructured from `Promise.all` but never passed to any component. TypeScript does not flag this because `noUnusedLocals` is not enabled. The superfluous fetch imposes a small extra Sanity query per request but causes no correctness failure.

### Req 6 — All src/components/home/ components exist
**PASS.** HomeHero, HomeAbout, HomeTracks, HomeSpeakers, HomeSchedule, HomeFees, HomeGallery, HomePartners all present and non-empty.

### Req 7 — src/app/[year]/page.tsx simplified to redirect to /
**PASS.** File contains only `import { redirect }` and `redirect("/")`. Props type is defined but `params` is not consumed; TypeScript does not error because `noUnusedParameters` is not enabled.

### Req 8 — tsc --noEmit --skipLibCheck: 0 errors
**PASS.** Commit message records `tsc: clean (0 errors)`. Independent spot-check (`npx tsc --noEmit --skipLibCheck` from project root) exits 0 with no output.

### Req 9 — No inline SVG icons, no Material Symbols
**PASS.** None of the 14 changed files contain `<svg` elements. `Gallery.tsx` retains pre-existing inline SVGs for its slider arrows, but `Gallery.tsx` was not modified by this commit (confirmed by `git diff`).

### Req 10 — No new npm packages installed
**PASS.** `framer-motion` (used in `HomeHero.tsx`) was already in `package.json` before this commit. No new entries were added to `package.json`.

### Req 11 — Protected files not modified
**PASS.** `git diff HEAD~1 HEAD` for `sanity/`, `src/lib/sanity.ts`, `src/components/Gallery.tsx`, `src/components/GalleryPage.tsx`, `src/app/gallery/page.tsx`, `src/app/schedule/page.tsx`, and `src/app/studio/` all produce empty diffs.

---

## Verdict

**APPROVED** — All 11 requirements are satisfied. No blockers found. The one observation (unused `cfpData` fetch) is cosmetic dead code that does not affect correctness, type safety, or runtime behavior.

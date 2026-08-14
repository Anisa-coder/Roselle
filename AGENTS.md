# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 App Router project using React 19, TypeScript, and Tailwind CSS 4.

- `src/app/` contains routes and application code. `page.tsx` defines the home page, `layout.tsx` provides the root layout, and `globals.css` contains shared styles.
- `public/` stores static assets served from the site root, such as `/next.svg`.
- Root configuration files include `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, and `postcss.config.mjs`.
- Generated directories such as `.next/`, `out/`, `build/`, and `coverage/` must remain untracked.

Keep route-specific components close to their route. Place reusable UI in `src/components/` and shared utilities in `src/lib/` as those areas are introduced.

## Build, Test, and Development Commands

Use the lockfile-backed npm workflow:

- `npm ci` installs exact dependency versions for a clean checkout or CI run.
- `npm run dev` starts the development server at `http://localhost:3000` with hot reload.
- `npm run lint` checks TypeScript and React code with Next.js ESLint rules.
- `npm run build` creates a production build and catches compilation or route-generation errors.
- `npm start` serves the completed production build.

Run `npm run lint` and `npm run build` before opening a pull request.

## Coding Style & Naming Conventions

Follow the existing two-space indentation, double quotes, semicolons, and trailing commas. Keep TypeScript strict and avoid `any`. Use PascalCase for React components and types, camelCase for functions and variables, and lowercase route folder names. Prefer the `@/` alias for imports from `src/`. Use Server Components by default; add `"use client"` only when browser APIs, state, or effects require it. Prefer Tailwind utility classes over one-off CSS, reserving `globals.css` for shared tokens and global rules.

## Testing Guidelines

No automated test framework is configured yet. For every change, lint and build the app, then manually verify affected routes in development. If tests are added, colocate them as `*.test.ts` or `*.test.tsx`, add an `npm test` script, and document the selected framework here. Focus coverage on user-visible behavior and shared utilities.

## Commit & Pull Request Guidelines

History contains only the Create Next App bootstrap commit, so no project-specific convention is established. Use short, imperative subjects such as `Add responsive navigation`. Keep each commit focused. Pull requests should explain the change and validation performed, link relevant issues, and include screenshots for visual updates. Call out configuration changes, new environment variables, and follow-up work; never commit `.env*` files or secrets.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Copilot Instructions for PGP Gen

## Project Overview

- **Frameworks:** React, React Router, Vite, TailwindCSS, TypeScript
- **Architecture:** Full-stack React app with server-side rendering, client-side routing, and asset bundling. Source code is in `app/`, build output in `build/`.
- **Major Components:**
  - `app/components/`: Reusable UI elements (button, input, label, nav-bar, textarea, textbox)
  - `app/routes/`: Page-level route handlers (404, decrypt, encrypt, generate)
  - `app/lib/utils.ts`: Utility functions
  - `app/root.tsx`, `app/routes.ts`: App entry and route config

## Developer Workflows

- **Install dependencies:** `npm install` or `pnpm install`
- **Start dev server:** `npm run dev` (Vite, HMR enabled)
- **Build for production:** `npm run build` (outputs to `build/`)
- **Docker build/run:**
  - Build: `docker build -t my-app .`
  - Run: `docker run -p 3000:3000 my-app`
- **Production deploy:** Serve files from `build/client/` (static) and `build/server/` (SSR)

## Patterns & Conventions

- **Routing:** All page routes are defined in `app/routes/` and registered via `app/routes.ts`.
- **Components:** UI components are colocated in `app/components/` and use TailwindCSS for styling.
- **TypeScript:** All source files use TypeScript. Prefer type-safe patterns and explicit types.
- **Styling:** Use Tailwind utility classes in JSX. Global styles in `app/app.css`.
- **Error pages:** Custom 404 route in `app/routes/404.tsx`.
- **Utilities:** Shared logic in `app/lib/utils.ts`.

## Integration Points

- **React Router:** Handles navigation and SSR. See `react-router.config.ts` for advanced config.
- **Vite:** Used for dev server and build. Config in `vite.config.ts`.
- **TailwindCSS:** Config in `tailwind.config.ts`.
- **Docker:** Containerization via `Dockerfile`.

## Examples

- To add a new page, create a file in `app/routes/` and register it in `app/routes.ts`.
- To add a new UI element, create a component in `app/components/` and import as needed.
- To update global styles, edit `app/app.css`.

## References

- [README.md](../README.md) for setup, build, and deployment details
- [React Router docs](https://reactrouter.com/)
- [TailwindCSS docs](https://tailwindcss.com/)

---

For questions or unclear conventions, ask for clarification or review the referenced files above.

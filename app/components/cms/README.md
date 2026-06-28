# CMS – porting to a new site

This CMS is built to be copied between sites. The frontend and backend always go
together and are copied as a pair.

## What to copy / provide on the target site

1. **Frontend folder** – `app/components/cms/` (this folder, incl. `stores/` and `lib/`)
2. **Backend folder** – `server/routes/cms/` (auto-mapped to `/cms/*` by Nitro)
3. **`server/db/cmsConfig.ts`** – site-specific table, field, graph and static-content config
4. **Database** – `server/db/schema.ts` + `server/db/client.ts` (site-specific) plus migrations
5. **Cloudflare bindings** – `DB` (D1) and `FILES` (R2)
6. **CMS Tailwind config** – `tailwind.cms.styles.js` (in the project root)
7. **Entry page** – `app/pages/admin.vue` (defines the `/admin` route)
8. **runtimeConfig / env** – see below

### runtimeConfig / env variables

Server (private):
- `userName`, `userPass` – basic auth for `/cms/*`
- `mailgunApiKey`, `emailFrom` – password reset via email

Public:
- `public.userName`, `public.userPass` – basic auth header sent from the client
- `public.imageBaseUrl` – base URL for uploaded files (`cms-files/...`)

## Packages required by the CMS

Versions reflect the current `package.json`.

### Frontend (dependencies)

| Package | Version | Used by |
| --- | --- | --- |
| `pinia` | ^3.0.4 | `stores/cmsStore.js`, `stores/loginStore.js` |
| `@pinia/nuxt` | ^0.11.3 | Nuxt module for Pinia |
| `pinia-plugin-persistedstate` | ^4.7.1 | `loginStore` (`persist: true`) |
| `@vuepic/vue-datepicker` | ^12.1.0 | `Inputs.vue` (date / date range) |
| `date-fns` | ^4.1.0 | `Inputs.vue` (Swedish locale) |
| `vue-chartjs` | ^5.3.3 | `Graph.vue` |
| `chart.js` | ^4.5.1 | `Graph.vue` |
| `vue-draggable-next` | ^2.3.0 | `Items.vue` (drag sorting) |
| `tailwindcss` | ^4.1.18 | styling (via `tailwind.cms.styles.js`) |
| `@tailwindcss/vite` | ^4.1.18 | Tailwind Vite plugin |

### Frontend (devDependencies)

| Package | Version | Used by |
| --- | --- | --- |
| `unplugin-icons` | ^23.0.1 | `~icons/*` imports (Navbar, ItemTitle, Inputs) |
| `@iconify/json` | ^2.2.435 | icon sets (`ion`, `fa7-solid`, `system-uicons`, `famicons`) |

### Backend (dependencies)

| Package | Version | Used by |
| --- | --- | --- |
| `drizzle-orm` | ^0.45.1 | all routes (DB queries against D1) |
| `@cloudflare/workers-types` | ^4.x (dev) | types for D1/R2 bindings |

> The backend also uses built-in Node/Workers APIs: `crypto` (`randomUUID` in
> `reset.js`) and Web Crypto (`crypto.subtle` in `utils/password.js`). These
> require no npm packages.

## Folder-internal dependencies (no external coupling)

- `lib/months.js` – local copy, so the CMS doesn't rely on `app/utils/`
- `server/routes/cms/utils/check-login.js` and `send-email.js` – local copies, so
  the backend folder is self-contained

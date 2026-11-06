# Borås Hemvärnsförening

Development and deployment scripts are listed in [package.json](./package.json).

## CMS

The CMS is imported from the separate `framecore-cms` package, which provides
the admin page, API routes and CMS styles. All site-specific table definitions,
including users and static content, are in `server/db/schema.ts`. The CMS
package does not define any tables. Migrations also remain in this repository;
`server/cms.config.ts` defines which content can be edited.

The CMS dependency is pinned to GitHub tag `0.3.0` through
`github:ArtMooney/framecore-cms#0.3.0`. Run `npm install` in this repository to
install that version and its dependencies. No sibling CMS checkout is required.
The CMS has its own `tailwind.config.js`; no separate CSS build is needed.

The CMS reuses this site's heading and body fonts through the following block
in `app/assets/css/main.css`, placed after `@config`:

```css
:root {
  --font-body: theme(--font-body);
  --font-heading: theme(--font-heading);
}
```

Keep this block when changing the site's stylesheet. It reads the font names
from this site's existing `tailwind.config.js` at build time, so they are only
defined in one place. Without these variables, the CMS inherits the body font
instead of using separate heading and body fonts.

To develop the CMS locally, keep the repositories side by side, run `npm install`
in the CMS repository, then run `npm install ../framecore-cms` in this site.
Source and style changes are processed by this site's dev server. To restore
the released version, run `npm install "github:ArtMooney/framecore-cms#0.3.0"`
and restart the dev server.

To update the deployed CMS version, install a new pushed Git tag and commit both
`package.json` and `package-lock.json`. Each site chooses when to update and
redeploy.

### Admin sessions

CMS 0.3.0 requires `NUXT_CMS_SESSION_PASSWORD`, a server-only random secret of
at least 32 characters. Generate it with `openssl rand -hex 32` and set it in
this site's ignored `.env` for local development. Before deploying, configure
separate secrets in Cloudflare's production and preview runtime environments.
Keep each environment's secret stable across deployments; changing it signs
everyone out. Never use a `NUXT_PUBLIC_` variable for this secret.

No database migration or CMS config change is needed for this upgrade. Existing
administrators must log in again, and older password reset links must be
requested again. The public `/cms/static` API keeps its existing authentication.

## Email

Set `NUXT_CMS_MAILGUN_DOMAIN` to the sending domain configured in Mailgun.
`NUXT_CMS_MAILGUN_BASE_URL` optionally overrides the default EU API endpoint,
`https://api.eu.mailgun.net`. These settings are shared by the site's contact,
membership and booking emails and the CMS password emails.

Use this site's `.env` locally. Before deploying, configure the Mailgun domain
in the site's Cloudflare environment variables for production and preview;
configure the base URL there too if overriding the default. The existing
`NUXT_MAILGUN_API_KEY` and sender/recipient settings are still used.

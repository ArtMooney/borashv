# Borås Hemvärnsförening

Development and deployment scripts are listed in [package.json](./package.json).

## CMS

The CMS is imported from the separate `framecore-cms` package, which provides
the admin page, API routes and CMS styles. All site-specific table definitions,
including users and static content, are in `server/db/schema.ts`. The CMS
package does not define any tables. Migrations also remain in this repository;
`server/cms.config.ts` defines which content can be edited.

Local development uses `file:../framecore-cms`, so the repositories must be
located side by side. Run `npm install` in the CMS repository, then in this
repository. CMS code and style changes are processed directly by this site's dev server.
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

Before building in CI, replace the local dependency with a version pushed to
GitHub, such as `github:ArtMooney/framecore-cms#v0.2.0` once that tag has been
created and pushed. Each site chooses when to update its package version and
redeploy.

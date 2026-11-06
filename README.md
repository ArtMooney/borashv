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
repository. CMS code changes are used directly; after changing styles, run
`npm run build:css` in the CMS repository.

Before building in CI, replace the local dependency with a version pushed to
GitHub, such as `github:ArtMooney/framecore-cms#v0.2.0` once that tag has been
created and pushed. Each site chooses when to update its package version and
redeploy.

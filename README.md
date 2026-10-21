# Borås Hemvärnsförening

Development and deploy scripts in [package.json](./package.json).

## CMS

CMS:et importeras från det separata paketet `framecore-cms`. Adminsidan,
API-rutterna och CMS-stilarna kommer från paketet. Alla sajtens tabelldefinitioner,
inklusive användare och statiskt innehåll, finns i `server/db/schema.ts`. CMS-paketet definierar inga tabeller. Migrationerna
ligger också kvar här; `server/cms.config.ts` beskriver vad som kan
redigeras.

Under lokal utveckling används `file:../framecore-cms`, så reporna ska ligga
bredvid varandra. Kör `npm install` i CMS-repot och sedan i detta repo.
Ändringar i CMS-koden används direkt; efter stiländringar körs
`npm run build:css` i CMS-repot.

Inför bygge i CI ersätts den lokala länken med en pushad version, exempelvis
`github:ArtMooney/framecore-cms#v0.2.0` när den taggen har skapats och pushats.
Varje sajt väljer själv när paketversionen uppdateras och sajten deployas igen.

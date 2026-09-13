# gorbagana-docs

Documentation site for Gorbagana builders, validators, and users.

## Features

- **Docs at the site root:** the overview is `/`; other pages are `/quickstart`, `/build`, and so on.
- **MDX content:** pages live in `content/docs` and are indexed by Fumadocs.
- **Local search:** the app exposes a local search API for the docs shell.
- **Dark theme:** the UI is styled to match the Gorbagana website.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

No environment variables are required for the docs app.

## Deployment

Deploy this app as the documentation site for `docs.gorbagana.wtf`.

Use the standard Next.js build command:

```bash
npm run build
```

The production domain should point directly to this app. The main website can link to it from the Docs CTA.

## Project structure

- `content/docs`: MDX documentation pages.
- `src/app/(docs)`: Fumadocs layout and page routes.
- `src/app/api/search/route.ts`: local search API.
- `src/lib/source.ts`: Fumadocs content source loader.

## Commands

```bash
npm run dev          # start the local server
npm run lint         # run ESLint
npm run types:check  # generate docs types and type-check
npm run build        # build for production
```

## Tech Stack

- [Next.js](https://nextjs.org/): app framework
- [Fumadocs](https://fumadocs.dev/): docs UI and MDX source
- [Tailwind CSS](https://tailwindcss.com/): styling

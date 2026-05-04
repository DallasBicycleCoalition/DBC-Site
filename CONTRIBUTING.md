# Contributing to the DBC Site

Thanks for helping improve the Dallas Bicycle Coalition website. This repository
contains the Astro frontend and Sanity CMS admin for the site.

## What Contributions Are Welcome

Good contributions include:

- UI and layout improvements in Astro, React, CSS, and shared components.
- Accessibility, responsive design, and performance fixes.
- New or improved Sanity schemas for pages, posts, events, and shared content
  shapes.
- GROQ query updates and generated type updates that keep page data strongly
  typed.
- Content-rendering improvements that make existing Sanity content display more
  clearly.
- Mock, fixture, or fallback content that lets contributors work without direct
  CMS access.
- Documentation improvements for contributors and site maintainers.

All code changes get merged into prod through a pull request.

## Tech Stack

- Astro for pages, layouts, and static site generation.
- React for interactive components and Sanity Studio support.
- Sanity CMS for structured content.
- GROQ for querying Sanity content at build time.
- Cloudflare for preview and production deployments.
- TypeScript for page data, utilities, and generated Sanity query types.

## Getting Started

Use Node `20.18` or newer.

```sh
npm install
```

Create a local `.env` file by copying `.env.example`, then fill in any missing
values:

```sh
cp .env.example .env

PUBLIC_SANITY_PROJECT_ID="wfdg37xd"
PUBLIC_SANITY_DATASET="production"
```

Start the local site:

```sh
npm run dev
```

The Astro site runs locally from the URL printed in the terminal. The embedded
Sanity Studio is configured at `/admin`, but writing content there requires CMS
access.

Sanity Studio includes a Preview flow for blog posts. Content managers can open
`/admin`, edit a post in Structure, and use the post's Preview action to view
`/blog/post/{slug}` with draft content and Visual Editing overlays. Structure is
the default Studio tool, with Preview available as the second tool. Draft preview
requires `SANITY_API_TOKEN` to be configured with a Sanity Viewer token in each
deployed Cloudflare environment that should support CMS preview.

## Useful Commands

```sh
npm run dev
```

Start the Astro development server.

```sh
npm run build
```

```sh
npm run devt
```

Regenerate Sanity types, then start the Astro development server.

## Project Structure

- `src/pages/`: route files. A file such as `src/pages/about-us.astro` becomes
  the `/about-us` page.
- `src/layouts/`: shared page shells, including the main site layout.
- `src/components/`: reusable Astro and React components.
- `src/components/ReactCalendar/`: the React calendar UI and styles.
- `src/utils/groqQueries.ts`: GROQ queries and exported data-loading functions.
- `src/utils/utils.ts`: shared helpers, including Sanity fetch and image
  resolution helpers.
- `src/types/`: hand-written TypeScript types used by the app.
- `schema/documents/`: Sanity document schemas such as posts, authors, tags,
  and events.
- `schema/singletons/`: Sanity singleton page schemas such as home, about,
  donate, policy, and membership pages.
- `schema/index.ts`: the schema registry imported by `sanity.config.ts`.
- `sanity.config.ts`: Sanity Studio configuration.
- `sanity.cli.ts`: Sanity CLI project and dataset configuration.
- `astro.config.mjs`: Astro, Sanity, React, and Cloudflare configuration.
- `public/`: static assets served directly by Astro.

## How Sanity Content Reaches Astro Pages

Content usually flows through the project like this:

1. A schema in `schema/documents/` or `schema/singletons/` defines the content
   shape that editors use in Sanity Studio.
2. The schema is exported from `schema/index.ts`, then loaded by
   `sanity.config.ts`.
3. A GROQ query in `src/utils/groqQueries.ts` selects exactly the fields the
   page needs.
4. The query function calls `fetchSanityData` from `src/utils/utils.ts`.
5. `fetchSanityData` uses the Sanity Astro client. Development uses the
   `drafts` perspective, while production uses `published`.
6. An Astro page imports the query function, awaits the data in frontmatter, and
   renders the result.

Blog post preview routes are mapped for Sanity Studio in
`lib/presentation/resolve.ts`, then registered by `sanity.config.ts`.
Preview mode is enabled through `/api/draft-mode/enable`, which validates
Sanity's preview secret, sets the preview perspective cookie, and allows the
server-rendered blog post route to fetch draft content with stega/source maps.

For example, `src/pages/about-us.astro` calls `getAboutUsPage()`, which is
defined in `src/utils/groqQueries.ts`. That query reads content shaped by
`schema/singletons/aboutUsPageSchema.ts`.

## Adding or Changing Sanity-Backed Pages

For a simple Sanity-backed page:

1. Add or update a schema in `schema/documents/` or `schema/singletons/`.
2. Export it from `schema/index.ts`.
3. Add or update a GROQ query function in `src/utils/groqQueries.ts`.
4. Run `npm run typegen`.
5. Use the generated `*Result` type from `sanity.types.ts` in the query
   function.
6. Create or update the Astro route in `src/pages/`.
7. Add defensive rendering for optional CMS fields so missing content does not
   break the page.
8. Run `npm run build`.

## Working Without Sanity Access

You can still make most code contributions without being a Sanity editor.

Public published content can be read locally with:

```sh
PUBLIC_SANITY_PROJECT_ID="wfdg37xd"
PUBLIC_SANITY_DATASET="production"
```

Without CMS write access, you can still:

- Build UI-only changes against the published dataset.
- Update schemas in code and open a PR for someone with CMS access to test in
  Studio.
- Update GROQ queries and generated types with `npm run typegen`.
- Add fallback rendering for missing text, links, images, or arrays.
- Use local fixture images for CMS image slots.

To preview CMS image slots without sourcing local media, add this to `.env`:

```sh
PUBLIC_USE_LOCAL_SANITY_FIXTURES=true
```

New Sanity-backed image slots should use:

```ts
resolveImageUrl(sourceImage, { width, height, fixtureSeed });
```

The `fixtureSeed` should be stable and descriptive, such as `about-us-mission`,
so the same slot receives a consistent fixture image across builds.

If a page needs a local fallback image, place it in `public/local-fixtures/`.
That directory is ignored by git, so do not rely on those files in production.

Check out `src/pages/about-us.astro` for an example of this method in use.

## Branch and Pull Request Flow

1. Branch from the latest `staging` unless maintainers tell you otherwise.
2. Use a descriptive branch name, such as `docs/contributing-guide` or
   `feature/membership-fallbacks`.
3. Keep the PR focused on one issue or one coherent change.
4. Link the relevant issue in the PR description.
5. Include screenshots for visual changes.
6. Note any Sanity schema, GROQ, or content-model changes.
7. Run `npm run build` before requesting review.

When a pull request is opened, Cloudflare attempts to build a preview site from
the branch and the Sanity content. After merge, Cloudflare builds and deploys
the production site from the main deployment branch.

Sanity content changes follow a separate path: when content is published,
Sanity notifies Cloudflare so the site can rebuild with the latest published
content.

## Definition of Done

A PR is ready for review when:

- The change solves the linked issue or clearly explains the remaining work.
- `npm run build` passes locally, or the PR explains why it could not be run.
- Generated Sanity files are updated when schemas or GROQ query types change.
- New UI handles empty, partial, or missing CMS content gracefully.
- Schema changes explain what a CMS editor should test.
- The PR description calls out deployment, migration, or content follow-up work.
- Unrelated refactors and formatting churn are avoided.

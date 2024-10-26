# WebsiteFrontEnd

This is the repository for all code related to the DBC website

Template used as reference: https://github.com/sanity-io/sanity-template-astro-clean

## Tech Stack

- Astro
- Sanity CMS
- Github
- Cloudflare

## Process

### If changes on Github are made

- PR request opened in Github
- Github pings cloudflare that changes are being considered
- Cloudflare attempts to build and deploy a preview site, using API calls to get content from Sanity
- PR request is merged in
- Github pings Cloudflare that changes have been made in main
- Cloudflare attempts to build and deploy to production site, using API calls to get content from Sanity

### If changes on Sanity CMS are made

- New content is published
- Sanity pings Cloudflare that content has been updated, it pulls the latest branch from Github
- Cloudflare attempts to build and deploy to production site, using API calls to get content from Sanity

![image](https://github.com/user-attachments/assets/87019581-ce4d-4e84-bcc4-53ab321c7f3e)

## Development (in progress)

For any local development you'll want to pull the repo down and setup a .env file with

```
PUBLIC_SANITY_PROJECT_ID="wfdg37xd"
PUBLIC_SANITY_DATASET="production"
```

For creating an simple example page with text, the about-us website page is a great example. General steps would be:

- Create a schema under `/schema`. This defines content shape on Sanity for content creators to use. The about-us page is aboutUsPageSchema.ts
- Add the schema to the `/schema/index.ts`. This is used in the defineConfig in `sanity.config.ts` to tell Sanity where our schemas are
- Create a method query in `/src/utils/groqQueries.ts` for getting the data you need from Sanity. This is the query that will be called to get the data when the site builds. The about-us page is getAboutUsPage method
- Run the scripts typegen command to generate the Sanity types. The type you're going to use is from the groq query and it's whatever the const from groq query is set to with 'Result' appended
- Create a .astro file under `/src/pages`, where the name is the url on the website. This is where you'll define how the content shows up on the page. The about-us page is the `/src/pages/about-us.astro`

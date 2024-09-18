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


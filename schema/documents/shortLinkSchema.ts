import { defineType } from 'sanity';

export const shortLinkSchema = defineType({
  name: 'shortLink',
  title: 'Short Link',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Human-readable label (e.g. "Donate page")',
    },
    {
      name: 'slug',
      title: 'Short code',
      type: 'slug',
      description: 'The short part of the URL, e.g. "donate" → /go/donate',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, ''),
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'destination',
      title: 'Destination URL',
      type: 'url',
      description: 'Where to send the visitor',
      validation: Rule => Rule.required().uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      destination: 'destination',
    },
    prepare({ title, slug, destination }) {
      return {
        title: title || slug,
        subtitle: `→ ${destination}`,
      };
    },
  },
});

type PresentationResolve = {
  mainDocuments: Array<{
    route: string | string[];
    filter: string;
  }>;
  locations: Record<
    string,
    {
      select: Record<string, string>;
      resolve: (doc: Record<string, string | undefined> | null) => {
        locations?: Array<{ title: string; href: string }>;
        message?: string;
        tone?: 'positive' | 'caution' | 'critical';
      };
    }
  >;
};

export const resolve = {
  mainDocuments: [
    {
      route: '/blog/post/:slug',
      filter: `_type == "post" && slug.current == $slug`,
    },
  ],
  locations: {
    post: {
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: doc => {
        if (!doc?.slug) {
          return {
            message: 'Add a slug to preview this post.',
            tone: 'caution',
          };
        }

        return {
          locations: [
            {
              title: doc.title || 'Untitled post',
              href: `/blog/post/${doc.slug}`,
            },
            {
              title: 'Blog index',
              href: '/blog/page/1',
            },
          ],
        };
      },
    },
  },
} satisfies PresentationResolve;

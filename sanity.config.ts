import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { openPostPreviewAction } from './lib/actions/openPostPreview';
import { resolve } from './lib/presentation/resolve';
import { recurringDates } from './lib/sanity/recurringDates';
import { schemaTypes } from './schema/index';

const projectId = 'wfdg37xd';
const dataset = 'production';
const pageDocumentTitles: Record<string, string> = {
  aboutUs: 'About Us',
  advocacyPage: 'Advocacy',
  calendarPage: 'Calendar Main',
  cityCouncilQuestionnaire: 'City Council Questionnaire',
  donatePage: 'Donate',
  emailCityCouncil: 'Email City Council',
  homepage: 'Home',
  membershipPage: 'Membership',
  policyPage: 'Policy',
  socialRidesPage: 'Calendar Social Rides',
  weekWithoutDriving: 'Week Without Driving',
};
const collectionDocumentTitles: Record<string, string> = {
  author: 'Authors',
  events: 'Calendar Main Events',
  post: 'Blog Posts',
  shortLink: 'Short Links',
  socialRideEvent: 'Calendar Social Ride Events',
  tag: 'Tags',
};
const isSchemaExtract = typeof process !== 'undefined' && process.env?.SANITY_SCHEMA_EXTRACT === 'true';
const presentationPlugin = isSchemaExtract
  ? null
  : presentationTool({
      title: 'Preview',
      resolve,
      previewUrl: {
        initial: ({ origin }: { origin: string }) => origin,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      allowOrigins: ['http://localhost:*'],
    });

export default defineConfig({
  name: 'dallas-bicycle-coalition',
  title: 'Dallas Bicycle Coalition',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S, context) => {
        const client = context.getClient({ apiVersion: '2026-04-01' });
        const documentTypeItems = S.documentTypeListItems();
        const itemForType = (type: string, title: string) =>
          documentTypeItems.find(item => item.getId() === type)?.title(title);
        const itemsForTypes = (titlesByType: Record<string, string>) =>
          Object.entries(titlesByType)
            .flatMap(([type, title]) => {
              const item = itemForType(type, title);

              return item ? [item] : [];
            })
            .sort((a, b) => (a.getTitle() ?? '').localeCompare(b.getTitle() ?? ''));
        const singletonItemsForTypes = (titlesByType: Record<string, string>) =>
          Object.entries(titlesByType)
            .map(([type, title]) =>
              S.listItem()
                .id(type)
                .title(title)
                .schemaType(type)
                .child(async () => {
                  const documentId =
                    (await client.fetch<string | null>(`*[_type == $type && !(_id in path("versions.**"))][0]._id`, {
                      type,
                    })) ?? type;
                  const publishedDocumentId = documentId.replace(/^drafts\./, '');

                  return S.document().id(type).title(title).schemaType(type).documentId(publishedDocumentId);
                }),
            )
            .sort((a, b) => (a.getTitle() ?? '').localeCompare(b.getTitle() ?? ''));

        return S.list()
          .title('Content')
          .items([
            S.divider().title('Pages'),
            ...singletonItemsForTypes(pageDocumentTitles),
            S.divider().title('Collections'),
            ...itemsForTypes(collectionDocumentTitles),
            S.divider().title('Settings'),
            ...singletonItemsForTypes({ layout: 'Layout' }),
          ]);
      },
    }),
    ...(presentationPlugin ? [presentationPlugin] : []),
    visionTool(),
    recurringDates(),
  ],
  document: {
    actions: (prev, context) => {
      if (context.schemaType !== 'post') {
        return prev;
      }

      const [primaryAction, ...restActions] = prev;
      return primaryAction ? [primaryAction, openPostPreviewAction, ...restActions] : [openPostPreviewAction];
    },
  },
  schema: { types: schemaTypes },
});

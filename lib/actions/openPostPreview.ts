import { getPublishedId, type DocumentActionComponent } from 'sanity';

type PostDocument = {
  slug?: {
    current?: string;
  };
};

export const openPostPreviewAction: DocumentActionComponent = props => {
  if (props.type !== 'post') {
    return null;
  }

  const document = (props.draft ?? props.version ?? props.published) as PostDocument | null;
  const slug = document?.slug?.current;

  return {
    label: 'Preview',
    title: slug ? 'Open preview' : 'Add a slug to preview this post',
    disabled: !slug,
    group: ['paneActions'],
    onHandle: () => {
      if (!slug || typeof window === 'undefined') {
        return;
      }

      const previewPath = `/blog/post/${slug}`;
      const params = new URLSearchParams({ preview: previewPath });
      const documentId = encodeURIComponent(getPublishedId(props.id));

      window.location.assign(`/admin/presentation/post/${documentId}?${params}`);
    },
  };
};

openPostPreviewAction.displayName = 'OpenPostPreviewAction';

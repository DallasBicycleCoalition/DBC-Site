import type { APIRoute } from 'astro';
import groq from 'groq';
import { fetchSanityData } from '../../utils/utils';

export const prerender = false;

const shortLinkQuery = groq`
  *[_type == "shortLink" && slug.current == $slug][0]{ destination }
`;

export const GET: APIRoute = async ({ params, redirect }) => {
  const { slug } = params;

  if (!slug) {
    return new Response(null, { status: 400 });
  }

  const result = await fetchSanityData<{ destination: string } | null>(shortLinkQuery, { slug });

  if (!result?.destination) {
    return new Response('Not found', { status: 404 });
  }

  return redirect(result.destination, 301);
};

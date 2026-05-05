import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete(perspectiveCookieName, { path: '/' });
  return redirect('/', 307);
};

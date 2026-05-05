import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';
import type { AstroCookies } from 'astro';

export function getDraftModeProps(cookies: AstroCookies) {
  return {
    perspectiveCookie: cookies.get(perspectiveCookieName)?.value ?? undefined,
  };
}

export function isDraftMode(cookies: AstroCookies) {
  return cookies.has(perspectiveCookieName);
}

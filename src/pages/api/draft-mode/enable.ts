import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { perspectiveCookieName } from "@sanity/preview-url-secret/constants";
import type { APIRoute } from "astro";
import { sanityClient } from "sanity:client";

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const token =
    import.meta.env.SANITY_API_READ_TOKEN ?? import.meta.env.SANITY_API_TOKEN;

  if (!token) {
    return new Response(
      "Server misconfigured: missing Sanity API read token",
      {
        status: 500,
      }
    );
  }

  const { isValid, redirectTo = "/", studioPreviewPerspective } =
    await validatePreviewUrl(sanityClient.withConfig({ token }), request.url);

  if (!isValid) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  cookies.set(perspectiveCookieName, studioPreviewPerspective ?? "drafts", {
    httpOnly: false,
    sameSite: "none",
    secure: true,
    path: "/",
  });

  return redirect(redirectTo, 307);
};

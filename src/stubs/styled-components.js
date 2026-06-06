// Stub for styled-components in the Cloudflare workerd `ssr` bundle.
// @sanity/visual-editing and @sanity/ui statically import styled-components, but that code
// only ever executes in the browser. The workerd server bundle just needs the import to
// resolve. This stub is aliased in only for the `ssr` Vite environment (see astro.config.mjs);
// the browser Sanity Studio still uses the real styled-components package.
const noop = () => ({});
const tag = new Proxy(noop, { get: () => tag });
export const styled = tag;
export const css = () => '';
export const createGlobalStyle = noop;
export const keyframes = () => '';
export const ThemeProvider = noop;
export const useTheme = () => ({});
export const ServerStyleSheet = class {
  collectStyles(component) {
    return component;
  }
  getStyleTags() {
    return '';
  }
  seal() {}
};
export default styled;

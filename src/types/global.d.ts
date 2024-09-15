import type { TransformedEvent } from "./events.ts";

export {};

declare global {
  interface Window {
    events: TransformedEvent;
  }
}

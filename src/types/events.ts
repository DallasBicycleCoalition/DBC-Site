import type { EventInput } from "@fullcalendar/core";

export interface TransformedEvent extends EventInput {
  description?: string;
  location?: string;
}

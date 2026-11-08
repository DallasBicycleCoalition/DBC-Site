import type { EventInput } from '@fullcalendar/react';

export interface TransformedEvent extends EventInput {
  description?: string;
  location?: string;
}

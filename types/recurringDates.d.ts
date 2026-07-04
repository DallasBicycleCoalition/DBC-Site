import type { RecurringDateFieldOptions } from '../lib/sanity/recurringDates/types';

declare module 'sanity' {
  export interface IntrinsicDefinitions {
    recurringDates: RecurringDateFieldOptions;
  }
}

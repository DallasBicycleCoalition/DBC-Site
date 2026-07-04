import { definePlugin } from 'sanity';

import { DEFAULT_RECURRENCES } from './constants';
import { recurringDateSchema } from './schema/recurringDates';
import type { PluginConfig, WithRequiredProperty } from './types';

export const recurringDates = definePlugin<PluginConfig | void>(config => {
  const pluginConfig: WithRequiredProperty<PluginConfig, 'defaultRecurrences'> = {
    defaultRecurrences: DEFAULT_RECURRENCES,
    ...config,
  };

  return {
    name: 'dbc-recurring-dates',
    schema: {
      types: [recurringDateSchema(pluginConfig)],
    },
  };
});

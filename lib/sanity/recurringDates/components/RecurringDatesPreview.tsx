import type React from 'react';
import type { ObjectSchemaType, PreviewProps } from 'sanity';

import type { PluginConfig, RecurringDate, WithRequiredProperty } from '../types';
import { formatDateTime, getRRuleText } from '../utils';

type RecurringDatesPreviewProps = PreviewProps &
  RecurringDate & {
    pluginConfig: WithRequiredProperty<PluginConfig, 'defaultRecurrences'>;
  };

type RecurringDateObjectSchemaType = Omit<ObjectSchemaType, 'options'> & {
  options?: PluginConfig;
};

export function RecurringDatesPreview(props: RecurringDatesPreviewProps): React.JSX.Element {
  const { startDate, endDate, rrule, schemaType, pluginConfig } = props;
  const options = (schemaType as RecurringDateObjectSchemaType | undefined)?.options;
  const { dateTimeOptions, dateOnly } = {
    ...pluginConfig,
    ...options,
  };
  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;
  const sameDay = start && end && start.toDateString() === end.toDateString();
  let title = 'No start date';

  if (start) {
    title = formatDateTime(start, dateOnly, dateTimeOptions);

    if (end) {
      title += ` - ${dateOnly || sameDay ? formatDateTime(end, true, dateTimeOptions) : formatDateTime(end, false, dateTimeOptions)}`;
    }
  }

  return props.renderDefault({
    ...props,
    title,
    subtitle: rrule ? getRRuleText(rrule) : undefined,
  });
}

import type { DateRule, DatetimeOptions, ObjectDefinition } from 'sanity';

export interface PluginConfig {
  defaultRecurrences?: string[];
  hideEndDate?: boolean;
  hideCustom?: boolean;
  dateTimeOptions?: DatetimeOptions;
  dateOnly?: boolean;
  validation?: {
    startDate?: (Rule: DateRule) => DateRule;
    endDate?: (Rule: DateRule) => DateRule;
  };
  fieldTitles?: {
    startDate?: string;
    endDate?: string;
  };
  fieldDescriptions?: {
    startDate?: string;
    endDate?: string;
  };
}

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

export type RecurringDateFieldOptions = Omit<ObjectDefinition, 'type' | 'fields'> & {
  type: 'recurringDates';
  options?: PluginConfig;
};

export interface RecurringDate {
  _type?: 'recurringDates';
  startDate?: string;
  endDate?: string;
  recurs?: boolean;
  rrule?: string;
}

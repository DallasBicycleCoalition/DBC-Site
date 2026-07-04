import { datetime, RRule, rrulestr } from 'rrule';

import type { PluginConfig } from './types';

export function upperFirst(value: string): string {
  return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value;
}

export function validateRRuleString(recurrence: string): boolean {
  try {
    rrulestr(recurrence);
    return false;
  } catch {
    return true;
  }
}

export function validateRRuleStrings(recurrences: string[]): boolean {
  return recurrences.some(recurrence => validateRRuleString(recurrence));
}

export function getRRuleText(recurrence: string): string {
  const rule = rrulestr(recurrence) as RRule;

  rule.options.until =
    rule.options.until &&
    datetime(
      rule.options.until.getFullYear(),
      rule.options.until.getMonth() + 1,
      rule.options.until.getDate(),
      rule.options.until.getHours(),
      rule.options.until.getMinutes(),
      rule.options.until.getSeconds(),
    );

  return upperFirst(rule.toText());
}

export function formatDateTime(
  value: Date,
  dateOnly: boolean | undefined,
  dateTimeOptions: PluginConfig['dateTimeOptions'],
): string {
  const timeZone = dateTimeOptions?.displayTimeZone;
  const options: Intl.DateTimeFormatOptions = dateOnly
    ? { dateStyle: 'medium', timeZone }
    : { dateStyle: 'medium', timeStyle: 'short', timeZone };

  return new Intl.DateTimeFormat('en-US', options).format(value);
}

export function formatDateInputValue(value: Date): string {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function dateAtEndOfDay(value: string): Date {
  return new Date(`${value}T23:59:59`);
}

export function parseRule(initialValue?: string): RRule | null {
  if (!initialValue) {
    return null;
  }

  try {
    return rrulestr(initialValue) as RRule;
  } catch {
    return null;
  }
}

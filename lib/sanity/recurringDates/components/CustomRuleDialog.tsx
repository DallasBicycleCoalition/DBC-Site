import { Box, Button, Dialog, Flex, Radio, Select, Stack, Text, TextInput } from '@sanity/ui';
import { useCallback, useMemo, useState } from 'react';
import type React from 'react';
import { type Options, RRule, type Weekday } from 'rrule';
import { type ObjectInputProps, set } from 'sanity';

import { DEFAULT_COUNTS } from '../constants';
import type { PluginConfig } from '../types';
import { dateAtEndOfDay, formatDateInputValue, parseRule } from '../utils';
import { FeedbackCard } from './FeedbackCard';
import { Monthly } from './Monthly';
import { Weekly } from './Weekly';

type WeekdayValue = Weekday | Weekday[] | null;

export function CustomRuleDialog({
  open,
  onClose,
  onChange,
  initialValue,
  startDate,
  endDate,
}: {
  open: boolean;
  onClose: () => void;
  onChange: ObjectInputProps['onChange'];
  initialValue?: string;
  startDate?: string;
  endDate?: string;
  dateTimeOptions: PluginConfig['dateTimeOptions'];
}): React.JSX.Element {
  const initialRule = useMemo(() => parseRule(initialValue), [initialValue]);
  const [frequency, setFrequency] = useState<Options['freq']>(initialRule?.origOptions.freq ?? RRule.MONTHLY);
  const [interval, setInterval] = useState<number>(initialRule?.origOptions.interval ?? 1);
  const [count, setCount] = useState<number | null>(initialRule?.origOptions.count ?? null);
  const [until, setUntil] = useState<Date | null>(initialRule?.origOptions.until ?? null);
  const [byweekday, setByweekday] = useState<WeekdayValue>(
    (initialRule?.origOptions.byweekday as WeekdayValue) ?? null,
  );
  const [untilValid, setUntilValid] = useState(true);

  const getUntilDate = useCallback(() => {
    const fromDate = new Date(startDate ?? Date.now());

    if (frequency === RRule.YEARLY) {
      fromDate.setFullYear(fromDate.getFullYear() + DEFAULT_COUNTS[frequency]);
    } else if (frequency === RRule.MONTHLY) {
      fromDate.setMonth(fromDate.getMonth() + DEFAULT_COUNTS[frequency]);
    } else if (frequency === RRule.WEEKLY) {
      fromDate.setDate(fromDate.getDate() + DEFAULT_COUNTS[frequency] * 7);
    } else if (frequency === RRule.DAILY) {
      fromDate.setDate(fromDate.getDate() + DEFAULT_COUNTS[frequency]);
    }

    fromDate.setHours(23, 59, 59, 999);

    return fromDate;
  }, [frequency, startDate]);

  const handleChange = useCallback((event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;

    if (name === 'freq') {
      setFrequency(Number(value));
    } else if (name === 'interval') {
      setInterval(Math.max(Number(value), 1));
    } else if (name === 'count') {
      setCount(Math.max(Number(value), 1));
    }
  }, []);

  const handleUntilChange = useCallback(
    (date: string) => {
      if (!date) {
        setUntil(null);
        return;
      }

      const untilDate = dateAtEndOfDay(date);
      const eventEnd = endDate ? new Date(endDate) : null;
      const eventStart = startDate ? new Date(startDate) : null;
      const valid = (!eventEnd || untilDate >= eventEnd) && (!eventStart || untilDate >= eventStart);

      setUntilValid(valid);
      setUntil(untilDate);
    },
    [endDate, startDate],
  );

  const handleEndChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;

      if (!value) {
        setUntil(null);
        setCount(null);
      } else if (value === 'count') {
        setCount(DEFAULT_COUNTS[frequency]);
        setUntil(null);
      } else if (value === 'until') {
        setUntil(getUntilDate());
        setCount(null);
      }
    },
    [frequency, getUntilDate],
  );

  const handleConfirm = useCallback(() => {
    const options: Partial<Options> = {
      freq: frequency,
      interval,
    };

    if (count) {
      options.count = count;
    }

    if (until) {
      options.until = until;
    }

    if (byweekday && (frequency === RRule.WEEKLY || frequency === RRule.MONTHLY)) {
      options.byweekday = byweekday;
    }

    const newRule = new RRule(options);

    onClose();
    onChange(set(newRule.toString(), ['rrule']));
  }, [byweekday, count, frequency, interval, onChange, onClose, until]);

  if (!open) {
    return <></>;
  }

  const untilValue = until ? formatDateInputValue(until) : formatDateInputValue(getUntilDate());

  return (
    <Dialog header="Custom recurrence" id="recurring-date-custom-rule" onClose={onClose} zOffset={1000} width={1}>
      <Flex direction="column">
        <Box flex={1} overflow="auto" padding={4}>
          <Stack space={4}>
            <Flex gap={2} align="center">
              <Text style={{ whiteSpace: 'nowrap' }}>Repeat every</Text>
              <Box style={{ width: '75px' }}>
                <TextInput name="interval" type="number" min={1} value={interval} onChange={handleChange} />
              </Box>
              <Box>
                <Select name="freq" value={frequency} onChange={handleChange}>
                  <option value={RRule.YEARLY}>year(s)</option>
                  <option value={RRule.MONTHLY}>month(s)</option>
                  <option value={RRule.WEEKLY}>week(s)</option>
                  <option value={RRule.DAILY}>day(s)</option>
                </Select>
              </Box>
            </Flex>

            {frequency === RRule.MONTHLY && <Monthly byweekday={byweekday} setByweekday={setByweekday} />}
            {frequency === RRule.WEEKLY && <Weekly byweekday={byweekday} setByweekday={setByweekday} />}

            <Stack space={2}>
              <Text>Ends</Text>
              <Flex gap={2} paddingY={2} align="center">
                <Radio checked={!count && !until} name="ends" onChange={handleEndChange} value="" id="ends-never" />
                <Text as="label" size={1}>
                  Never
                </Text>
              </Flex>
              <Flex gap={2} align="center">
                <Radio checked={!!until} name="ends" onChange={handleEndChange} value="until" id="ends-until" />
                <Text as="label" size={1} style={{ width: '75px' }}>
                  On
                </Text>
                <Box style={{ width: '200px' }}>
                  <TextInput
                    name="untilDate"
                    type="date"
                    value={untilValue}
                    readOnly={!until}
                    onChange={event => handleUntilChange(event.currentTarget.value)}
                  />
                </Box>
                {!untilValid && (
                  <FeedbackCard tone="critical">
                    <Text size={1}>Until date must be after event ends</Text>
                  </FeedbackCard>
                )}
              </Flex>
              <Flex gap={2} align="center">
                <Radio checked={!!count} name="ends" onChange={handleEndChange} value="count" id="ends-count" />
                <Text as="label" size={1} style={{ width: '75px' }}>
                  After
                </Text>
                <Box style={{ width: '75px' }}>
                  <TextInput
                    name="count"
                    type="number"
                    min={1}
                    value={count ?? DEFAULT_COUNTS[frequency]}
                    onChange={handleChange}
                    disabled={!count}
                  />
                </Box>
                <Text style={{ whiteSpace: 'nowrap' }}>occurrence(s)</Text>
              </Flex>
            </Stack>
          </Stack>
        </Box>
        <Box paddingX={4} paddingY={3} style={{ borderTop: '1px solid var(--card-border-color)' }}>
          <Flex gap={2} justify="flex-end">
            <Button text="Cancel" mode="ghost" onClick={onClose} />
            <Button text="Done" tone="positive" onClick={handleConfirm} disabled={!untilValid} />
          </Flex>
        </Box>
      </Flex>
    </Dialog>
  );
}

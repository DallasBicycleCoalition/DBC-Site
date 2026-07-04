import { Box, Flex, Select, Text } from '@sanity/ui';
import { useCallback } from 'react';
import type React from 'react';
import type { ChangeEvent } from 'react';
import { Weekday } from 'rrule';

import { DAYS } from '../constants';

type WeekdayValue = Weekday | Weekday[] | null;

interface MonthlyProps {
  byweekday: WeekdayValue;
  setByweekday: (value: WeekdayValue) => void;
}

export function Monthly({ byweekday, setByweekday }: MonthlyProps): React.JSX.Element {
  const weekday = Array.isArray(byweekday) ? byweekday[0] : byweekday;
  const dayNo = weekday?.weekday ?? 0;
  const weekNo = weekday?.n ?? null;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { value, name } = event.currentTarget;

      if (name === 'week') {
        setByweekday(value ? [new Weekday(dayNo, Number(value))] : null);
        return;
      }

      setByweekday([new Weekday(Number(value), weekNo ?? 1)]);
    },
    [dayNo, setByweekday, weekNo],
  );

  return (
    <Flex gap={2} align="center">
      <Text style={{ whiteSpace: 'nowrap' }}>On the</Text>
      <Box>
        <Select name="week" value={weekNo?.toString() ?? ''} onChange={handleChange}>
          <option value="">same day</option>
          <option value="1">first</option>
          <option value="2">second</option>
          <option value="3">third</option>
          <option value="4">fourth</option>
          <option value="5">fifth</option>
          <option value="-1">last</option>
        </Select>
      </Box>
      {weekNo && (
        <Box>
          <Select name="day" value={dayNo} onChange={handleChange}>
            {DAYS.map((day, i) => {
              const optionWeekday = new Weekday(i);

              return (
                <option value={optionWeekday.weekday} key={optionWeekday.weekday}>
                  {day}
                </option>
              );
            })}
          </Select>
        </Box>
      )}
    </Flex>
  );
}

import { Button, Grid, Stack, Text } from '@sanity/ui';
import { useCallback, useMemo } from 'react';
import type React from 'react';
import { Weekday } from 'rrule';

import { DAYS } from '../constants';

type WeekdayValue = Weekday | Weekday[] | null;

interface WeeklyProps {
  byweekday: WeekdayValue;
  setByweekday: (value: WeekdayValue) => void;
}

export function Weekly({ byweekday, setByweekday }: WeeklyProps): React.JSX.Element {
  const currentWeekdays: number[] = useMemo(() => {
    if (!byweekday) {
      return [];
    }

    const weekdays = Array.isArray(byweekday) ? byweekday : [byweekday];
    return weekdays.map(weekday => weekday.weekday);
  }, [byweekday]);

  const handleChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const value = Number(event.currentTarget.value);
      const nextWeekdays = currentWeekdays.includes(value)
        ? currentWeekdays.filter(weekday => weekday !== value)
        : [...currentWeekdays, value];

      setByweekday(nextWeekdays.length ? nextWeekdays.map(weekday => new Weekday(weekday)) : null);
    },
    [currentWeekdays, setByweekday],
  );

  return (
    <Stack gap={3}>
      <Text style={{ whiteSpace: 'nowrap' }}>Repeats on</Text>
      <Grid gridTemplateColumns={DAYS.length} gap={1}>
        {DAYS.map((day, i) => {
          const weekday = new Weekday(i);
          const active = currentWeekdays.includes(i);

          return (
            <Button
              key={day}
              mode={active ? 'default' : 'ghost'}
              tone={active ? 'primary' : 'default'}
              text={weekday.toString()}
              value={i}
              style={{ cursor: 'pointer' }}
              onClick={handleChange}
            />
          );
        })}
      </Grid>
    </Stack>
  );
}

import { Icon } from '@sanity/icons';
import { Box, Button, Card, Flex, Stack, Text } from '@sanity/ui';
import { useCallback } from 'react';
import type React from 'react';
import { type ObjectInputProps, unset } from 'sanity';

import { upperFirst } from '../utils';

export function RemoveEndDate({
  title,
  onChange,
}: {
  title?: string;
  onChange: ObjectInputProps['onChange'];
}): React.JSX.Element {
  const handleUnsetClick = useCallback(() => {
    onChange(unset(['endDate']));
  }, [onChange]);

  return (
    <Card padding={4} radius={2} tone="caution" data-ui="Alert">
      <Flex>
        <Box>
          <Text size={1}>
            <Icon symbol="warning-outline" />
          </Text>
        </Box>
        <Stack space={3} flex={1} marginLeft={3}>
          <Text size={1} weight="semibold">
            The {title ? upperFirst(title) : 'current'} field has an end date
          </Text>
          <Box>
            <Text as="p" muted size={1}>
              This field has an end date value, but the end date is currently disabled for this field.
            </Text>
          </Box>
          <Button
            icon={() => <Icon symbol="trash" />}
            tone="critical"
            text="Remove end date"
            onClick={handleUnsetClick}
            width="fill"
          />
        </Stack>
      </Flex>
    </Card>
  );
}

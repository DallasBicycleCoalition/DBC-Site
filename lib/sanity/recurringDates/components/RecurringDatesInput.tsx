import { Box, Flex, Grid, Select, Stack, Text } from '@sanity/ui';
import { useCallback, useState } from 'react';
import type React from 'react';
import { ObjectInputMember, type ObjectInputProps, type ObjectSchemaType, type Rule, set } from 'sanity';

import type { PluginConfig, RecurringDate, WithRequiredProperty } from '../types';
import { getRRuleText, validateRRuleStrings } from '../utils';
import { CustomRuleDialog } from './CustomRuleDialog';
import { FeedbackCard } from './FeedbackCard';
import { RemoveEndDate } from './RemoveEndDate';

type RecurringDatesInputProps = ObjectInputProps<RecurringDate> & {
  pluginConfig: WithRequiredProperty<PluginConfig, 'defaultRecurrences'>;
};

type RecurringDateObjectSchemaType = Omit<ObjectSchemaType, 'options'> & {
  options?: PluginConfig;
};

export function RecurringDatesInput(props: RecurringDatesInputProps): React.JSX.Element {
  const { onChange, members, value: currentValue, schemaType, pluginConfig } = props;
  const { options, title } = schemaType as RecurringDateObjectSchemaType;
  const { defaultRecurrences, hideEndDate, hideCustom, dateTimeOptions, dateOnly, validation } = {
    ...pluginConfig,
    ...options,
  };

  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.currentTarget;

      if (value === 'custom') {
        onOpen();
      } else {
        onChange(set(value, ['rrule']));
      }
    },
    [onChange, onOpen],
  );

  const invalidRecurrences = validateRRuleStrings(defaultRecurrences);
  const startDateMember = members.find(member => member.kind === 'field' && member.name === 'startDate');
  const endDateMember = members.find(member => member.kind === 'field' && member.name === 'endDate');
  const rruleMember = members.find(member => member.kind === 'field' && member.name === 'rrule');
  const availableRecurrences = [...defaultRecurrences];

  if (currentValue?.rrule && !availableRecurrences.includes(currentValue.rrule)) {
    availableRecurrences.push(currentValue.rrule);
  }

  const renderProps = {
    renderField: props.renderField,
    renderInput: props.renderInput,
    renderItem: props.renderItem,
    renderPreview: props.renderPreview,
  };

  if (startDateMember?.kind === 'field') {
    startDateMember.field.schemaType.options = {
      ...startDateMember.field.schemaType.options,
      ...dateTimeOptions,
    };
    startDateMember.field.schemaType.name = dateOnly ? 'date' : 'datetime';
    startDateMember.field.schemaType.validation = validation?.startDate
      ? CustomValidation => validation.startDate?.(CustomValidation) as Rule
      : DefaultRule => DefaultRule.required() as Rule;

    if (options?.fieldTitles?.startDate) {
      startDateMember.field.schemaType.title = options.fieldTitles.startDate;
    }

    if (options?.fieldDescriptions?.startDate) {
      startDateMember.field.schemaType.description = options.fieldDescriptions.startDate;
    }
  }

  if (endDateMember?.kind === 'field') {
    endDateMember.field.schemaType.options = {
      ...endDateMember.field.schemaType.options,
      ...dateTimeOptions,
    };
    endDateMember.field.schemaType.name = dateOnly ? 'date' : 'datetime';
    endDateMember.field.schemaType.validation = validation?.endDate
      ? CustomValidation => validation.endDate?.(CustomValidation) as Rule
      : DefaultRule => DefaultRule.min(DefaultRule.valueOfField('startDate')) as Rule;

    if (options?.fieldTitles?.endDate) {
      endDateMember.field.schemaType.title = options.fieldTitles.endDate;
    }

    if (options?.fieldDescriptions?.endDate) {
      endDateMember.field.schemaType.description = options.fieldDescriptions.endDate;
    }
  }

  return (
    <Stack space={3}>
      <Grid columns={hideEndDate ? 1 : 2} gap={3}>
        {currentValue?.endDate && hideEndDate && <RemoveEndDate title={title} onChange={onChange} />}
        <Flex align="flex-end" gap={2}>
          <Box flex={1}>{startDateMember && <ObjectInputMember member={startDateMember} {...renderProps} />}</Box>
        </Flex>
        {!hideEndDate && (
          <Flex align="flex-end" gap={2}>
            <Box flex={1}>{endDateMember && <ObjectInputMember member={endDateMember} {...renderProps} />}</Box>
          </Flex>
        )}
      </Grid>
      {invalidRecurrences ? (
        <FeedbackCard tone="critical">
          <Text size={1}>
            <strong>Error:</strong> An invalid RRULE string was provided in the <code>defaultRecurrences</code> array.
            Check recurring dates configuration.
          </Text>
        </FeedbackCard>
      ) : (
        <Select onChange={handleChange} value={currentValue?.rrule ?? ''}>
          <option value="">Doesn&apos;t repeat</option>
          {availableRecurrences.map(recurrence => (
            <option key={recurrence} value={recurrence}>
              {getRRuleText(recurrence)}
            </option>
          ))}
          {!hideCustom && <option value="custom">Custom...</option>}
        </Select>
      )}
      {rruleMember && <ObjectInputMember member={rruleMember} {...renderProps} />}
      <CustomRuleDialog
        open={open}
        onClose={onClose}
        onChange={onChange}
        initialValue={currentValue?.rrule}
        startDate={startDateMember?.kind === 'field' ? (startDateMember.field.value as string | undefined) : undefined}
        endDate={endDateMember?.kind === 'field' ? (endDateMember.field.value as string | undefined) : undefined}
        dateTimeOptions={dateTimeOptions}
      />
    </Stack>
  );
}

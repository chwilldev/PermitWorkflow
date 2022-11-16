import React from 'react';
import {
  useController,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl } from '@chakra-ui/react';
import {
  Select,
  Props as SelectProps,
  GroupBase,
  OnChangeValue,
  ActionMeta,
} from 'chakra-react-select';
import { SubOption } from '../types';

interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Omit<SelectProps<Option, IsMulti, Group>, 'name' | 'defaultValue'>,
    UseControllerProps<FormValues> {
  label?: string;
}

const createOption = (label: string, value: SubOption) => ({
  label,
  value,
});

export type SelectOption = ReturnType<typeof createOption>;

function ControlledSelect<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  name,
  label,
  options,
  inputValue,
  control,
  rules,
  variant,
  shouldUnregister,
  ...selectProps
}: ControlledSelectProps<FormValues, Option, IsMulti, Group>) {
  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  });

  const handleChange = (
    newOptions: OnChangeValue<Option, IsMulti>,
    action: ActionMeta<Option>
  ) => {
    const receivedOptions = newOptions as ReadonlyArray<SelectOption>;
    const lastSelectOption = action.option as SelectOption;
    if (action.action === 'select-option') {
      if (
        lastSelectOption.value !== SubOption.None &&
        receivedOptions.findIndex((option) => option.value === SubOption.None)
      ) {
        field.onChange([...receivedOptions]);
      } else {
        field.onChange([lastSelectOption]);
      }
    } else {
      field.onChange([...receivedOptions]);
    }
  };

  return (
    <FormControl label={label} isInvalid={!!error} id={name}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select<Option, IsMulti, Group>
        options={options}
        {...selectProps}
        {...field}
        onChange={handleChange}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default ControlledSelect;

import React, { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  ButtonGroup,
  Container,
  Heading,
  Button,
  Stack,
  Code,
  Text,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { OptionBase } from 'chakra-react-select';

import ControlledSelect, { SelectOption } from './ControlledSelect';
import {
  RESIDENTIAL_WORK_TYPES,
  EXTERIOR_WORK_TYPES,
  INTERIOR_WORK_TYPES,
  INVOLVED_WORK_TYPES,
} from '../constant';

export interface SelectOptions extends OptionBase {
  label: string;
  value: string;
}

interface FormValues {
  residentialWorkTypes: SelectOptions[];
  involvedWorkTypes: SelectOptions[];
  exteriorWorkTypes: SelectOptions[];
  interiorWorkTypes: SelectOptions[];
}

const schema = yup.object().shape({
  residentialWorkTypes: yup
    .array()
    .required('You must select one of type to know the necessary Work Permit')
    .min(1, 'Please pick at least 1 type to know the necessary Work Permit')
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
        variant: yup.string(),
        colorScheme: yup.string(),
        isFixed: yup.boolean(),
        isDisabled: yup.boolean(),
      })
    ),

  exteriorWorkTypes: yup
    .array()
    .test(
      'is required',
      'You must select one of type to know the necessary Work Permit',
      (value, ctx) => {
        return ctx.parent.residentialWorkTypes.findIndex(
          (type: SelectOption) => type.value === 'exterior'
        ) !== -1
          ? !!value?.length
          : true;
      }
    ),

  interiorWorkTypes: yup
    .array()
    .test(
      'is required',
      'You must select one of type to know the necessary Work Permit',
      (value, ctx) => {
        return ctx.parent.residentialWorkTypes.findIndex(
          (type: SelectOption) => type.value === 'interior'
        ) !== -1
          ? !!value?.length
          : true;
      }
    ),

  involvedWorkTypes: yup
    .array()
    .required('You must select one of type to know the necessary Work Permit')
    .min(1, 'Please pick at least 1 type to know the necessary Work Permit')
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
        variant: yup.string(),
        colorScheme: yup.string(),
        isFixed: yup.boolean(),
        isDisabled: yup.boolean(),
      })
    ),
});

const defaultValues: FormValues = {
  residentialWorkTypes: [],
  involvedWorkTypes: [],
  exteriorWorkTypes: [],
  interiorWorkTypes: [],
};

const MainBoard: FC = () => {
  const [residentialWorkTypeState, setResidentialWorkTypeState] = useState<
    string[]
  >([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'residentialWorkTypes') {
        const receivedResidentialWorkTypes =
          value.residentialWorkTypes as ReadonlyArray<SelectOption>;
        setResidentialWorkTypeState(
          receivedResidentialWorkTypes.map((type) => {
            return type.value;
          })
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values);
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve(values);
      }, 3000);
    });
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <Container my={8} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h1" mb={8} size="lg">
        Permit Workflow
      </Heading>

      <Text mb={4}>
        A Sign up form example with{' '}
        <Code fontSize="inherit">react-hook-form</Code> &{' '}
        <Code fontSize="inherit">@chakra-ui/react</Code>
      </Text>

      <Text mb={8}>
        An advanced example using <Code fontSize="inherit">yup</Code> to
        validate <Code fontSize="inherit">chakra-react-select</Code>
      </Text>

      <Stack spacing={6}>
        <ControlledSelect<FormValues, SelectOptions, true>
          isMulti
          name="residentialWorkTypes"
          control={control}
          label="1. What sort of residential work are you doing?"
          placeholder="Select work types"
          options={RESIDENTIAL_WORK_TYPES}
        />
        {residentialWorkTypeState.indexOf('interior') !== -1 && (
          <ControlledSelect<FormValues, SelectOptions, true>
            isMulti
            name="interiorWorkTypes"
            control={control}
            label="What sort of interior work are you doing?"
            placeholder="Select work types"
            options={INTERIOR_WORK_TYPES}
          />
        )}
        {residentialWorkTypeState.indexOf('exterior') !== -1 && (
          <ControlledSelect<FormValues, SelectOptions, true>
            isMulti
            name="exteriorWorkTypes"
            control={control}
            label="What sort of exterior work are you doing?"
            placeholder="Select work types"
            options={EXTERIOR_WORK_TYPES}
          />
        )}

        <ControlledSelect<FormValues, SelectOptions, true>
          isMulti
          name="involvedWorkTypes"
          control={control}
          label="2. Does the project involve the following?"
          placeholder="Select work types"
          options={INVOLVED_WORK_TYPES}
        />

        <ButtonGroup>
          <Button
            type="button"
            isLoading={isSubmitting}
            onClick={handleReset}
            w="full"
          >
            Reset
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            colorScheme="blue"
            w="full"
          >
            Submit
          </Button>
        </ButtonGroup>
      </Stack>
    </Container>
  );
};

export default MainBoard;

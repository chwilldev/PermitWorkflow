import React, { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  ButtonGroup,
  Container,
  Heading,
  Button,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { postUserSelections } from '../apis';
import ControlledSelect from './ControlledSelect';
import {
  RESIDENTIAL_WORK_TYPES,
  EXTERIOR_WORK_TYPES,
  INTERIOR_WORK_TYPES,
  INVOLVED_WORK_TYPES,
  WORK_PERMIT_REQUIREMENTS,
} from '../constant';
import { SubOption, WorkPermitRequirement, Option, Attachment } from '../types';

interface FormValues {
  residentialWorkTypes: Option[];
  involvedWorkTypes: Option[];
  exteriorWorkTypes: Option[];
  interiorWorkTypes: Option[];
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
          (type: Option) => type.value === SubOption.ExteriorWork
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
          (type: Option) => type.value === SubOption.InteriorWork
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
  const [residentialWorkTypesState, setResidentialWorkTypeState] = useState<
    SubOption[]
  >([]);

  const [workPermitRequirements, setWorkPermitRequirements] = useState<
    WorkPermitRequirement[]
  >([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

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
    const subscription = watch((value, { name }) => {
      if (name === 'residentialWorkTypes') {
        const receivedResidentialWorkTypes =
          value.residentialWorkTypes as ReadonlyArray<Option>;
        setResidentialWorkTypeState(
          receivedResidentialWorkTypes.map((type) => {
            return type.value;
          })
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const residentialPayloadData = [];
    if (residentialWorkTypesState.indexOf(SubOption.ExteriorWork) !== -1) {
      residentialPayloadData.push({
        title: SubOption.ExteriorWork,
        subOptions: values.exteriorWorkTypes.map((type) => type.value),
      });
    }

    if (residentialWorkTypesState.indexOf(SubOption.InteriorWork) !== -1) {
      residentialPayloadData.push({
        title: SubOption.InteriorWork,
        subOptions: values.interiorWorkTypes.map((type) => type.value),
      });
    }

    const involvedWorkTypesPayloadData = values.involvedWorkTypes.map(
      (type) => type.value
    );

    const response = await postUserSelections({
      residentialPayloadData,
      involvedWorkTypesPayloadData,
    });
    setWorkPermitRequirements(response.workPermitRequirements);
    setAttachments(response.attachments);
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <Container my={8} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h1" mb={8} size="lg">
        Permit Workflow
      </Heading>

      <Stack spacing={6}>
        <ControlledSelect<FormValues, Option, true>
          isMulti
          name="residentialWorkTypes"
          control={control}
          label="1. What sort of residential work are you doing?"
          placeholder="Select work types"
          options={RESIDENTIAL_WORK_TYPES}
        />
        {residentialWorkTypesState.indexOf(SubOption.InteriorWork) !== -1 && (
          <ControlledSelect<FormValues, Option, true>
            isMulti
            name="interiorWorkTypes"
            control={control}
            label="What sort of interior work are you doing?"
            placeholder="Select work types"
            options={INTERIOR_WORK_TYPES}
          />
        )}
        {residentialWorkTypesState.indexOf(SubOption.ExteriorWork) !== -1 && (
          <ControlledSelect<FormValues, Option, true>
            isMulti
            name="exteriorWorkTypes"
            control={control}
            label="What sort of exterior work are you doing?"
            placeholder="Select work types"
            options={EXTERIOR_WORK_TYPES}
          />
        )}

        <ControlledSelect<FormValues, Option, true>
          isMulti
          name="involvedWorkTypes"
          control={control}
          label="2. Does the project involve the following?"
          placeholder="Select work types"
          options={INVOLVED_WORK_TYPES}
        />

        <ButtonGroup>
          <Button type="button" onClick={handleReset} w="full">
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
        {workPermitRequirements.length && (
          <Text fontSize="2xl" fontWeight="bold">
            Required Work Permits
          </Text>
        )}
        {workPermitRequirements.map(
          (requirement: WorkPermitRequirement, index: number) => (
            <div key={index}>
              <Text fontSize="xl" pl="3">
                {WORK_PERMIT_REQUIREMENTS[requirement].title}
              </Text>
              <Text
                mb="4"
                pl="5"
                dangerouslySetInnerHTML={{
                  __html: WORK_PERMIT_REQUIREMENTS[requirement].content,
                }}
              />
            </div>
          )
        )}
        {attachments.length && (
          <Text fontSize="xl" fontWeight="bold">
            Attachments
          </Text>
        )}
        {attachments.map((attachment, index) => (
          <Link
            color="blue.800"
            textDecoration="underline"
            pl="3"
            key={index}
            href={attachment.link}
          >
            {attachment.title}
          </Link>
        ))}
      </Stack>
    </Container>
  );
};

export default MainBoard;

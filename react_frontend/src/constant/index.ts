import { SubOption, WorkPermitRequirement } from '../types';

export const RESIDENTIAL_WORK_TYPES = [
  {
    label: 'Interior Work',
    value: SubOption.InteriorWork,
  },
  {
    label: 'Exterior Work',
    value: SubOption.ExteriorWork,
  },
];

export const INTERIOR_WORK_TYPES = [
  {
    label: 'New bathroom',
    value: SubOption.One,
  },
  {
    label: 'New laundry room',
    value: SubOption.Two,
  },
  {
    label: 'Bathroom remodel',
    value: SubOption.Three,
  },
  {
    label: 'Other',
    value: SubOption.Other,
  },
];

export const EXTERIOR_WORK_TYPES = [
  {
    label: 'Garage door replacement',
    value: SubOption.One,
  },
  {
    label: 'Work on exterior doors',
    value: SubOption.Two,
  },
  {
    label: 'Re-roofing',
    value: SubOption.Three,
  },
  {
    label: 'Building fences less than 6 feet.',
    value: SubOption.Four,
  },
  {
    label: 'Other',
    value: SubOption.Other,
  },
];

export const INVOLVED_WORK_TYPES = [
  {
    label: 'Electrical',
    value: SubOption.Electrical,
  },
  {
    label: 'Plumbing',
    value: SubOption.Plumbing,
  },
  {
    label: 'None',
    value: SubOption.None,
  },
];

export const WORK_PERMIT_REQUIREMENTS = {
  [WorkPermitRequirement.NoPermit]: {
    title: 'No Permit',
    content: 'Nothing is required! You’re set to build.',
  },
  [WorkPermitRequirement.InHouseReviewProcess]: {
    title: 'Over-the-Counter Submission Process',
    content: `- Prepare your application including all necessary forms from above and plans are required. <br/>
    - Submit application (all forms and plans) for electronic review on SFDBI website. <br/>
    - Track permit approval status at https://dbiweb02.sfgov.org/dbipts/. <br/>
    - Once approved, pay permit fees and get your approved permit and job card.`,
  },
  [WorkPermitRequirement.OTCWithoutPlans]: {
    title: `Over-the-Counter Submission Process (You don't need the plan)`,
    content: `- Prepare your application including all necessary forms from above, <br/>
    - If plans are required, prepare two copies of each plan set. <br/>
    - Go through the OTC review process at San Francisco DBI. <br/>
    - Once approved, pay permit fees and get your approved permit and job card`,
  },
  [WorkPermitRequirement.OTCWithPlans]: {
    title: `Over-the-Counter Submission Process (You need the plan)`,
    content: `- Prepare your application including all necessary forms from above, <br/>
    - If plans are required, prepare two copies of each plan set. <br/>
    - Go through the OTC review process at San Francisco DBI. <br/>
    - Once approved, pay permit fees and get your approved permit and job card`,
  },
};

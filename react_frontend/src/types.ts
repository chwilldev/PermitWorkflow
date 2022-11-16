export enum SubOption {
  One = 'New bathroom, Garage door replacement',
  Two = 'New laundry room, Work on exterior doors',
  Three = 'Bathroom remodel, Re-roofing',
  Four = 'Building fences less than 6 feet.',
  Other = 'Other',
  InteriorWork = 'Interior Work',
  ExteriorWork = 'Exterior Work',
  Electrical = 'Electrical',
  Plumbing = 'Plumbing',
  None = 'None',
}

export enum WorkPermitRequirement {
  OTCWithPlans = 'OTC with Plans',
  OTCWithoutPlans = 'OTC without Plans',
  InHouseReviewProcess = 'In-house review process',
  NoPermit = 'No Permit',
}

export interface Attachment {
  title: string;
  link: string;
}

export type Option = {
  label: string;
  value: SubOption;
};

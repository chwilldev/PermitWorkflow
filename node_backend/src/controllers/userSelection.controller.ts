import * as express from 'express';
import { Request, Response } from 'express';
import { SubOption, WorkPermitRequirement, Attachment } from '../types';
import { UserSelection } from '../modal/userSelection.modal';

export const router = express.Router();

router.post('/user-selection', async (req: Request, res: Response) => {
  const { residentialPayloadData, involvedWorkTypesPayloadData } = req.body;

  const newUserSelection = new UserSelection({
    permitWorkflow: residentialPayloadData,
    attachments: involvedWorkTypesPayloadData,
  });

  const userSelection = await newUserSelection.save();
  let residentialWorkTypes = [
    ...residentialPayloadData.map((data) => [...data.subOptions]),
  ].flat();
  const workPermitRequirements: string[] = [];
  if (
    residentialWorkTypes.indexOf(SubOption.One) !== -1 ||
    residentialWorkTypes.indexOf(SubOption.Two) !== -1
  ) {
    workPermitRequirements.push(WorkPermitRequirement.OTCWithPlans);
  }
  if (residentialWorkTypes.indexOf(SubOption.Three) !== -1) {
    if (
      workPermitRequirements.indexOf(WorkPermitRequirement.OTCWithPlans) === -1
    ) {
      workPermitRequirements.push(WorkPermitRequirement.OTCWithoutPlans);
    }
  }
  if (residentialWorkTypes.indexOf(SubOption.Other) !== -1) {
    workPermitRequirements.push(WorkPermitRequirement.InHouseReviewProcess);
  }
  if (residentialWorkTypes.indexOf(SubOption.Four) !== -1) {
    if (!workPermitRequirements.length)
      workPermitRequirements.push(WorkPermitRequirement.NoPermit);
  }

  const attachments: Attachment[] = [];

  if (involvedWorkTypesPayloadData.indexOf(SubOption.Electrical) !== -1) {
    attachments.push({
      title: 'Electrical Permit WorkSheet 2013.pdf',
      link: 'https://sfdbi.org/sites/default/files/migrated/FileCenter/Documents/forms/Inspection_Services/Electrical_Permit_Worksheet_2013.pdf',
    });
  }
  if (involvedWorkTypesPayloadData.indexOf(SubOption.Plumbing) !== -1) {
    attachments.push({
      title: 'Electrical Permit WorkSheet 2013.pdf',
      link: 'https://sfdbi.org/sites/default/files/Plumbing%20Worksheet.pdf',
    });
  }

  res.json({ workPermitRequirements, attachments }); //For testing
});

export { router as PermitWorkflow };

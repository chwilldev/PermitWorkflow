import * as mongoose from 'mongoose';

interface UserSelectionType {
  created_at: Date;
  permitWorkflow: [{ title: String; subOptions: [String] }];
  attachments?: string[];
}

const userSelectionSchema = new mongoose.Schema<UserSelectionType>({
  created_at: { type: Date, default: Date.now },
  permitWorkflow: { type: [{ title: String, subOptions: [String] }] },
  attachments: { type: [String] },
});

export const UserSelection = mongoose.model(
  'UserSelection',
  userSelectionSchema
);

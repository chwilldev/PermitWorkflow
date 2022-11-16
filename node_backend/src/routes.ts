import * as express from 'express';
import { router as userSelectionRouter } from './controllers/userSelection.controller';

export const router = express.Router();

router.use(userSelectionRouter);

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import { router } from './routes';

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', router);

mongoose
  .connect(process.env.DB_URL)
  .then((data) => {
    console.log('DB connection success!');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port: ${process.env.API_PORT}`);
});

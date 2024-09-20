import express, { Request, Response } from "express";
import cors from 'cors';
import sequelize from "./db";
import authController from './routes/auth';
import customerController from './routes/customer';
import packingDataController from './routes/packingData';
import dotenv from 'dotenv';

dotenv.config();

const port: number = parseInt(process.env.APP_PORT || '3000', 10);

const app: express.Application = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('This is my server using TypeScript syntax');
});

app.use('/api/auth', authController);
app.use('/api', customerController);
app.use('/api', packingDataController);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.log('Unable to connect to the database:', error.message);
});

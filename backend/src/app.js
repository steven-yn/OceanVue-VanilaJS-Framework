import express from 'express';
import apiRoutes from './api/index';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

app.listen(process.env.PORT || 5000);

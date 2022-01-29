import express from 'express';
import apiRoutes from './api/index';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:9010',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

/*
app.use(
  express.json({
    limit: '50mb',
  }),
);
*/

/*
app.use((err, req, res, next) => {
  res.status(500).json({ statusCode: res.statusCode, errMessage: err.message });
});

app.get('/error2', (req, res, next) => {
  next(new Error('에러 발생!'));
});
*/
app.listen(5000, () => {
  console.log(
    'Hello Zum-Board! My Nickname is yoonOcean -> http://localhost:5000',
  );
});

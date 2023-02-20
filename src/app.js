import express from 'express';
import apiRoutes from './api/index';
import cors from 'cors';
import path from 'path';

const app = express();
/*
const whitelist = [
  'http://localhost:9010',
  'https://steven-yn.github.io/OceanVue-VanilaJS-Framework',
  'https://steven-yn.github.io',
  'https://steven-yn.github.io/',
  'https://steven-yn.github.io/OceanVue-VanilaJS-Framework/',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed Origin!'));
    }
  },
  optionsSuccessStatus: 200,
};
*/
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/bundle.js'));
});

app.listen(process.env.PORT || 5001);
console.log('server ready');

import express from 'express';
import apiRoutes from './api/index';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use(cors(corsOptions));
*/

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'));
});

app.listen(PORT, () => {
  console.log('Hello ! My Nickname is yoonOcean -> http://localhost:5000');
});

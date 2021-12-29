const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models');
const workersRouter = require('./routes/workers');
const beaconsRouter = require('./routes/beacons');
const scannersRouter = require('./routes/scanners');
const beacon_valuesRouter = require('./routes/beacon_values');
const work_locationsRouter = require('./routes/work_locations');
const noticesRouter = require('./routes/notices');
const sensorsRouter = require('./routes/sensors');
const sensor_devicesRouter = require('./routes/sensor_devices');
const alarmsRouter = require('./routes/alarms');
const cors = require('cors');
const app = express();

app.set('port', process.env.port || 3001);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

nunjucks.configure('views', {
  express: app,
  watch: true,
});

sequelize.sync({ force: false }).then(() => {
  console.log('DB연결');
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/work_locations', work_locationsRouter);
app.use('/workers', workersRouter);
app.use('/scanners', scannersRouter);
app.use('/beacons', beaconsRouter);
app.use('/beacon_values', beacon_valuesRouter);
app.use('/notices', noticesRouter);
app.use('/sensors', sensorsRouter);
app.use('/sensor_devices', sensor_devicesRouter);
app.use('/alarms', alarmsRouter);

app.use((req, res) => {
  res.status(404).send('라우터 없음');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

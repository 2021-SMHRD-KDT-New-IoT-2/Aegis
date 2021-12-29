const Sequelize = require('sequelize');
const Work_location = require('./work_location');
const Worker = require('./worker');
const Worker_schedule = require('./work_schedule');
const Worker_io = require('./worker_io');
const Scanner = require('./scanner');
const Beacon = require('./beacon');
const Beacon_value = require('./beacon_value');
const Alarm = require('./alarm');
const Notice = require('./notice');
const Dangerzone = require('./dangerzone');
const Ext_tbl_device = require('./ext_tbl_device');
const Ext_tbl_sensor = require('./ext_tbl_sensor');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const { associate } = require('./work_location');
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Work_location = Work_location;
db.Worker = Worker;
db.Worker_schedule = Worker_schedule;
db.Worker_io = Worker_io;
db.Scanner = Scanner;
db.Beacon = Beacon;
db.Beacon_value = Beacon_value;
db.Alarm = Alarm;
db.Notice = Notice;
db.Dangerzone = Dangerzone;
db.Ext_tbl_device = Ext_tbl_device;
db.Ext_tbl_sensor = Ext_tbl_sensor;

Work_location.init(sequelize);
Worker.init(sequelize);
Worker_schedule.init(sequelize);
Worker_io.init(sequelize);
Scanner.init(sequelize);
Beacon.init(sequelize);
Beacon_value.init(sequelize);
Alarm.init(sequelize);
Notice.init(sequelize);
Dangerzone.init(sequelize);
Ext_tbl_device.init(sequelize);
Ext_tbl_sensor.init(sequelize);

Worker.associate(db);
Work_location.associate(db);

module.exports = db;
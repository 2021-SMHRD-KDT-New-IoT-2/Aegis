const mqtt = require('mqtt');
const Ext_tbl_sensor = require('./models/ext_tbl_sensor');
let mysql = require('mysql');

let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'nodejs_db',
});

// let options = {
//     host: '211.48.228.15',
//     port: 1883,
//     protocol: 'mqtts',
// }

//initialize the MQTT client
let client = mqtt.connect('mqtt://211.48.228.15:1883');

//setup the callbacks
client.on('connect', function () {
  client.subscribe('sensor/total', { qos: 0 });
  console.log('Connected');
});

client.on('error', function (error) {
  console.log(error);
});

// client.subscribe("sensor/total");

client.on('message', function (topic, message) {
  let sensor_info = JSON.parse(message);

  let sql = `INSERT INTO ext_tbl_sensors (toluene_level, ammonia_level, acetone_level, co2_level, co_level, formalin_level, temperature_level, humidity_level, device_id, createdAt) values (${sensor_info.tol}, ${sensor_info.nh4}, ${sensor_info.ace}, ${sensor_info.co2}, ${sensor_info.co}, ${sensor_info.form}, ${sensor_info.temp}, ${sensor_info.hum}, '${sensor_info.mid}', now())`;

  con.query(sql, (err, result, field) => {
    if (err) {
      console.log(err);
    }
  });
});

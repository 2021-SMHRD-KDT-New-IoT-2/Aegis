const mqtt = require('mqtt');
let mysql = require('mysql');

let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'nodejs_db',
});

let options = {
  host: '850e1de2597e4f2d9496cfe35ffb2019.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'kimbumjong',
  password: 'Qjawn9679',
};

//initialize the MQTT client
let client = mqtt.connect(options);
let client2 = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
  console.log('Connected');
});
client2.on('connect', function () {
  console.log('Connected2');
});

client.on('error', function (error) {
  console.log(error);
});
client2.on('error', function (error) {
  console.log(error);
});

client.subscribe('abc');
client2.subscribe('bc');

client.on('message', function (topic, data) {
  let beacon_info = JSON.parse(data);

  let sql = `INSERT INTO beacon_values (bs_mac, bs_rssi, bs_distance, createdAt) values (${beacon_info.MacAddress}, ${beacon_info.Rssi}, ${beacon_info.Distance}, now())`;

  con.query(sql, (err, result, field) => {
    if (err) {
      console.log(err);
    }
  });
});

client2.on('message', function (topic, data) {
  let alarm_info = JSON.parse(data);

  let sql = `INSERT INTO alarms (bs_mac, onOff, createdAt) values (${alarm_info.MacAddress}, ${alarm_info.onOff}, now())`;

  con.query(sql, (err, result, field) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
});

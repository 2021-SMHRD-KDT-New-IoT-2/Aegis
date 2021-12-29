const express = require('express');
const Sensor_device = require('../models/ext_tbl_device');
const Sequelize = require('sequelize');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let devices = await Sensor_device.findAll({});

    //시간 비교 해서 최소 1분 이상 createdAt 이 지나면 0명으로 반환

    res.send(devices);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/add', async (req, res, next) => {
  try {
    let data = req.body;
    Sensor_device.create({
      device_id: data.device_id,
      device_location: data.device_location,
      worker_id: data.worker_id,
    });
    res.send();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

const express = require('express');
const Sensors = require('../models/ext_tbl_sensor');
const Sequelize = require('sequelize');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const Sensors_info = await Sensors.findAll({
      attributes: [
        'toluene_level',
        'ammonia_level',
        'acetone_level',
        'co2_level',
        'co_level',
        'formalin_level',
        'temperature_level',
        'humidity_level',
      ],
      order: [['createdAt', 'DESC']],
      limit: 1,
    });
    res.send(Sensors_info);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

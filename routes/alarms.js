const express = require('express');
const Alarm = require('../models/alarm');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const Alarm_info = await Alarm.findAll({
      attributes: ['bs_mac', 'onOff'],
      order: [['createdAt', 'DESC']],
      limit: 1,
    });
    res.send(Alarm_info);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

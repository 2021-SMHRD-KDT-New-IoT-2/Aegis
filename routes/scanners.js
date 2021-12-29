const express = require('express');
const Scanner = require('../models/scanner');
const Sequelize = require('sequelize');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let scanners = await Scanner.findAll({});

    //시간 비교 해서 최소 1분 이상 createdAt 이 지나면 0명으로 반환

    res.send(scanners);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/add', async (req, res, next) => {
  try {
    let data = req.body;
    Scanner.create({
      scanner_serial: data.scanner_serial,
      scanner_loc: data.scanner_loc,
      worker_id: data.worker_id,
    });
    res.send();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

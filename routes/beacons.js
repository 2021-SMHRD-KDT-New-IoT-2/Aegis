const express = require('express');
const Beacon_value = require('../models/beacon_value');
const Beacon = require('../models/beacon');
const Sequelize = require('sequelize');
const { sequelize } = require('../models/beacon_value');
const Op = Sequelize.Op;
const router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'nodejs_db',
});

router.get('/', async (req, res, next) => {
  try {
    let beacons = await Beacon.findAll({});

    //시간 비교 해서 최소 1분 이상 createdAt 이 지나면 0명으로 반환

    res.send(beacons);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/current', async (req, res, next) => {
  try {
    let Beacon_values = await Beacon_value.findAll({
      where: {
        [Op.or]: [
          { bs_mac: 16777502 },
          { bs_mac: 16777524 },
          { bs_mac: 16777680 },
        ],
      },
      order: [['createdAt', 'DESC']],
      attributes: [
        //[Sequelize.fn('DISTINCT', Sequelize.col('bs_mac')), 'bs_mac'] //들어온 비콘 distinct
        [Sequelize.literal('COUNT(DISTINCT(bs_mac))'), 'countOfbs_mac'], //들어온 비콘 갯수
      ],
      limit: 10,
    });

    //시간 비교 해서 최소 1분 이상 createdAt 이 지나면 0명으로 반환
    res.send(Beacon_values);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/total', async (req, res, next) => {
  try {
    let Beacons = await Beacon.findAll({
      attributes: [
        //[Sequelize.fn('DISTINCT', Sequelize.col('bs_mac')), 'bs_mac'] //들어온 비콘 distinct
        [
          Sequelize.literal('COUNT(DISTINCT(beacon_serial))'),
          'countOfbeacon_serial',
        ], //등록된 비콘 수
      ],
    });
    res.send(Beacons);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/notuse', async (req, res, next) => {
  try {
    let Beacons = await Beacon.findAll({
      attributes: [
        //[Sequelize.fn('DISTINCT', Sequelize.col('bs_mac')), 'bs_mac'] //들어온 비콘 distinct
        [
          Sequelize.literal('COUNT(DISTINCT(beacon_serial))'),
          'countOfbeacon_serial',
        ], //등록된 비콘 수
      ],
    });

    let Beacon_values = await Beacon_value.findAll({
      where: {
        bs_mac: [16777502, 16777524, 16777680],
      },
      order: [['createdAt', 'DESC']],
      attributes: [
        //[Sequelize.fn('DISTINCT', Sequelize.col('bs_mac')), 'bs_mac'] //들어온 비콘 distinct
        [Sequelize.literal('COUNT(DISTINCT(bs_mac))'), 'countOfbs_mac'], //들어온 비콘 갯수
      ],
      limit: 10,
    });

    let notuse = Beacons.countOfbeacon_serial - Beacon_values.countOfbs_mac;

    console.log(notuse);
    res.send(notuse);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/add', async (req, res, next) => {
  try {
    let beacon_serial = req.body.beacon_serial;

    let sql = `INSERT INTO beacons (beacon_serial, createdAt) values ('${beacon_serial}', now())`;

    con.query(sql, (err, result, field) => {
      if (err) {
        console.log(err);
      }
      res.send();
    });

    res.send();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

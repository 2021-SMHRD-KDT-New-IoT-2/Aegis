const express = require('express');
const Beacon_value = require('../models/beacon_value');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const Beacon_values = await Beacon_value.findAll({
      [Op.or]: [{ bs_mac: [16777502, 16777524, 16777680] }],
      order: [['createdAt', 'DESC']],
      limit: 10,
    });
    res.send(Beacon_values);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

// const express = require('express');
// const mysql = require('mysql');

// const router = express.Router();

// let conn = mysql.createConnection({
//     host : "localhost",
//     user : "kim",
//     password : "rudrnr731!",
//     database : "rasp_db"
// });

// router.get('/beacons', async (req, res, next)=>{
//     try{
//         let sql_distinct = "SELECT DISTINCT(beacon_mac) FROM beacons"

//         conn.query(sql_distinct, function(err, result){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log(result);
//             }
//         });
//     }catch (err){
//         console.error(err);
//         next(err);
//     }
// });

// module.exports = router;

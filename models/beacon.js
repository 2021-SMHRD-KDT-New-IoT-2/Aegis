const Sequelize = require('sequelize');

module.exports = class Beacon extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        beacon_seq: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        beacon_serial: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        scanner_seq: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
        worker_id: {
          type: Sequelize.STRING(20),
        },

        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Beacon',
        tableName: 'beacons',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
};

// const express = require('express');
// const mysql = require('mysql');

// const router = express.Router();

// let conn = mysql.createConnection({
//     host : "localhost",
//     user : "kim",
//     password : "rudrnr731!",
//     database : "rasp_db"
// });

// router.get('/beacon', async (req, res, next)=>{
//     try{
//         let sql_distinct = "SELECT DISTINCT(beacon_mac) FROM beacons"

//         conn.query(sql_distinct, function(err, result){
//             if(err){
//                 console.log(err);
//             }else{
//                 res.send(result);
//                 console.log(result);
//             }
//         });
//     }catch (err){
//         console.error(err);
//         next(err);
//     }
// });

// module.exports = router;

const Sequelize = require('sequelize');

module.exports = class Beacon_value extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            bs_seq: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true, 
                autoIncrement: true
            },
            bs_mac: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull : false,
                defaultValue:0,
            },
            bs_rssi:{
                type : Sequelize.INTEGER,
                allowNull : false,
                defaultValue:0,
            },
            bs_distance:{
                type : Sequelize.DOUBLE,
                allowNull : false,
                defaultValue:0,
            },

            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Beacon_value',
            tableName: 'beacon_values',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
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
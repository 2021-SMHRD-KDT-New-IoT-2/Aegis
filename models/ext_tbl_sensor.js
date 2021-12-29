const Sequelize = require('sequelize');

module.exports = class Ext_tbl_sensor extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            sensor_seq: {
                type: Sequelize.INTEGER.UNSIGNED, 
                primaryKey: true, 
                autoIncrement: true
            },
            toluene_level:{
                type : Sequelize.FLOAT,
                allowNull : false,
            },
            ammonia_level:{
                type : Sequelize.FLOAT,
                allowNull : false,
            },
            acetone_level:{
                type : Sequelize.FLOAT,
                allowNull : false,
            },
            co2_level:{
                type : Sequelize.FLOAT,
                allowNull : false,
            },
            co_level:{
                type : Sequelize.FLOAT,
                allowNull : false,
            },
            formalin_level:{
                type : Sequelize.FLOAT,
                allowNull : false,
            },
            temperature_level:{
                type : Sequelize.FLOAT,
                allowNull : false,
            },
            humidity_level:{
                type : Sequelize.FLOAT,
                allowNull : false,
            },
            device_id: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },

            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Ext_tbl_sensor',
            tableName: 'ext_tbl_sensors',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
};
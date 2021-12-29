const Sequelize = require('sequelize');

module.exports = class Ext_tbl_device extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            device_seq: {
                type: Sequelize.INTEGER.UNSIGNED, 
                primaryKey: true, 
                autoIncrement: true
            },
            device_id: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true
            },
            device_location:{
                type : Sequelize.STRING(180),
                allowNull : false,
            },
            worker_id:{
                type : Sequelize.STRING(20),
                allowNull : false,
            },

            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Ext_tbl_device',
            tableName: 'ext_tbl_devices',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
};
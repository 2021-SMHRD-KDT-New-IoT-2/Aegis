const Sequelize = require('sequelize');

module.exports = class Alarm extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            alarm_seq: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true, 
                autoIncrement: true
            },
            bs_mac:{
                type : Sequelize.INTEGER.UNSIGNED,
            },
            onOff:{
                type : Sequelize.BOOLEAN,
                allowNull : false,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Alarm',
            tableName: 'alarms',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
};
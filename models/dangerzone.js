const Sequelize = require('sequelize');

module.exports = class Dangerzone extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            danger_seq: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            beacon_seq: {
                type: Sequelize.INTEGER.UNSIGNED,
            },

            danger_name:{
                type : Sequelize.STRING(50),
                allowNull : false,
            },

            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Dangerzone',
            tableName: 'dangerzones',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
};
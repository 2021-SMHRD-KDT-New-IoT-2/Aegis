const Sequelize = require('sequelize');

module.exports = class Scanner extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            scanner_seq: {
                type: Sequelize.INTEGER.UNSIGNED, 
                primaryKey: true, 
                autoIncrement: true
            },
            scanner_serial: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true
            },
            scanner_loc:{
                type : Sequelize.STRING(50),
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
            modelName: 'Scanner',
            tableName: 'scanners',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
};
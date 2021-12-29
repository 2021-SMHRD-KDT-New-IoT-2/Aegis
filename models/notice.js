//const { DATE } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class Notice extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            notice_seq: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            notice_title: {
                type: Sequelize.STRING(180),
                allowNull: false,
            },
            notice_content:{
                type : Sequelize.TEXT,
                allowNull : false,
            },
            notice_file:{
                type : Sequelize.STRING(180),
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
            modelName: 'Notice',
            tableName: 'notices',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
};
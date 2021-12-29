const Sequelize = require('sequelize');

module.exports = class Worker_schedule extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            work_seq: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true, 
                autoIncrement: true
            },
            work_title: {
                type: Sequelize.STRING(180),
                allowNull: false,
            },
            work_content:{
                type : Sequelize.TEXT,
                allowNull : false,
            },
            work_s_date:{
                type : Sequelize.DATE,
                allowNull : false,
            },
            work_e_date:{
                type : Sequelize.DATE,
                allowNull : false,
            },
            worker_id:{
                type : Sequelize.STRING(20),
            },

            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Work_schedule',
            tableName: 'work_schedules',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
};
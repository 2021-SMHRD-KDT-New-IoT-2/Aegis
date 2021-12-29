const Sequelize = require('sequelize');

module.exports = class Worker_io extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            io_seq: {
                type: Sequelize.INTEGER.UNSIGNED, 
                primaryKey: true, 
                autoIncrement: true
            },
            worker_id: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            io_type:{
                type : Sequelize.STRING(1),
                allowNull : false,
            },
            io_spot:{
                type : Sequelize.STRING(50),
                allowNull : false,
            },

            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Worker_io',
            tableName: 'worker_ios',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
};
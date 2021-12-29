const { DATE } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class Worker extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            worker_id: {
                type: Sequelize.STRING(20),
                primaryKey: true,
            },
            worker_pw:{
                type : Sequelize.STRING(50),
                allowNull : false,
            },
            worker_name:{
                type : Sequelize.STRING(20),
                allowNull : false,
            },
            worker_phone:{
                type : Sequelize.STRING(20),
                allowNull : false,
            },
            worker_mac:{
                type : Sequelize.STRING(20),
            },
            manager_yn:{
                type : Sequelize.STRING(1),
                allowNull : false,
            },
            
            createdAt: DATE,
            updatedAt: DATE

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Worker',
            tableName: 'workers',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }static associate(db) {
        db.Worker.belongsTo(db.Work_location, { foreignKey: 'working_loc_seq', targetKey: 'working_loc_seq'});
    }
};
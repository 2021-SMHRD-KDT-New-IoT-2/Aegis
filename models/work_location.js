const Sequelize = require('sequelize');

module.exports = class Work_location extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            working_loc_seq: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true, 
                autoIncrement: true
            },
            working_loc_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            working_loc_addr: {
                type: Sequelize.STRING(180),
                allowNull: false,
            },
            working_loc_phone:{
                type : Sequelize.STRING(20),
                allowNull: false,
            },
            project_name:{
                type : Sequelize.STRING(180),
                allowNull : false,
            },

            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE

        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Work_location',
            tableName: 'work_locations',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }static associate(db) {
        db.Work_location.hasMany(db.Worker, { foreignKey: 'working_loc_seq', sourceKey: 'working_loc_seq'});
    }
};
const { Model, DataTypes } = require('sequelize');

class Blacklist extends Model {
    static init(sequelize) {
        super.init({
            token: DataTypes.STRING
        }, {
            sequelize
        })
    }
}

module.exports = Blacklist;
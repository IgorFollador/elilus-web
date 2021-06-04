const { Model, DataTypes } = require('sequelize');

class Category extends Model {
    static init(sequelize) {
        super.init({
            description: DataTypes.STRING
        }, {
            sequelize
        })
    }
}

module.exports = Category;
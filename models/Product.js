const { Model, DataTypes } = require('sequelize');

class Product extends Model {
    static init(sequelize) {
        super.init({
            id_category: DataTypes.INTEGER,
            path_image: DataTypes.STRING,
            description: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Category, { foreignKey: 'id_category', as: 'category' });
      }
}

module.exports = Product;
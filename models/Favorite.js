const { Model, DataTypes } = require('sequelize');

class Favorite extends Model {
    static init(sequelize) {
        super.init({
            id_product: DataTypes.INTEGER,
            id_user: DataTypes.INTEGER
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Product, { foreignKey: 'id_product', as: 'product' });
        this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
      }
}

module.exports = Favorite;
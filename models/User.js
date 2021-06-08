const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            adm: DataTypes.BOOLEAN,
            name: DataTypes.STRING,
            lastname: DataTypes.STRING,
            telephone: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            password_reset_token: DataTypes.STRING,
            password_reset_expires: DataTypes.DATE
        }, {
            sequelize
        })
    }
}

module.exports = User;
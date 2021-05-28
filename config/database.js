// /require('dotenv').config();
module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'elilusdb',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
};
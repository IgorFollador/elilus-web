// /require('dotenv').config();
module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'elilusdb',
  define: {
    timestamps: true,
    underscored: true,
  },
};
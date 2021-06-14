require('dotenv').config();
module.exports = {
  dialect: 'mysql',
  host: process.env.HOST_DB,
  username: process.env.USER_DB,
  password: process.env.PASS_DB,
  database: 'elilusdb',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
};
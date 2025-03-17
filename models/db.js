const Sequelize = require('sequelize')
const sequelize = new Sequelize('projetoTDL', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  query: {raw: true}
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
const db = require('./db')

const Tarefa = db.sequelize.define('Tarefas', {
  titulo: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = Tarefa
//Tarefa.sync({force: true})
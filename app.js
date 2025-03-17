const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const db = require('./models/db')
const create = require('./routes/create')
const Tarefa = require('./models/Tarefa')

app.use(session({
  secret: "nodeenodenepapai",
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  next()
})

app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

db.sequelize.authenticate().then(function(){
  console.log('Conectado com MariaDB!')
}).catch(function(err){
  console.log(`Erro ao conectar: ${err}`)
})

app.get('/', (req, res) => {
  Tarefa.findAll().then((tarefa) => {
    res.render('home/index', {tarefa: tarefa})
  }).catch((err) => {
    res.send('Houve um erro: '+err)
  })
})

app.use('/create', create)

const PORT = 8081
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
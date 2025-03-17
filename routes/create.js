const express = require('express')
const router = express.Router()
const Tarefa = require('../models/Tarefa')

router.get('/', (req, res) => {
  res.send('Ola create')
})

router.get('/tarefa', (req, res) => {
  res.render('create/tarefaCreate')
})

router.post('/tarefa', (req, res) => {
  Tarefa.create({
    titulo: req.body.titulo,
    status: 0
  }).then(() => {
    req.flash("success_msg", "Tarefa criada com sucesso!")
    res.redirect('/')
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao criar a tarefa!")
    res.redirect('/tarefa')
    console.log(`erro: ${err}`)
  })
})

/*router.post('/tarefa/check', (req, res) => {
  Tarefa.update(
    {status: req.body.status === 'true' ? false : true}, {where: {id: req.body.id}}).then(() => {
    res.redirect('/')
    }).catch((err) => {
    console.error('Erro ao atualizar status:', err);
    res.redirect('/');
  });
});
*/

router.get('/tarefa/check/:id', (req, res) => {
  Tarefa.findOne({where: {id: req.params.id}}).then((tarefa) => {
    if (!tarefa) {
      console.log('Nao a tarefa!')
      return res.redirect('/')
    }
    Tarefa.update({status: !tarefa.status}, {where: {id: req.params.id}}).then(() => {
      res.redirect('/')
    }).catch((err) => {
      console.log(`${err}`)
      res.redirect('/')
    })
  })
})


module.exports = router
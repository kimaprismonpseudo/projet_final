const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express()
const models = require('./models/index');
const path = require('path')

app.set('views', path.join (__dirname, 'views'));
app.set('view engine', 'pug');

//models.Singe.belongsTo(models.enclos);

// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add a bit of logging
app.use(morgan('short'))

app.get('/', function(req, res) {
  res.render('index'); //{test : 'bla'}
})

app.get('/singes', function(req,res) {
	res.render('singes');
})

app.get('/getSinge', function (req, res) {
  models.Singe.findOne({nom: req.body.username})
    .then((singes) =>{
      res.render('getSinge', {info: singes})
    })
})
// Add a new user to the database
app.post('/addSinge', function(req, res) {
  models.Singe.create({
    nom: req.body.username,
    poids: req.body.poids,
    taille: req.body.taille,
    enclos: req.body.enclos,
    detail: req.body.detail
  })
    .then(() => {
      res.render('validation')
    })
})

app.get('/addSinges', function(req,res) {
	res.render('addSinges');
})

app.post('/supprSinge', function (req, res) {
  models.Singe.destroy({
      where: {nom: req.body.username}
    })
    .then(() =>{
      res.render('validation')
    });
});

app.get('/supprSinges', function(req,res) {
	res.render('supprSinges');
})

app.post('/modifSinge', function (req, res) {
  models.Singe.update(
  	req.body,{
      where: {nom: req.body.username}
    })
    .then(() =>{
      res.render('validation')
    });
});

app.get('/modifSinges', function(req,res) {
	res.render('modifSinges');
})

app.get('/enclos', function (req, res) {
  res.render('enclos');
})

// Get all the enclos defined
app.get('/getEnclos', function (req, res) {
  models.Enclos.findOne({numero: req.body.numero})
  .then((enclos)=>{
  		res.render('getEnclos', {info: enclos})
  	})
})

app.get('/getSingeEnclos', function (req, res) {
  models.Singe.findOne({enclos : req.body.numero}) //(findAll({where:{enclos : req.body.numero}}))
  .then((singes)=>{
  		res.json(singes)
  	})
})

// Add a new user to the database
app.post('/addEnclos', function(req, res) {
  models.Enclos.create({
    nom: req.body.username,
    numero: req.body.numero,
    taille: req.body.taille,
    restant: req.body.restant,
    detail: req.body.detail
  })
    .then(() => {
      res.render('validation')
    })
})

app.get('/addEnclos', function(req,res) {
	res.render('addEnclos');
})

app.post('/supprEnclos', function (req, res) {
  models.Enclos.destroy({
      where: {numero: req.body.numero}
    })
    .then(() =>{
      res.render('validation')
    });
});

app.get('/supprEnclos', function(req,res) {
	res.render('supprEnclos');
})

app.post('/modifEnclos', function (req, res) {
  models.Enclos.update(
  	req.body,{
      where: {numero: req.body.numero}
    })
    .then(() =>{
      res.render('validation')
    });
});

app.get('/modifEnclos', function(req,res) {
	res.render('modifEnclos');
})

//------------------------------------------

// Get all the users defined
/*app.get('/', function (req, res) {
  models.User.findAll()
    .then((users) => {
      res.json(users)
    })
})

// Add a new user to the database
app.post('/', function(req, res) {
  models.User.create({
    username: req.body.username
  })
    .then(() => {
      res.send('User added !')
    })
})*/

// Synchronize models
models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   * 
   * Listen only when database connection is sucessfull
   */
  app.listen(3000, function() {
    console.log('Express server listening on port 3000');
  });
});

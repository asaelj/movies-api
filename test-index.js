//Rutas basicas
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer(); //Para datos tipos multipart/form-data
const { config } = require('./config/index');

const app = express();

app.get('/', function(req, res){
  res.send('Hello world');

  //Tipos de send()
  res.send(Buffer.from("whoop"));
  res.send({ some: "json" });
  res.send("<p>some html</p>");
  res.status(404).send("Sorry, we cannot find that!");
  res.status(500).send({ error: "something blew up" });
})

app.get('/json', function(req, res){
  res.json({hello: 'world'});
  //Para mostrar errores
  //res.status(500).json({ error: 'message' })
})

app.get('/param/:nombre/:id', function(req, res){
  res.send(
    `Nombre: ${req.params.nombre}
    id: ${req.params.id}`)
})

app.get('/query', function(req, res){
  // /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
  res.send(
    `${req.query.nombre}`
  )
})

app.use(bodyParser.json()); //Para datos de tipo applicacion/json
app.use(bodyParser.urlencoded({ extended: true })); //Para datos tipo applicacion/x-www-form-urlencoded

// eslint-disable-next-line no-unused-vars
app.post('/profile', upload.array(), function(req, res, next){
  console.log(req.body);
  res.json(req.body);
})

//Lanza servidor en el puerto
app.listen(config.port, function(){
  console.log(`Listening http//localhost:${config.port}`);
})


/*
 * Heroes Catalog
 * Express + Mongoose 
 */

var application_root = __dirname;
var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var autoincrement = require('mongoose-auto-increment');
var app = express();

// Database
var db = mongoose.connect('mongodb://heroescatalog:heroescatalog@ds030827.mongolab.com:30827/heroescatalog');
autoincrement.initialize(db);

// Config
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Roda o peão!!!
app.listen(4242);
console.log("Serviço rodando na porta: 4242...");

// Cria o Schema
var Schema = mongoose.Schema;  
var Hero = new Schema({
    name: { type: String, required: true },  
    description: { type: String, required: true },  
    image: { type: String, required: true },  
    brand: { type: String, required: true }
});

// Define o auto incremento
Hero.plugin(autoincrement.plugin, {
    model: 'Hero',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

// Cria o model
var HeroModel = mongoose.model('Hero', Hero); 

/*************
 * API - CRUD
 *************/

// Raiz da API
app.get('/api', function (req, res) {
  res.send('Heroes Catalog API Version 1.0.0');
});

// READ (ALL)
app.get('/api/heroes', function (req, res){
  return HeroModel.find(function (err, heroes) {
    if (!err) {
      return res.send(heroes);
    } else {
      return console.log(err);
    }
  });
});

// READ (By ID)
app.get('/api/heroes/:id', function (req, res){
  return HeroModel.findById(req.params.id, function (err, hero) {
    if (!err) {
      return res.send(hero);
    } else {
      return console.log(err);
    }
  });
});

// CREATE
app.post('/api/heroes', function (req, res){
  var hero;
  console.log("POST: ");
  console.log(req.body.name);
  hero = new HeroModel({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    brand: req.body.brand
  });
  hero.save(function (err) {
    if (!err) {
      return console.log("Herói criado");
    } else {
      return console.log(err);
    }
  });
  return res.send(req.body);
});

// UPDATE
app.put('/api/heroes/:id', function (req, res){
  return HeroModel.findById(req.params.id, function (err, hero) {
    hero.name = req.body.name;
    hero.description = req.body.description;
    hero.image = req.body.image;
    hero.brand = req.body.brand;
    return hero.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(hero);
    });
  });
});

// DELETE
app.delete('/api/heroes/:id', function (req, res){
  return HeroModel.findById(req.params.id, function (err, hero) {
    return hero.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});
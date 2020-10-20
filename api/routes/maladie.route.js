var express = require('express');
var MaladieController = require('../controllers/MaladieController');
require('../../models/maladie.model');
var MaladieController = new MaladieController('Maladie');
var routes = require('./generic.route');

module.exports = routes('api/malaide', MaladieController);
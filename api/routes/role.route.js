var express = require('express');

var RoleController = require('../controllers/Authentication/RoleController');
var RoleController = new RoleController();

var routes = require('./generic.route');

module.exports = routes('api/role', RoleController);
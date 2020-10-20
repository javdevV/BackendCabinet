var express = require('express');
var AppointmentController = require('../controllers/AppointmentController');
require('../../models/appointment.model');
var AppointmentController = new AppointmentController('Appointment');
var routes = require('./generic.route');

module.exports = routes('api/appointment', AppointmentController);
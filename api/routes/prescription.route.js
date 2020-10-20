var express = require('express');
var PrescriptionController = require('../controllers/PrescriptionController');
require('../../models/prescription.model');
var PrescriptionController = new PrescriptionController('Prescription');
var routes = require('./generic.route');

module.exports = routes('api/prescription', PrescriptionController);
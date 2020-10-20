var express = require('express');
var router = express.Router();

// module.exports = router;
var express = require('express');

var PatientController = require('../controllers/PatientController');
// var model = require('../../models/patient.model');
var PatientController = new PatientController('Patient');

var routes = require('./generic.route');
router.get('/byname/:name', PatientController.findByName);

module.exports = router;
module.exports = [routes('api/patient', PatientController), router];
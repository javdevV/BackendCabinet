const Patient = require('../../models/patient.model');
var CrudController = require('./CrudController');
class PatientController extends CrudController {
    constructor(model) {
        super(model);
    }

    async findByName(req, res) {
        const patient = await Patient.find({ name: req.params.name }).exec();
        try {
            if (patient) {
                res.json(patient);
            } else {
                res.status(404).json({ "_id": req.params.id, "Not Found": true });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports = PatientController;
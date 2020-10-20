var CrudController = require('./CrudController');

class PrescriptionController extends CrudController {
    constructor(model) {
        super(model);
    }
}
module.exports = PrescriptionController;
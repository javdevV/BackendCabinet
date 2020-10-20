var CrudController = require('./CrudController');

class AppointmentController extends CrudController {
    constructor(model) {
        super(model);
    }
}
module.exports = AppointmentController;
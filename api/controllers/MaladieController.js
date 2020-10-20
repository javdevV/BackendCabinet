var CrudController = require('./CrudController');

class MaladieController extends CrudController {
    constructor(model) {
        super(model);
    }
}
module.exports = MaladieController;
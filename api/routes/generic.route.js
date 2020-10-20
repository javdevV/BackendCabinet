var express = require('express');
var router = express.Router();
module.exports = function(route, controller) {
    router.get('/' + route + '/', controller.find);
    router.post('/' + route + '/', controller.add);
    router.get('/' + route + '/:id', controller.findById);
    router.put('/' + route + '/:id', controller.put);
    router.patch('/' + route + '/:id', controller.patch);
    router.delete('/' + route + '/:id', controller.delete);
    router.delete('/' + route + '/', controller.deleteAll);
    return router;
}
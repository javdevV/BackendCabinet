var CrudController = require('../CrudController');

class RoleController extends CrudController {
    constructor() {
        super('Role');
    }
}
module.exports = RoleController;



// var Role = require('../../../models/role.model');
// var express = require("express");
// var router = express.Router();

// class RoleController {

//     constructor() {}
//     async find(req, res) {
//         const roles = await Role.find({});
//         try {
//             res.send(roles)
//         } catch (err) {
//             res.status(500).send(err)
//         }
//     }
//     async add(req, res) {
//         console.log(req.body);
//         const role = new Role(req.body);
//         try {
//             await role.save();
//             res.send(role);
//         } catch (error) {
//             console.log(error);
//             res.status(500).send(error);
//         }

//     }
//     async findById(req, res) {
//         const role = await Role.findById(req.params.id);
//         try {
//             if (role) {
//                 res.json(role);
//             } else {
//                 res.status(404).json({ "_id": req.params.id, "Not Found": true });
//             }
//         } catch (error) {
//             res.status(500).json(error);
//         }
//     }
//     async put(req, res) {
//         let responseObject = {
//             sucess: true,
//             updated_element: req.body
//         };
//         try {
//             await Role.findByIdAndUpdate(req.params.id, req.body);
//             res.send(responseObject);
//         } catch (error) {
//             res.status(500).send(error)


//         }
//     }
//     async delete(req, res) {
//         try {
//             const role = await Role.findByIdAndDelete(req.params.id);
//             var payload = {
//                 deleted: true,
//                 deleted_element: role
//             }
//             if (!role) res.status(404).send("Not Item Found");
//             res.status(200).json(payload);
//         } catch (error) {
//             res.status(500).send(error);
//         }
//     }
//     async deleteAll(req, res) {
//         try {
//             const roles = await Role.deleteMany();
//             res.status(200).json(roles);
//         } catch (error) {
//             res.status(500).send(error);
//         }
//     }
// }
// module.exports = RoleController;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    name: {
        type: String,

    },

}, {
    timestamps: true
});

var Role = mongoose.model("Role", RoleSchema);
module.exports = Role;
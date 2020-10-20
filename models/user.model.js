const mongoose = require('mongoose');
const roleSchema = require('./role.model').schema;
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: true,
        index: true,
        unique: true,
        sparse: true
    },
    avatar: {
        type: String
    },
    role: {
        roleSchema
    },
    history: {
        type: Array,
        default: []
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date

}, {
    timestamps: true
})
UserSchema.statics.findByRole = function(name, cb) {
    return this.find({ role: name }, cb);
};


module.exports = User = mongoose.model('User', UserSchema);
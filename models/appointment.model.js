const mongoose = require('mongoose');
const User = require('./user.model').schema;

const AppointmentSchema = new mongoose.Schema({

    daySchedule: { type: String },
    date: {
        type: Date,
        required: false
    },
    time: Date,
    doctor: User,
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', autopopulate: true }

}, {
    timestamps: true,
    discriminatorKey: 'kind'
});
AppointmentSchema.plugin(require('mongoose-autopopulate'));
module.exports = Appointment = mongoose.model('Appointment', AppointmentSchema);
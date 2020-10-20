const mongoose = require('mongoose');
const Appointment = require('./appointment.model');
const Maladie = require('./maladie.model').schema;

const PrescriptionSchema = new mongoose.Schema({
    diagnosis: { type: String },
    cost: { type: Number },
    maladies: [Maladie]
}, {
    timestamps: true,
    discriminatorKey: 'kind'
});
var Prescription = Appointment.discriminator('Prescription', PrescriptionSchema);
module.exports = Prescription;
module.exports = mongoose.model('Prescription', PrescriptionSchema);
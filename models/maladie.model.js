const mongoose = require('mongoose');
const Prescription = require('./prescription.model');
const MaladieSchema = new mongoose.Schema({
    name: { type: String },
    prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription', autopopulate: true }
});
MaladieSchema.plugin(require('mongoose-autopopulate'));
module.exports = Maladie = mongoose.model('Maladie', MaladieSchema);
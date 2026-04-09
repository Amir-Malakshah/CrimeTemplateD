const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SignalementSchema = new Schema({
    titre: String,
    description: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateSignalement:{
        type: Date,
        default: new Date()
    },
    image: String
});
const Signalement = mongoose.model('Signalement',SignalementSchema);
module.exports = Signalement
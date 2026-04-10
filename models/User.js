const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,"Entrez un nom d'utilisateur"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"Entrez un mot de passe"]
    },
    userid: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}
});
UserSchema.plugin(uniqueValidator, { message: "Le nomd'utilisateur doit etre unique" });

UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})
const User = mongoose.model('User',UserSchema);
module.exports = User

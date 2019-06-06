var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var validator = require('validator')

var User = new Schema({
    email: {
        type: String, unique: true, require: true,
        validate: validator.isEmail, message: 'Invalid email.'
    },
    password: { type: String, require: true },
    facebook: {
        id: Number,
        name: String,
        token: String
    }

});

User.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
        user.password = hash;
        return next();
    });
});

User.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, res) {
        if (err) return err;
        cb(null, res);
    })
}

module.exports = mongoose.model('User', User);
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

User.statics.findOrCreate = function (profile, cb) {
    let that = this;
    that.findOne({ 'facebook.id': profile.id }, function (err, user) {
        if (err) return cb(err, null);

        else if (!user) {
            that.create({ facebook: { id: profile.id }, name: profile.displayName }), function (err, createdUser) {
                if (err) return cb(err, null);
                return cb(null, user);

                console.log(createdUser);
                return cb(null, createdUser)
            }

        }

        else {
            return cb(null, createdUser);

        }
    })


}

module.exports = mongoose.model('User', User);
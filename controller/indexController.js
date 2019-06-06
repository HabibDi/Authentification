var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports.home = function (req, res) {
    console.log('Scooter, écouteur');
    res.render('index.ejs', {})
};

module.exports.login = function (req, res) {
    if (req.method !== 'POST')
        res.render('login.ejs', {});
    else {
        if (req.body.email && req.body.password) {
            User.find()
        }
        else {
            res.render('login.ejs', { error: err })

        }
    };


    module.exports.signup = function (req, res) {
        if (req.method !== 'POST')
            res.render('signup.ejs', {});
        else {
            if (req.body.password === req.body.passwordConfirm) {
                User.create({ email: req.body.email, password: req.body.password }, function (err) {
                    if (err) res.render('signup.ejs', { error: "Belek au guetteur" });
                    else {
                        res.redirect('/login')
                    }
                })
            }

            else
                res.render('signup.ejs', { error: "Le mot de passe ne correspond pas" })
        }
    };

}

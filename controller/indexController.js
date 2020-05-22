var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports.home = function (req, res) {
    console.log('Scooter, écouteur');
    res.render('index.ejs', {})
};

module.exports.login = function (req, res) {
    if (req.method !== 'POST') {
        res.render('login.ejs', {});
    }

    else {
        if (req.body.email && req.body.password) {
            User.find({ email: req.body.email }, function (err, user) {
                if (err) res.render('login.ejs', { error: err })
                else if (typeof user[0] == 'undefined') res.render('login.ejs', { error: "Utilisateur introuvable" });


                else {
                    bcrypt.compare(req.body.password, user[0].password).then(function (response) {
                        if (response) {
                            req.session.user = user;
                            res.redirect('/');
                        }
                        else {
                            res.render('login.ejs', { error: 'Le mot de passe est incorrect' })
                        };
                    });
                }
            });
        }

        else
            res.render('login.ejs', { error: "Veuillez indiquer votre email et votre mot de passe" });



    };


    module.exports.signup = function (req, res) {
        if (req.method !== 'POST') res.render('signup.ejs', {});

        else {
            if (req.body.password === req.body.passwordConfirm) {
                User.create({ email: req.body.email, password: req.body.password }, function (err, user) {
                    if (err) res.render('signup.ejs', { error: err });
                    else {
                        res.redirect('/login')
                    }
                });
            }

            else
                res.render('signup.ejs', { error: "Le mot de passe ne correspond pas" })
        }
    };

};

module.exports.logout = function (req, res) {
    if (req.session.user) req.session.user.destroy();
    return res.redirect('/login');
};
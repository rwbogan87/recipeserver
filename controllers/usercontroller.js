const router = require('express').Router();
// user model is being imported to link to this controller; this allows us to apply req.body (user input) to the user model names
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//successfully creates new user
router.post('/create', function (req, res) {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 13)
    }).then(
        function createSuccess(user) {

            // token created that is passed as sessionToken, which is needed to access anything requiring a token inside the app (recipes)
           var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: 'New Chef (user) Created!',
                sessionToken: token
            });
        },

        function createError(err) {
            res.send(500, err.message);
        },

    );
});

//successfully logs in user
router.post('/login', (req, res) => {
    User.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        if(user) {
            // bcrypt actually carries and encrypts the password so it can't be interfered or translated until it hits the database to be compared for a match
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {expiresIn: 60*60*24})

                    res.json({
                        user: user,
                        message: 'User is primed and ready to cook! (Authenticated)',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ error: 'Request Denied: Invalid Password'})
                }
            })
        } else {
            res.status(500).send({ error: 'Request Failed: User Does Not Exist' })
        }
    }, err => res.status(501).send( {error: 'Request Failed: Unknown'}))
})

module.exports = router;
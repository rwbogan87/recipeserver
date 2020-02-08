require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');
const user = require('./controllers/usercontroller');
const recipes = require('./controllers/recipecontroller')

//Test route
app.use('/postman', function(req, res){
    res.send('hey postman is working on the server');
});

// sequelize.sync();
sequelize.sync({force: true});

app.use(express.json());
app.use(require('./middleware/headers.js'));

// we want access to user since that is where new users are created; therefore validate session needs to be used AFTER user, but BEFORE recipes so access to them requires use of the validation.  Validate session checks for that token to see if it matches the encrypted data in the database, and doesn't allow you to proceed unless it matches.
app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.use('/recipe', recipes)

app.listen(process.env.PORT, () => console.log(`app listening on ${process.env.PORT}`));

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

sequelize.sync();
// sequelize.sync({force: true});

app.use(express.json());
app.use(require('./middleware/headers.js'));

app.use('/user', user);
app.use('/recipe', recipes)

app.listen(process.env.PORT, () => console.log(`app listening on ${process.env.PORT}`));

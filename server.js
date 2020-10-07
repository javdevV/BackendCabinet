const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config({
    path: './config/index.env'
});
app.set('view engine', 'jade');
app.use(express.static('public/apidoc'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');


app.use(bodyParser.json());

//MongoDB
const connectDB = require('./config/db');
// connectDB();

app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

//routes
app.get('/', function(req, res) {
    res.render('public/apidoc/index.html');
});
app.use('/forgot', require('./routes/forgot.route'));
app.use('/api/user', require('./routes/auth.route'));


app.use((req, res) => {
    res.redirect('/');
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`[*] Listening on port ${PORT}`);
})
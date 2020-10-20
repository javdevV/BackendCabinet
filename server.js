var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

require('dotenv').config({
    path: './config/index.env'
});
app.set('view engine', 'jade');
app.use(express.static('public/apidoc'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');

app.use(express.json());

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

app.use(require('./api/routes/patient.route'));
app.use(require('./api/routes/appointment.route'));
app.use(require('./api/routes/prescription.route'));
app.use(require('./api/routes/maladie.route'));

app.use('/forgot', require('./api/routes/forgot.route'));
app.use('/api/user', require('./api/routes/auth.route'));
app.use(require('./api/routes/role.route'));

app.use((req, res) => {
    res.redirect('/');
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`[*] Listening on port ${PORT}`);
})
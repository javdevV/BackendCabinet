const exrpress = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = exrpress();
require('dotenv').config({
    path: './config/index.env'
});
app.set('view engine', 'jade');
app.use(exrpress.static('public'));


app.use(bodyParser.json());

//MongoDB
const connectDB = require('./config/db');
connectDB();
app.use('/forgot', require('./routes/forgot.route'));

// app.use(exrpress.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/api/user', require('./routes/auth.route'));

app.get('/', (req, res) => {
    res.send('test route => home page');
});
app.get('/api/doc', (req, res) => {
    res.render('/apidoc/index.html');
    // res.sendFile(__dirname + './apidoc/index.html');
    // res.sendFile('../apidoc/index.html', { root: __dirname });

})

app.use((req, res) => {
    res.status(404).json({
        msg: 'Page Not Founded'
    })
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
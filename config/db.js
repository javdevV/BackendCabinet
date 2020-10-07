var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`[**] Connected to Database.`);
    })
    .catch(err => {
        console.log(`[**] Error while connecting to DB, with error: ${err}`);
    });
var conn = mongoose.connection;


module.exports = {
    conn: conn,
};
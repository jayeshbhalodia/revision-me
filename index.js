//
process.env.tz = 'Asia/Kolkata';
process.env.TZ = 'Asia/Kolkata';

var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    dateUtils = require('date-utils'),
    app = express();


//
mongoose.connect('mongodb://localhost/revision-me');


// Setting View
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', process.cwd() + '/app/views');

// Setup static access folder
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());




//
require('./app/models/default');

//
var route = require('./app/routes/route');

//
route.init(app);


//
app.listen(3030, function () {
  console.log('Ready port http://localhost:3030');
});





// console.log('getReminderTime >>>', new Date(getReminderTime('1')).toFormat('YYYY MM DD HH24:MI:SS' ));
// console.log('getReminderTime >>>', new Date(getReminderTime('2')).toFormat('YYYY MM DD HH24:MI:SS' ));
// console.log('getReminderTime >>>', new Date(getReminderTime('3')).toFormat('YYYY MM DD HH24:MI:SS' ));
// console.log('getReminderTime >>>', new Date(getReminderTime('4')).toFormat('YYYY MM DD HH24:MI:SS' ));
// console.log('getReminderTime >>>', new Date(getReminderTime('5')).toFormat('YYYY MM DD HH24:MI:SS' ));
// console.log('getReminderTime >>>', new Date(getReminderTime('6')).toFormat('YYYY MM DD HH24:MI:SS' ));
// console.log('getReminderTime >>>', new Date(getReminderTime('7')).toFormat('YYYY MM DD HH24:MI:SS' ));
// console.log('getReminderTime >>>', new Date(getReminderTime('8')).toFormat('YYYY MM DD HH24:MI:SS' ));
// console.log('getReminderTime >>>', new Date(getReminderTime('9')).toFormat('YYYY MM DD HH24:MI:SS' ));
// console.log('getReminderTime >>>', new Date(getReminderTime('10')).toFormat('YYYY MM DD HH24:MI:SS' ));
// console.log('getReminderTime >>>', new Date(getReminderTime('11')).toFormat('YYYY MM DD HH24:MI:SS' ));
// console.log('getReminderTime >>>', new Date(getReminderTime('12')).toFormat('YYYY MM DD HH24:MI:SS' ));

var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express();



// Setting View
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', process.cwd() + '/views');

// Setup static access folder
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//
// app.use(function(req, res, next) {
//
//     console.log("1");
//
//
//     next();
// });
//
//
// app.use(function(req, res, next) {
//
//     console.log("2");
//
//     res.send('123');
//
//     // next();
// });
//
//
// app.use(function(req, res, next) {
//
//     console.log("3");
//
//     next();
// });
//
// //
// app.use(require('connect').bodyParser());
// app.use(express.bodyParser());







//

mongoose.connect('mongodb://localhost/revision-me');
var Schema = mongoose.Schema;

//
var learningPoints = new Schema({
    title:  String,
    description: String
});


//
mongoose.model('learningPoints', learningPoints);




//
app.get('/', function (req, res) {
    res.render('angular-layout.html',{
        layout: false,
        title: 'Revision Me - Home'
    });
});



//
app.post('/api/v1/learning-points/create', function(req, res) {
    //
    var learningPointsModel = mongoose.model('learningPoints');
    var learningPointForm = new learningPointsModel(req.body);

    //
    learningPointForm.save(function(err, data) {
        res.json({
            status: true,
            data: data
        });
    })
});


//
app.post('/api/v1/learning-points/get', function(req, res) {
    var learningPointsModel = mongoose.model('learningPoints');
    learningPointsModel.find({}).exec(function(err, data) {
        res.json(data);
    });
});


//
app.listen(process.env.PORT || 3000, function () {
  console.log('Ready');
});

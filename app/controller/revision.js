var mongoose = require('mongoose');
var service = require('./../services/revision');

/**
 *
 */
exports.home = function (req, res) {
    res.render('angular-layout.html',{
        layout: false,
        title: 'Revision Me - Home'
    });
};



//
exports.create = function(req, res) {
    //
    var learningPointsModel = mongoose.model('learning_points');
    var reminderModel = mongoose.model('reminders');

    //
    req.body._id = new mongoose.Types.ObjectId();
    
    //
    req.body.timestamp = new Date().getTime();

    //
    var learningPointForm = new learningPointsModel(req.body);

    //
    learningPointForm.save(function(err, data) {

        var reminderForm = new reminderModel({
        	_id: new mongoose.Types.ObjectId(),
            learningPoint: data._id,
            status: 1,
            setupDate: new Date().getTime(),
            revisionDate: service.getReminderTime(req.body.reminderType)
        });

        reminderForm.save(function(err, reminderData) {

            res.json({
                status: true,
                data: data
            });
        })
    })
};


//
//
//
exports.getData = function(req, res) {

    var learningPointsModel = mongoose.model('learning_points');
    var reminderModel = mongoose.model('reminders');


    //
    service.getTodayRevisionTasks(function(todayRevisions) {
        learningPointsModel.find({}).exec(function(err, data) {
            res.json({
                learningPoints: data,
                todayRevisions: todayRevisions,
            });
        });
    });    
};



//
exports.update = function(req, res) {
    var learningPointsModel = mongoose.model('learning_points');

    learningPointsModel.update({
        '_id': req.params.id
    }, {

        title: req.body.title,
        description: req.body.description

    }).exec(function(err, result) {
        if (err) {
            res.json({
                status: false
            });
            return;
        }

        res.json({
            status: true,
            data: result
        });
        return;
    });
};


//
exports.remove =  function(req, res) {
    var learningPointsModel = mongoose.model('learning_points');

    learningPointsModel.remove({
        _id: req.params.id
    }).remove(function(err, data) {
        res.json({
            err: err,
            data: data,
            token: req.params.id
        });
    });

};


//
exports.reminderUpdte =  function(req, res) {
    var learningPointsModel = mongoose.model('learning_points');
    var reminderModel = mongoose.model('reminders');

    reminderModel.update({
        '_id': req.params.id
    }, {
        status: 2 
    }).exec(function(err, result) {
        if (err) {
            res.json({
                status: false
            });
            return;
        }

        var reminderForm = new reminderModel({
            _id: new mongoose.Types.ObjectId(),
            learningPoint: req.body.learningPoint._id,
            status: 1,
            setupDate: new Date().getTime(),
            revisionDate: service.getReminderTime(req.body.learningPoint.reminderType)
        });

        reminderForm.save(function(err, reminderData) {

            res.json({
                status: true,
                data: result
            });
        });
    });
};




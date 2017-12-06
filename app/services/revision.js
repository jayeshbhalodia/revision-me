var mongoose = require('mongoose');
var dateUtils = require('date-utils');


/**
 *
 */
exports.getReminderTime = function(key) {

    var today = new Date();
        today.clearTime();
        

    switch(key) {

        // Daily
        case '1':
            today.addDays(1);
            return today.getTime();
            break;

        // One Day
        case '2':
            today.addDays(2);
            return today.getTime();
            break;

        // Two Day
        case '3':
            today.addDays(3);
            return today.getTime();
            break;

        // Three Day
        case '4':
            today.addDays(4);
            return today.getTime();
            break;

        // Weekly Day
        case '5':
            today.addDays(8);
            return today.getTime();
            break;

        // Ten Day
        case '6':
            today.addDays(11);
            return today.getTime();
            break;

        // Fifteen Day
        case '7':
            today.addDays(16);
            return today.getTime();
            break;

        // Twenty Day
        case '8':
            today.addDays(21);
            return today.getTime();
            break;  

        // Monthly
        case '9':
            today.addMonths(1);
            return today.getTime();
            break;

        // Two Months
        case '10':
            today.addMonths(2);
            return today.getTime();
            break;

        // Three Months
        case '11':
            today.addMonths(3);
            return today.getTime();
            break;

        // Six Months
        case '12':
            today.addMonths(6);
            return today.getTime();
            break;
    }
}




/**
 *
 */
exports.getTodayRevisionTasks = function(callback) {

    //
    var learningPointsModel = mongoose.model('learning_points');
    var reminderModel = mongoose.model('reminders');
    var todayTimeStamp = new Date();

    //
    todayTimeStamp.clearTime();

    //
    reminderModel.find({
        status: 1,
        revisionDate: todayTimeStamp.getTime()
    })
    .populate('learningPoint')
    .exec(function(e, data) {
        callback(data);
    });
}
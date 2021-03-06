//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//
var learningPoints = new Schema({
	_id: Schema.Types.ObjectId,
    title:  String,
    description: String,
    codes: [],
    reminderType: Number,
  	reminders: [{ type: Schema.Types.ObjectId, ref: 'reminders' }],
    timestamp: Number,
	tags: Array,
});


//
var reminder = new Schema({
	_id: Schema.Types.ObjectId,
    learningPoint:  {
    	type: Schema.Types.ObjectId,
    	ref: 'learning_points' 
    },
    status: Number,
    setupDate: Number,
    revisionDate: Number,
	reminderType: {
		type: String,
		default: '1'
	}
});


//
mongoose.model('learning_points', learningPoints);
mongoose.model('reminders', reminder);


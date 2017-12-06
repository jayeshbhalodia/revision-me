var ctrl = require('./../controller/revision');


/**
 *
 */
exports.init = function(app) {



	//
	app.get('/', ctrl.home);

	//
	app.post('/api/v1/learning-points/create', ctrl.create);

	//
	app.post('/api/v1/learning-points/get', ctrl.getData);

	//
	app.post('/api/v1/learning-points/:id/update', ctrl.update);

	//
	app.post('/api/v1/:id/remove', ctrl.remove);


	//
	app.post('/api/v1/reminder/:id/update', ctrl.reminderUpdte);

}
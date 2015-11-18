var FinanceConstants = require('../constants/finances-constants.js');
var Dispatcher = require('../dispatchers/app.dispatcher.js');

var ActionTypes = FinanceConstants.ActionTypes;

var FinanceActions = {

	dataLoaded: function(data){
		
		Dispatcher.dispatch({
			type: ActionTypes.ADD_FINANCE,
			data: data
		});
	}
};

module.exports = FinanceActions;
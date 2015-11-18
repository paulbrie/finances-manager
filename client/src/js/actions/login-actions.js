var LoginConstants = require('../constants/login-constants.js');
	AppDispatcher = require('../dispatchers/app.dispatcher');

var ActionTypes = LoginConstants.ActionTypes;

var LoginActions = {
	loginUser: function(user){
		AppDispatcher.dispatch({
			type: ActionTypes.LOGIN_USER,
			user: user
		});
	},
};

module.exports=LoginActions;
	


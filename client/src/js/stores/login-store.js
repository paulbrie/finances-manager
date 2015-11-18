var LoginConstants = require('../constants/login-constants.js');
	AppDispatcher = require('../dispatchers/app.dispatcher');
	LoginActions = require('../actions/login-actions.js');
	LoginForm = require('../components/Login/LoginForm.js')
	assign = require('react/lib/Object.assign');
	EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var mockUsersList = [
    {
        username: 'Diana',
        password: '123'
    },
    {
        username: 'Alexandra',
        password: '123'
    },
    {
        username: 'Mihai',
        password: '123'
    }
];

function _addUser(user) {
	mockUsersList.push({
		id: mockUsersList.length,
		username: user.username,
		password: user.password
	});
	console.log(mockUsersList);
};

var LoginStore = assign({}, EventEmitter.prototype, {
	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback)
	},
	getMockData: function() {
        return mockUsersList;
    }
});


LoginStore.dispatchToken = AppDispatcher.register(function(action) {
	switch(action.type) {
		case LoginConstants.ActionTypes.LOGIN_USER:
			_addUser(action.user);
			LoginStore.emitChange();
			break;
		default:
			break;
	}
});

// AppDispather.register(function(payload) {
// 	var action = payload.action;
// 	switch(action.actionType) {
// 		case LoginConstants.LOGIN_USER:
// 			we get the jwt from the action and save it locally
// 			this._jwt = action.jwt;
// 			we decode it to get the user information
// 			this._username = jwt_decode(this._jwt); 
// 			we emit a change to all components that are listening
// 			this.emitChange();
// 			break;
// 		default:
// 			break;
// 	};
// }

module.exports=LoginStore;
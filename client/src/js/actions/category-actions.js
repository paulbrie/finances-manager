/**
 * Created by alinaoros on 11/16/2015.
 */

 var CategoryConstants = require('../constants/category-constants.js');
 var Dispatcher = require('../dispatchers/app.dispatcher.js');

 var ActionTypes = CategoryConstants.ActionTypes;

 var CategoryAction = {

 	addCategory: function(data) {

 		Dispatcher.dispatch({
 			type: ActionTypes.ADD_CATEGORY,
 			data: data
 		});
 	}
 };

 module.exports = CategoryAction;

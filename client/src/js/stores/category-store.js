/**
 * Created by alinaoros on 11/16/2015.
 */

var Dispatcher = require('../dispatchers/app.dispatcher.js'),
	EventEmitter = require('events').EventEmitter,
    assign = require('react/lib/Object.assign'),
    CategoryConstants = require('../constants/category-constants.js');

var CHANGE_EVENT = 'change';

var mockCategoryList = [{
    nr: 1,
    category: 'food',
    type: 'Expense'
}, {
    nr: 2,
    category: 'meal',
    type: 'Expense'

}, {
    nr: 3,
    category: 'food',
   type:  'Income'
}, {
    nr: 4,
    category: 'food',
    type: 'Income'
}, {
    nr: 5,
    category: 'food',
    type: 'Expense'
}];

function _addCategory(data) {

	mockCategoryList.push({
		category: data.category,
		type: data.type
	});

	console.log('store: ' + data);
}

var CategoryStore = assign({}, EventEmitter.prototype, {

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getCategories: function() {
		return mockCategoryList;
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	}
});

CategoryStore.dispatchToken = Dispatcher.register(function(action) {

	switch(action.type) {
		case CategoryConstants.ActionTypes.ADD_CATEGORY:
			_addCategory(action.data);
			CategoryStore.emitChange();
			break;
	}
});

module.exports - CategoryStore;
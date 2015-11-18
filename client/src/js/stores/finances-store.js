var AppDispatcher = require('../dispatchers/app.dispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('react/lib/Object.assign'),
    FinanceConstants = require('../constants/finances-constants.js');

var CHANGE_EVENT = 'change';

var mockFinancesList = [{
    nr: 1,
    date: '12/12/1010',
    description: 'fooood',
    category: 'food',
    debit: '-',
    credit: 100
}, {
    nr: 2,
    date: '12/12/1010',
    description: 'cd',
    category: 'meal',
    debit: '-',
    credit: 100
}, {
    nr: 3,
    date: '12/12/1010',
    description: 'ceds',
    category: 'food',
    debit: 200,
    credit: '-'
}, {
    nr: 4,
    date: '12/12/1010',
    description: 'ceds',
    category: 'food',
    debit: 1020,
    credit: '-'
}, {
    nr: 5,
    date: '12/12/1010',
    description: 'ceds',
    category: 'food',
    debit: '-',
    credit: 560
}];

function _addItem(finance){

	var debit, credit;
	
	if(finance.type === '+'){

		debit = finance.sum;
		credit = '-';
	}
	else{
		credit = finance.sum;
		debit = '-';
	}
	mockFinancesList.push({
		nr: mockFinancesList.length + 1,
		date: finance.date,
		description: finance.description,
		category: finance.category,
		debit: debit,
		credit: credit
	});
}

var FinanceStore = assign({}, EventEmitter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getData: function() {
        return mockFinancesList;
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.on(CHANGE_EVENT,callback)
    }
});


FinanceStore.dispatchToken = AppDispatcher.register(function(action){

    switch(action.type){
       case FinanceConstants.ActionTypes.ADD_FINANCE:
           _addItem(action.data);
           FinanceStore.emitChange();
           break;
       default:
    }

});


module.exports = FinanceStore;
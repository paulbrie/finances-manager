var React  = require("react");
var CheckBox = require('../../Common/checkBox.js');
var FinanceStore = require('../../../stores/finances-store.js');

var IncomeRow  = React.createClass({

	getInitialState: function (){
		return {
			expense:{
	      nr: 222,
	      date: '12/12/1010',
	      description: 'ceds',
	      category: 'food',
	      debit: 300,
	      credit: '-'
			}
		}
	},

	// componentWillMount: function(){
 //    FinanceStore.addChangeListener(this._onChange)
 //  },

	render: function(){
		var currentExpense = this.state.expense;
		return(
			<table>
        <tbody>
      	  <tr>
	          <td contentEditable="true">{currentExpense.nr}</td>
	          <td contentEditable="true">{currentExpense.date}</td>
	          <td contentEditable="true">{currentExpense.description}</td>
	          <td contentEditable="true">{currentExpense.category}</td>
	          <td contentEditable="true">{currentExpense.debit}</td>
	          <td contentEditable="false">{currentExpense.credit}</td>
	          <td><CheckBox /></td>
      		</tr>
        </tbody>
      </table>
		);
	}
});
module.exports = IncomeRow;
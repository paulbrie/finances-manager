/**
 * Created by alinaoros on 11/4/2015.
 */
var React = require('react');
var CategoryAction = require('../../actions/category-actions.js');
var CategoryStore = require('../../stores/category-store.js');

var AddCategory = React.createClass({

    getInitialState: function() {
        return {
            category: '',
            type: 'Expense'
        };
    },

    handleCategory: function(event) {
        this.setState({category: event.target.value});
    },

    handleType: function(event) {
        this.setState({type: event.target.value});
    },

    handleDates: function() {
        var newCategory = {
            category: this.state.category,
            type: this.state.type
        }
        
        CategoryAction.addCategory(newCategory);
        console.log(newCategory);
    },

    render: function(){
        return (
            <div>
	            <form>
	                <br/>
	                <input className="form-control" value={this.state.category} onChange={this.handleCategory} placeholder="Add a new Category"  />
	                <br/>
	                <select className="form-control" value={this.state.type} onChange={this.handleType}>
	                    <option>Expense</option>
	                    <option selected>Income</option>
	                </select>
	                <br/>
	            </form>
	            <button className="btn btn-primary col-lg-3" onClick={this.handleDates}>save</button>

            </div>
        );
    }
});

module.exports = AddCategory;

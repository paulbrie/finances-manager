var React = require('react');
var Modal = require('react-modal');
var SidebarBox = require('../../components/Sidebar/sidebarBox.js'),
	Header = require('../../components/Header/header.js');
	//CategoryPop = require('../../components/Popup/addCategory.js');
const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)'
	}
};

var Categories = React.createClass({
	getInitialState: function() {
		return {
			modalIsOpen: false,
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

		console.log(newCategory);
	},
	openModal: function() {
		this.setState({modalIsOpen: true});
	},

	closeModal: function() {
		this.setState({modalIsOpen: false});
	},

	render: function() {
		return (
			<div>
				<button onClick={this.openModal}>Open Modal</button>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					style={customStyles}>

					<h2>Add a new category</h2>
					<form>
                        <br/>
						<input className="form-control" value={this.state.category} onChange={this.handleCategory} placeholder="Add a new Category"  />
						<br/>
						<select className="form-control" value={this.state.type} onChange={this.handleType}>
							<option>Expense</option>
							<option>Income</option>
						</select>
						<br/>
					</form>
					<button className="btn btn-danger col-lg-3" onClick={this.closeModal}>close</button>
					<button className="btn btn-primary col-lg-3" onClick={this.handleDates}>save</button>

				</Modal>
			</div>
		);
	}

});

module.exports = Categories;

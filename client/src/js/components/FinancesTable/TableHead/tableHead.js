var React = require('react');
	
var TableHead = React.createClass({
 
	render: function(){
		return (
				<form action='#' method='post'>
					<thead>
						<tr>
							<th>Nr. crt</th>
							<th>Date</th>
							<th>Desciption</th>
							<th>Category</th>
							<th>Debit</th>
							<th>Credit</th>
							<th>
								<button className="btn btn-default btn-sm all-space">
									<i className="glyphicon glyphicon-trash"></i> <strong>Delete</strong>
								</button>
							</th>
						</tr>
					</thead>
				</form>
		);
	}
});

module.exports = TableHead;
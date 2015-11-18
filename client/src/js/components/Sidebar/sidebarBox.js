var React = require('react');
var Link = require('react-router').Link;

var SidebarBox = React.createClass({

	render: function(){
		return (
			
			<div id="sidebar-wrapper">
	            <ul className="sidebar-nav">
	                <li className="sidebar-brand">
	                    <Link to="dashboard">
	                        Expenses Manager
	                    </Link>
	                </li>
	                <li>
	                    <Link to="categories">Categories</Link>
	                </li>
	                <li>
	                   <Link to="calendar">Calendar</Link>
	                </li>
	                <li>
	                    <Link to="balance">Balance</Link>
	                </li>
	            </ul>
        	</div>	
		);
	}
});

module.exports = SidebarBox;


    
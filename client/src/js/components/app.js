//here will reside the main component that will include all others

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;	

var App = React.createClass({
	render: function(){
    return (

    	<div id="wrapper">
       		<RouteHandler/>
       </div>
    );
  }
});

module.exports = App;

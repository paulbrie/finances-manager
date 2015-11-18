/**
 * Created by alinaoros on 11/4/2015.
 */
var React = require('react');
var Modal = require('react-modal');
var AddCategory = require('../ModalContent/addCategory.js');

var Header = React.createClass({

    render: function(){
        return (
            <div>
	            <AddCategory />
            </div>
        );
    }
});

module.exports = Header;

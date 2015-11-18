/**
 * Created by crisanalexandra on 11/16/2015.
 */

var React = require('react');

var CheckBox = React.createClass({

    render: function() {
        return(
            <input type="checkbox" name="checkbox" value="finance-checkbox"/>
        );
    }
});

module.exports = CheckBox;
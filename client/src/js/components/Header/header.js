/**
 * Created by alinaoros on 11/4/2015.
 */
var React = require('react');
var Link = require('react-router').Link;
var Modal = require('react-modal');
var ModalContent = require('../ModalContent/modalContent.js');

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

var Header = React.createClass({

    getInitialState: function() {
        return {
            modalIsOpen: false,
            category: '',
            type: 'Expense'
        };
    },

    openModal: function() {
        this.setState({modalIsOpen: true});
    },

    closeModal: function() {
        this.setState({modalIsOpen: false});
    },

    render: function(){
        return (
            <div>
                <div className="header-component ">
                    <button className="header-component right addCategory" onClick={this.openModal}>Category</button>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}>

                    <h2>Category Manager</h2>

                    <ModalContent />

                    <button className="btn btn-danger col-lg-3" onClick={this.closeModal}>close</button>

                </Modal>
            </div>
        );
    }
});

module.exports = Header;



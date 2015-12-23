'use strict';
const React = require('react');
const NavBar = require('./navbar');
const Footer = require('./footer');


const propTypes = {
    children: React.PropTypes.node
};


class Component extends React.Component {
    render() {

        return (
            <div>
                <NavBar />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

Component.propTypes = propTypes;


module.exports = Component;

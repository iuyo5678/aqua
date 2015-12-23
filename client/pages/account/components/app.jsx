'use strict';
const React = require('react');
const NavBar = require('./navbar.jsx');
const Footer = require('./footer.jsx');


const propTypes = {
    children: React.PropTypes.node,
    location: React.PropTypes.object
};


class Component extends React.Component {
    render() {

        return (
            <div>
                <NavBar location={this.props.location} />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

Component.propTypes = propTypes;


module.exports = Component;

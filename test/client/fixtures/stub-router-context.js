'use strict';
const ObjectAssign = require('object-assign');
const React = require('react');


const StubRouterContext = function (Component, stubs) {

    const RouterStub = function RouterStub() {};

    ObjectAssign(RouterStub, {
        history: {
            createHref: function () {}
        },
        location: {
            pathname: ''
        }
    }, stubs);

    return React.createClass({
        displayName: 'Component',
        childContextTypes: {
            history: React.PropTypes.object,
            location: React.PropTypes.object
        },
        getChildContext: function () {

            return {
                history: RouterStub.history,
                location: RouterStub.location
            };
        },
        render: function () {

            return React.createElement(Component, this.props);
        }
    });
};


module.exports = StubRouterContext;

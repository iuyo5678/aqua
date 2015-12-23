'use strict';
const React = require('react');
const ReactRouter = require('react-router');


module.exports = {
    AppHandler: React.createClass({
        displayName: 'Component',
        render: function () {

            return React.createElement(ReactRouter.RouteHandler);
        }
    }),
    StubHandler: React.createClass({
        displayName: 'Component',
        render: function () {

            return React.createElement('div', {});
        }
    })
};

'use strict';
const Forgot = require('./components/forgot.jsx');
const Home = require('./components/home.jsx');
const Logout = require('./components/logout.jsx');
const NotFound = require('./components/not-found.jsx');
const React = require('react');
const ReactRouter = require('react-router');
const Reset = require('./components/reset.jsx');


const Route = ReactRouter.Route;
const Router = ReactRouter.Router;
const browserHistory = ReactRouter.browserHistory;


const Routes = (
    <Router history={browserHistory}>
        <Route path="/login" component={Home} />
        <Route path="/login/forgot" component={Forgot} />
        <Route path="/login/reset/:email/:key" component={Reset} />
        <Route path="/login/logout" component={Logout} />
        <Route path="*" component={NotFound} />
    </Router>
);


module.exports = Routes;

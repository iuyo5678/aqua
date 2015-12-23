'use strict';
const App = require('./components/app.jsx');
const Home = require('./components/home.jsx');
const NotFound = require('./components/not-found.jsx');
const React = require('react');
const ReactRouter = require('react-router');
const Settings = require('./components/settings/index.jsx');


const IndexRoute = ReactRouter.IndexRoute;
const Route = ReactRouter.Route;
const Router = ReactRouter.Router;
const browserHistory = ReactRouter.browserHistory;


const Routes = (
    <Router history={browserHistory}>
        <Route path="/account" component={App}>
            <IndexRoute component={Home} />
            <Route path="settings" component={Settings} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);


module.exports = Routes;

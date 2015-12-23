'use strict';
const App = require('../../../../../client/pages/admin/components/app');
const Code = require('code');
const Lab = require('lab');
const React = require('react');
const ReactRouter = require('react-router');
const RouteHelpers = require('../../../fixtures/RouteHelpers');


const lab = exports.lab = Lab.script();
const TestUtils = React.addons.TestUtils;
const Route = ReactRouter.Route;
const DefaultRoute = ReactRouter.DefaultRoute;
const Routes = React.createElement(Route,
    { path: '/admin', name: 'app', handler: App },
    React.createElement(DefaultRoute, {
        name: 'home', handler: RouteHelpers.StubHandler
    }),
    React.createElement(Route, {
        path: 'accounts', name: 'accounts', handler: RouteHelpers.StubHandler
    }),
    React.createElement(Route, {
        path: 'admins', name: 'admins', handler: RouteHelpers.StubHandler
    }),
    React.createElement(Route, {
        path: 'admin-groups', name: 'adminGroups', handler: RouteHelpers.StubHandler
    }),
    React.createElement(Route, {
        path: 'statuses', name: 'statuses', handler: RouteHelpers.StubHandler
    }),
    React.createElement(Route, {
        path: 'users', name: 'users', handler: RouteHelpers.StubHandler
    })
);


lab.experiment('Admin App Component', () => {

    lab.test('it renders', (done) => {

        ReactRouter.run(Routes, '/admin', (Handler) => {

            const HandlerEl = React.createElement(Handler, {});
            const mainElement = TestUtils.renderIntoDocument(HandlerEl);

            Code.expect(mainElement).to.exist();
            done();
        });
    });
});

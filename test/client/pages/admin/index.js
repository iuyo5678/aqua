'use strict';
const Code = require('code');
const Lab = require('lab');
const Proxyquire = require('proxyquire');
const ReactDOM = require('react-dom');
const RouterTestLocation = require('react-router/lib/locations/TestLocation');


const TestLocation = new RouterTestLocation();
const lab = exports.lab = Lab.script();
const stub = {
    ReturnUrlActions: {
        saveReturnUrl: function () {}
    },
    ReactRouter: {
        HistoryLocation: TestLocation
    }
};
const App = Proxyquire('../../../../client/pages/admin/index.jsx', {
    '../../actions/return-url': stub.ReturnUrlActions,
    'react-router': stub.ReactRouter
});
let mountNode;


lab.beforeEach((done) => {

    TestLocation.history = ['/admin'];
    done();
});


lab.before((done) => {

    mountNode = global.document.createElement('div');
    mountNode.id = 'app-mount';
    global.document.body.appendChild(mountNode);

    done();
});


lab.after((done) => {

    ReactDOM.unmountComponentAtNode(mountNode);
    global.document.body.removeChild(mountNode);
    delete global.window.app;

    done();
});


lab.experiment('Admin App', () => {

    lab.test('it renders', (done) => {

        App.blastoff();

        Code.expect(App.mainElement).to.be.an.object();
        done();
    });
});

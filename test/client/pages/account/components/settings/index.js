'use strict';
const Code = require('code');
const Lab = require('lab');
const Proxyquire = require('proxyquire');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-addons-test-utils');
const Store = require('../../../../../../client/pages/account/store/index');


const lab = exports.lab = Lab.script();
const stub = {
    Actions: {
        getAccountSettings: () => {},
        getUserSettings: () => {}
    }
};
const Component = Proxyquire('../../../../../../client/pages/account/components/settings/index.jsx', {
    '../../actions': stub.Actions
});


lab.experiment('Account Home Component', () => {

    lab.test('it renders', (done) => {

        const ComponentEl = React.createElement(Component, {});
        const component = ReactTestUtils.renderIntoDocument(ComponentEl);

        Code.expect(component).to.exist();

        done();
    });


    lab.test('it handles unmounting', (done) => {

        const container = global.document.createElement('div');
        const ComponentEl = React.createElement(Component, {});

        ReactDOM.render(ComponentEl, container);
        ReactDOM.unmountComponentAtNode(container);

        done();
    });


    lab.test('it handles a store change', (done) => {

        const ComponentEl = React.createElement(Component, {});
        const component = ReactTestUtils.renderIntoDocument(ComponentEl);

        Store.dispatch({
            type: 'unknown'
        });

        Code.expect(component).to.exist();

        done();
    });
});

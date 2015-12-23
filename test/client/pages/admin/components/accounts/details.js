'use strict';
const Code = require('code');
const Lab = require('lab');
const Proxyquire = require('proxyquire');
const React = require('react');
const StubRouterContext = require('../../../../fixtures/StubRouterContext');


const lab = exports.lab = Lab.script();
const TestUtils = React.addons.TestUtils;
const stub = {
    Actions: {
        getDetails: function () {}
    },
    StatusActions: {
        getResults: function () {}
    },
    AccountStore: {},
    StatusStore: {}
};
const Details = Proxyquire('../../../../../../client/pages/admin/components/accounts/details', {
    '../../actions/account': stub.Actions,
    '../../actions/status': stub.StatusActions,
    '../../stores/account': stub.AccountStore,
    '../../stores/status': stub.StatusStore
});


lab.experiment('Admin Account Details', () => {

    lab.test('it renders', (done) => {

        const ComponentWithContext = StubRouterContext(Details, {});
        const DetailsEl = React.createElement(ComponentWithContext, {});
        const details = TestUtils.renderIntoDocument(DetailsEl);

        Code.expect(details).to.exist();
        done();
    });


    lab.test('it handles unmounting', (done) => {

        const container = global.document.createElement('div');
        const ComponentWithContext = StubRouterContext(Details, {});
        const DetailsEl = React.createElement(ComponentWithContext, {});

        ReactDOM.render(DetailsEl, container);
        ReactDOM.unmountComponentAtNode(container);

        done();
    });


    lab.test('it handles a store change', (done) => {

        const ComponentWithContext = StubRouterContext(Details, {});
        const DetailsEl = React.createElement(ComponentWithContext, {});

        TestUtils.renderIntoDocument(DetailsEl);
        stub.AccountStore.emitChange();

        done();
    });


    lab.test('it handles a fetch error', (done) => {

        const ComponentWithContext = StubRouterContext(Details, {});
        const DetailsEl = React.createElement(ComponentWithContext, {});
        const details = TestUtils.renderIntoDocument(DetailsEl);
        const target = TestUtils.findRenderedComponentWithType(details, Details);

        target.setState({
            details: {
                hydrated: true,
                fetchFailure: true
            }
        });

        const heading = TestUtils.findRenderedDOMComponentWithTag(target, 'h1');

        Code.expect(heading.getDOMNode().textContent).to.match(/Error/);
        done();
    });
});

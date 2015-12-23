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
    GroupActions: {
        getResults: function () {}
    },
    AdminStore: {},
    AdminGroupStore: {}
};
const Details = Proxyquire('../../../../../../client/pages/admin/components/admins/details', {
    '../../actions/admin': stub.Actions,
    '../../actions/admin-group': stub.GroupActions,
    '../../stores/admin': stub.AdminStore,
    '../../stores/admin-group': stub.AdminGroupStore
});


lab.experiment('Admin Admin Details', () => {

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
        stub.AdminStore.emitChange();

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

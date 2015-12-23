'use strict';
const React = require('react');
const Lab = require('lab');
const Code = require('code');
const Proxyquire = require('proxyquire');
const StubRouterContext = require('../../../../fixtures/StubRouterContext');


const lab = exports.lab = Lab.script();
const TestUtils = React.addons.TestUtils;
const stub = {
    Actions: {
        getIdentity: function () {}
    },
    UserStore: {}
};
const Details = Proxyquire('../../../../../../client/pages/admin/components/users/details', {
    '../../actions/user': stub.Actions,
    '../../stores/user': stub.UserStore
});


lab.experiment('Admin User Details', () => {

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
        stub.UserStore.emitChange();

        done();
    });


    lab.test('it handles a fetch error', (done) => {

        const ComponentWithContext = StubRouterContext(Details, {});
        const DetailsEl = React.createElement(ComponentWithContext, {});
        const details = TestUtils.renderIntoDocument(DetailsEl);
        const target = TestUtils.findRenderedComponentWithType(details, Details);

        target.setState({
            identity: {
                hydrated: true,
                fetchFailure: true
            }
        });

        const heading = TestUtils.findRenderedDOMComponentWithTag(target, 'h1');

        Code.expect(heading.getDOMNode().textContent).to.match(/Error/);
        done();
    });
});

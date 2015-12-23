'use strict';
const Code = require('code');
const Lab = require('lab');
const Proxyquire = require('proxyquire');
const React = require('react');
const StubRouterContext = require('../../../../fixtures/StubRouterContext');


const lab = exports.lab = Lab.script();
const TestUtils = React.addons.TestUtils;
const stub = {
    Actions: {}
};
const Form = Proxyquire('../../../../../../client/pages/admin/components/admins/create-new-form', {
    '../../actions/admin': stub.Actions
});
let mockProps;


lab.beforeEach((done) => {

    mockProps = {
        data: {
            hasError: {},
            help: {}
        }
    };

    done();
});


lab.experiment('Admin Admin Create New Form', () => {

    lab.test('it renders', (done) => {

        const FormWithContext = StubRouterContext(Form, {});
        const FormEl = React.createElement(FormWithContext, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        Code.expect(form).to.exist();
        done();
    });


    lab.test('it handles unmounting', (done) => {

        const container = global.document.createElement('div');
        const FormWithContext = StubRouterContext(Form, {});
        const FormEl = React.createElement(FormWithContext, mockProps);

        ReactDOM.render(FormEl, container);
        ReactDOM.unmountComponentAtNode(container);

        done();
    });


    lab.test('it replaces state when receiving new props where show is false', (done) => {

        const FormWithContext = StubRouterContext(Form, {});
        const FormEl = React.createElement(FormWithContext, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        mockProps.data.show = false;
        form.setProps(mockProps);

        Code.expect(form).to.exist();
        done();
    });


    lab.test('it focuses when receiving new props where show is true', (done) => {

        const FormWithContext = StubRouterContext(Form, {});
        const FormEl = React.createElement(FormWithContext, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const realSetTimeout = setTimeout;

        setTimeout = function (handler) {

            setTimeout = realSetTimeout;

            handler();
            done();
        };

        mockProps.data.show = true;
        form.setProps(mockProps);
    });


    lab.test('it handles a submit event', (done) => {

        stub.Actions.createNew = function () {

            done();
        };

        const FormWithContext = StubRouterContext(Form, {});
        const FormEl = React.createElement(FormWithContext, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const formTag = TestUtils.findRenderedDOMComponentWithTag(form, 'form');

        TestUtils.Simulate.submit(formTag.getDOMNode());
    });


    lab.test('it renders with success state', (done) => {

        const FormWithContext = StubRouterContext(Form, {});
        const FormEl = React.createElement(FormWithContext, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        mockProps.data.success = true;
        form.setProps(mockProps);

        const alerts = TestUtils.scryRenderedDOMComponentsWithClass(form, 'alert-success');

        Code.expect(alerts.length).to.equal(1);
        done();
    });


    lab.test('it renders with error state', (done) => {

        const FormWithContext = StubRouterContext(Form, {});
        const FormEl = React.createElement(FormWithContext, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        mockProps.data.error = 'Whoops.';
        form.setProps(mockProps);

        const alerts = TestUtils.scryRenderedDOMComponentsWithClass(form, 'alert-danger');

        Code.expect(alerts.length).to.equal(1);
        done();
    });
});

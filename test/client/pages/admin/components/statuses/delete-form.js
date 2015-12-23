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
const Form = Proxyquire('../../../../../../client/pages/admin/components/statuses/delete-form', {
    '../../actions/status': stub.Actions
});
let mockProps;
let originalConfirm;


lab.beforeEach((done) => {

    mockProps = {
        data: {
            hasError: {},
            help: {}
        }
    };

    done();
});


lab.before((done) => {

    originalConfirm = global.window.confirm;
    done();
});


lab.after((done) => {

    global.window.confirm = originalConfirm;
    done();
});


lab.experiment('Admin Status Delete Form', () => {

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


    lab.test('it prevents event propagation when confirm returns false', (done) => {

        global.window.confirm = function () {

            return false;
        };

        const FormWithContext = StubRouterContext(Form, {});
        const FormEl = React.createElement(FormWithContext, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        form.setProps({
            details: {
                _id: 'pivot-name'
            }
        });

        const buttonTag = TestUtils.findRenderedDOMComponentWithTag(form, 'button');

        TestUtils.Simulate.click(buttonTag.getDOMNode(), {
            stopPropagation: function () {

                done();
            }
        });
    });


    lab.test('it allows event propagation when confirm returns true', (done) => {

        global.window.confirm = function () {

            done();
            return true;
        };

        const FormWithContext = StubRouterContext(Form, {});
        const FormEl = React.createElement(FormWithContext, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        form.setProps({
            details: {
                _id: 'pivot-name'
            }
        });

        const buttonTag = TestUtils.findRenderedDOMComponentWithTag(form, 'button');

        TestUtils.Simulate.click(buttonTag.getDOMNode());
    });


    lab.test('it handles a submit event', (done) => {

        stub.Actions.delete = function () {

            done();
        };

        const FormWithContext = StubRouterContext(Form, {});
        const FormEl = React.createElement(FormWithContext, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        form.setProps({
            details: {
                _id: 'pivot-name'
            }
        });

        const formTag = TestUtils.findRenderedDOMComponentWithTag(form, 'form');

        TestUtils.Simulate.submit(formTag.getDOMNode());
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

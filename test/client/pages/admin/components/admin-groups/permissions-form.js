'use strict';
const Code = require('code');
const Lab = require('lab');
const Proxyquire = require('proxyquire');
const React = require('react');


const lab = exports.lab = Lab.script();
const TestUtils = React.addons.TestUtils;
const stub = {
    Actions: {}
};
const Form = Proxyquire('../../../../../../client/pages/admin/components/admin-groups/permissions-form.jsx', {
    '../../actions/admin-group': stub.Actions
});
let mockProps;


lab.beforeEach((done) => {

    mockProps = {
        details: {},
        data: {
            hasError: {},
            help: {}
        }
    };

    done();
});


lab.experiment('Admin Admin Group Permissions Form', () => {

    lab.test('it renders', (done) => {

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        Code.expect(form).to.exist();
        done();
    });


    lab.test('it handles unmounting', (done) => {

        const container = global.document.createElement('div');
        const FormEl = React.createElement(Form, mockProps);

        ReactDOM.render(FormEl, container);
        ReactDOM.unmountComponentAtNode(container);

        done();
    });


    lab.test('it updates state when receiving new props when hydrated is false', (done) => {

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        mockProps.details.hydrated = true;
        form.setProps(mockProps);

        mockProps.details.hydrated = true;
        form.setProps(mockProps);

        Code.expect(form).to.exist();
        done();
    });


    lab.test('it handles creating a new permission (via button click)', (done) => {

        mockProps.details.hydrated = true;

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const button = form.refs.newPermissionButton.getDOMNode();
        const input = form.refs.newPermission.getDOMNode();

        form.setState = function () {

            done();
        };

        TestUtils.Simulate.change(input, { target: { value: 'NEW' } });
        TestUtils.Simulate.click(button);
    });


    lab.test('it handles creating a new permission (on enter key, but not another)', (done) => {

        mockProps.details.hydrated = true;

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const input = form.refs.newPermission.getDOMNode();

        form.setState = function () {

            delete form.setState;
            done();
        };

        TestUtils.Simulate.change(input, { target: { value: 'NE' } });
        TestUtils.Simulate.keyDown(input, { key: 'W', which: 42 });

        TestUtils.Simulate.change(input, { target: { value: 'NEW' } });
        TestUtils.Simulate.keyDown(input, { key: 'Enter', which: 13 });
    });


    lab.test('it handles creating a new permission that already exists', (done) => {

        mockProps.details.hydrated = true;

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const input = form.refs.newPermission.getDOMNode();

        TestUtils.Simulate.change(input, { target: { value: 'NEW' } });
        TestUtils.Simulate.keyDown(input, { which: 13 });

        const realSetTimeout = setTimeout;
        setTimeout = function (handler) {

            setTimeout = realSetTimeout;
            handler();
            done();
        };

        TestUtils.Simulate.change(input, { target: { value: 'NEW' } });
        TestUtils.Simulate.keyDown(input, { which: 13 });
    });


    lab.test('it handles toggling a permission', (done) => {

        mockProps.details.hydrated = true;

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const input = form.refs.newPermission.getDOMNode();

        const realSetTimeout = setTimeout;
        setTimeout = function (handler) {

            done();
            setTimeout = realSetTimeout;
        };

        TestUtils.Simulate.change(input, { target: { value: 'NEW' } });
        TestUtils.Simulate.keyDown(input, { which: 13 });

        TestUtils.Simulate.change(input, { target: { value: 'ZED' } });
        TestUtils.Simulate.keyDown(input, { which: 13 });

        TestUtils.Simulate.change(input, { target: { value: 'OLD' } });
        TestUtils.Simulate.keyDown(input, { which: 13 });

        TestUtils.Simulate.change(input, { target: { value: 'zed' } });
        TestUtils.Simulate.keyDown(input, { which: 13 });

        const permissionContainer = form.refs.permissionContainer;
        const toggles = TestUtils.scryRenderedDOMComponentsWithClass(permissionContainer, 'btn-default');

        TestUtils.Simulate.change(input, { target: { value: 'NEW' } });
        TestUtils.Simulate.keyDown(input, { which: 13 });

        TestUtils.Simulate.click(toggles[0].getDOMNode());
    });


    lab.test('it handles deleting a permission', (done) => {

        mockProps.details.hydrated = true;

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const input = form.refs.newPermission.getDOMNode();

        TestUtils.Simulate.change(input, { target: { value: 'NEW' } });
        TestUtils.Simulate.keyDown(input, { which: 13 });

        const permissionContainer = form.refs.permissionContainer;
        const deletes = TestUtils.scryRenderedDOMComponentsWithClass(permissionContainer, 'btn-warning');

        TestUtils.Simulate.click(deletes[0].getDOMNode());
        done();
    });


    lab.test('it handles a submit event', (done) => {

        stub.Actions.savePermissions = function () {

            done();
        };

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const formTag = TestUtils.findRenderedDOMComponentWithTag(form, 'form');

        TestUtils.Simulate.submit(formTag.getDOMNode());
    });


    lab.test('it renders with success state', (done) => {

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        mockProps.details.hydrated = true;
        mockProps.data.success = true;
        form.setProps(mockProps);

        const alerts = TestUtils.scryRenderedDOMComponentsWithClass(form, 'alert-success');

        Code.expect(alerts.length).to.equal(1);
        done();
    });


    lab.test('it renders with error state', (done) => {

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        mockProps.details.hydrated = true;
        mockProps.data.error = 'Whoops.';
        form.setProps(mockProps);

        const alerts = TestUtils.scryRenderedDOMComponentsWithClass(form, 'alert-danger');

        Code.expect(alerts.length).to.equal(1);
        done();
    });
});

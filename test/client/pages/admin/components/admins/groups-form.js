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
const Form = Proxyquire('../../../../../../client/pages/admin/components/admins/groups-form.jsx', {
    '../../actions/admin': stub.Actions
});
let mockProps;


lab.beforeEach((done) => {

    mockProps = {
        details: {
            groups: {
                root: 'Root',
                sales: 'Sales',
                service: 'Service'
            }
        },
        data: {
            hasError: {},
            help: {}
        },
        list: {
            data: [
                { _id: 'sales', name: 'Sales' },
                { _id: 'service', name: 'Service' },
                { _id: 'root', name: 'Root' }
            ]
        }
    };

    done();
});


lab.experiment('Admin Admin Groups Form', () => {

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


    lab.test('it skips creating a new group when none selected', (done) => {

        mockProps.details.hydrated = true;

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const select = form.refs.newGroup.getDOMNode();
        const button = form.refs.newGroupButton.getDOMNode();

        form.setState = function () {

            done();
        };

        TestUtils.Simulate.change(select, { target: { value: '' } });
        TestUtils.Simulate.click(button);
    });


    lab.test('it handles creating a new group (via button click)', (done) => {

        mockProps.details.hydrated = true;

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const select = form.refs.newGroup.getDOMNode();
        const button = form.refs.newGroupButton.getDOMNode();

        form.setState = function () {

            done();
        };

        TestUtils.Simulate.change(select, { target: { value: 'sales' } });
        TestUtils.Simulate.click(button);
    });


    lab.test('it handles creating a new group that already exists', (done) => {

        mockProps.details.hydrated = true;

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const select = form.refs.newGroup.getDOMNode();
        const button = form.refs.newGroupButton.getDOMNode();

        TestUtils.Simulate.change(select, { target: { value: 'sales' } });
        TestUtils.Simulate.click(button);

        const realSetTimeout = setTimeout;
        setTimeout = function (handler) {

            setTimeout = realSetTimeout;
            handler();
            done();
        };

        TestUtils.Simulate.change(select, { target: { value: 'sales' } });
        TestUtils.Simulate.click(button);
    });


    lab.test('it handles deleting a group', (done) => {

        mockProps.details.hydrated = true;

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const select = form.refs.newGroup.getDOMNode();
        const button = form.refs.newGroupButton.getDOMNode();

        TestUtils.Simulate.change(select, { target: { value: 'service' } });
        TestUtils.Simulate.click(button);

        TestUtils.Simulate.change(select, { target: { value: 'root' } });
        TestUtils.Simulate.click(button);

        TestUtils.Simulate.change(select, { target: { value: 'sales' } });
        TestUtils.Simulate.click(button);

        const groupContainer = form.refs.groupContainer;
        const deletes = TestUtils.scryRenderedDOMComponentsWithClass(groupContainer, 'btn-warning');

        TestUtils.Simulate.click(deletes[0].getDOMNode());
        done();
    });


    lab.test('it handles a submit event', (done) => {

        stub.Actions.saveGroups = function () {

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

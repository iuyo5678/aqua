'use strict';
const React = require('react');
const Lab = require('lab');
const Code = require('code');
const Proxyquire = require('proxyquire');
const Moment = require('moment');


const lab = exports.lab = Lab.script();
const TestUtils = React.addons.TestUtils;
const stub = {
    Actions: {}
};
const Form = Proxyquire('../../../../../../client/pages/admin/components/accounts/status-form.jsx', {
    '../../actions/account': stub.Actions
});
let mockProps;


lab.beforeEach((done) => {

    mockProps = {
        details: {
            status: {
                current: {},
                log: []
            }
        },
        list: {
            data: [
                { _id: 'account-happy', name: 'Happy' },
                { _id: 'account-sad', name: 'Sad' }
            ]
        },
        data: {
            name: {},
            hasError: {},
            help: {}
        }
    };

    done();
});


lab.experiment('Admin Account Status Form', () => {

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


    lab.test('it renders when status log is undefined', (done) => {

        mockProps.details.hydrated = true;
        delete mockProps.details.status.log;

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        Code.expect(form).to.exist();
        done();
    });


    lab.test('it renders when status log has items', (done) => {

        mockProps.details.hydrated = true;
        mockProps.details.status.log = [
            {
                userCreated: {},
                moment: Moment('2014-02-14 17:39:00'),
                timeCreated: '2014-02-14 17:39:00'
            }
        ];

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        Code.expect(form).to.exist();
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


    lab.test('it handles a submit event', (done) => {

        stub.Actions.newStatus = function () {

            done();
        };

        mockProps.details.hydrated = true;

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const formTag = TestUtils.findRenderedDOMComponentWithTag(form, 'form');
        const newMenu = form.refs.newStatus;

        TestUtils.Simulate.change(newMenu.getDOMNode(), {
            target: { value: 'account-happy' }
        });
        TestUtils.Simulate.submit(formTag.getDOMNode());
    });


    lab.test('it handles a submit event (when the status is the same)', (done) => {

        mockProps.details.hydrated = true;
        mockProps.details.status.current = {
            id: 'account-happy', name: 'Happy'
        };

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);
        const formTag = TestUtils.findRenderedDOMComponentWithTag(form, 'form');
        const newMenu = form.refs.newStatus;

        const realSetTimeout = setTimeout;
        setTimeout = function (handler) {

            setTimeout = realSetTimeout;
            handler();
            done();
        };

        TestUtils.Simulate.change(newMenu.getDOMNode(), {
            target: { value: 'account-happy' }
        });
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

'use strict';
const Code = require('code');
const Lab = require('lab');
const Moment = require('moment');
const Proxyquire = require('proxyquire');
const React = require('react');


const lab = exports.lab = Lab.script();
const TestUtils = React.addons.TestUtils;
const stub = {
    Actions: {}
};
const Form = Proxyquire('../../../../../../client/pages/admin/components/accounts/note-form.jsx', {
    '../../actions/account': stub.Actions
});
let mockProps;


lab.beforeEach((done) => {

    mockProps = {
        details: {
            notes: []
        },
        data: {
            name: {},
            hasError: {},
            help: {}
        }
    };

    done();
});


lab.experiment('Admin Account Note Form', () => {

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


    lab.test('it renders when notes is undefined', (done) => {

        mockProps.details.hydrated = true;
        delete mockProps.details.notes;

        const FormEl = React.createElement(Form, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        Code.expect(form).to.exist();
        done();
    });


    lab.test('it renders when notes has items', (done) => {

        mockProps.details.hydrated = true;
        mockProps.details.notes = [
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

        stub.Actions.newNote = function () {

            done();
        };

        mockProps.details.hydrated = true;

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

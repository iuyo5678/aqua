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
const Form = Proxyquire('../../../../../../client/pages/admin/components/users/roles-form.jsx', {
    '../../actions/user': stub.Actions
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


lab.experiment('Admin User Roles Form', () => {

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


    lab.test('it handles rendering when data is hydrated', (done) => {

        mockProps.data.hydrated = true;

        const FormWithContext = StubRouterContext(Form, {});
        const FormEl = React.createElement(FormWithContext, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        Code.expect(form).to.exist();
        done();
    });


    lab.test('it handles rendering when roles data is provided', (done) => {

        mockProps.data.hydrated = true;
        mockProps.data.roles = {
            account: {
                id: '1D',
                name: 'Stimpson J. Cat'
            },
            admin: {
                id: '2D',
                name: 'Ren Hoek'
            }
        };

        const FormWithContext = StubRouterContext(Form, {});
        const FormEl = React.createElement(FormWithContext, mockProps);
        const form = TestUtils.renderIntoDocument(FormEl);

        Code.expect(form).to.exist();
        done();
    });
});

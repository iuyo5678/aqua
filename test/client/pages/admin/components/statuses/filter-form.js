'use strict';
const Code = require('code');
const Form = require('../../../../../../client/pages/admin/components/statuses/filter-form');
const Lab = require('lab');
const React = require('react');


const lab = exports.lab = Lab.script();
const TestUtils = React.addons.TestUtils;


lab.experiment('Admin Status Filter Form', () => {

    lab.test('it renders', (done) => {

        const FormEl = React.createElement(Form, {});
        const form = TestUtils.renderIntoDocument(FormEl);

        Code.expect(form).to.exist();
        done();
    });


    lab.test('it handles unmounting', (done) => {

        const container = global.document.createElement('div');
        const FormEl = React.createElement(Form, {});

        ReactDOM.render(FormEl, container);
        ReactDOM.unmountComponentAtNode(container);

        done();
    });


    lab.test('it receives new props', (done) => {

        const FormEl = React.createElement(Form, {});
        const form = TestUtils.renderIntoDocument(FormEl);

        Code.expect(form.state.limit).to.equal(20);

        form.setProps({
            query: {
                limit: 10
            }
        });

        Code.expect(form.state.limit).to.equal(10);

        done();
    });


    lab.test('it handles a menu change', (done) => {

        const FormEl = React.createElement(Form, {
            onChange: function () {

                done();
            }
        });
        const form = TestUtils.renderIntoDocument(FormEl);
        const selects = TestUtils.scryRenderedDOMComponentsWithTag(form, 'select');
        const limit = selects[selects.length - 1];

        TestUtils.Simulate.change(limit, { target: { value: 10 } });
    });


    lab.test('it handles submit on enter key, but not another key', (done) => {

        const FormEl = React.createElement(Form, {
            onChange: function () {

                done();
            }
        });
        const form = TestUtils.renderIntoDocument(FormEl);
        const formNode = form.getDOMNode();

        TestUtils.Simulate.keyDown(formNode, { key: 'a' });
        TestUtils.Simulate.keyDown(formNode, { key: 'Enter', which: 13 });
    });


    lab.test('it handles a page change', (done) => {

        const FormEl = React.createElement(Form, {
            onChange: function () {

                done();
            }
        });
        const form = TestUtils.renderIntoDocument(FormEl);

        form.changePage('2');
    });
});

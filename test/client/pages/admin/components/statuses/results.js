'use strict';
const Code = require('code');
const Lab = require('lab');
const React = require('react');
const Results = require('../../../../../../client/pages/admin/components/statuses/results');
const StubRouterContext = require('../../../../fixtures/StubRouterContext');


const lab = exports.lab = Lab.script();
const TestUtils = React.addons.TestUtils;


lab.experiment('Admin Status Results', () => {

    lab.test('it renders', (done) => {

        const ResultsEl = React.createElement(Results, {});
        const results = TestUtils.renderIntoDocument(ResultsEl);

        Code.expect(results).to.exist();
        done();
    });


    lab.test('it handles unmounting', (done) => {

        const container = global.document.createElement('div');
        const ResultsEl = React.createElement(Results, {});

        ReactDOM.render(ResultsEl, container);
        ReactDOM.unmountComponentAtNode(container);

        done();
    });


    lab.test('it renders with data', (done) => {

        const mockProps = {
            data: [{ _id: '1D' }, { _id: '2D' }]
        };
        const ResultsWithContext = StubRouterContext(Results, {});
        const ResultsEl = React.createElement(ResultsWithContext, mockProps);
        const results = TestUtils.renderIntoDocument(ResultsEl);

        Code.expect(results).to.exist();
        done();
    });
});

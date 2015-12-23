'use strict';
const Code = require('code');
const Lab = require('lab');
const NotFound = require('../../../../../../client/pages/admin/components/not-found/controller');
const React = require('react');
const StubRouterContext = require('../../../../fixtures/StubRouterContext');


const lab = exports.lab = Lab.script();
const TestUtils = React.addons.TestUtils;


lab.experiment('Login Not Found Component', () => {

    lab.test('it renders', (done) => {

        const ComponentWithContext = StubRouterContext(NotFound, {});
        const NotFoundEl = React.createElement(ComponentWithContext, {});
        const notFound = TestUtils.renderIntoDocument(NotFoundEl);

        Code.expect(notFound).to.exist();
        done();
    });


    lab.test('it handles unmounting', (done) => {

        const container = global.document.createElement('div');
        const ComponentWithContext = StubRouterContext(NotFound, {});
        const NotFoundEl = React.createElement(ComponentWithContext, {});

        ReactDOM.render(NotFoundEl, container);
        ReactDOM.unmountComponentAtNode(container);

        done();
    });
});

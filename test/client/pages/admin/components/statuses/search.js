'use strict';
const Code = require('code');
const Lab = require('lab');
const Proxyquire = require('proxyquire');
const React = require('react');
const StubRouterContext = require('../../../../fixtures/StubRouterContext');


const lab = exports.lab = Lab.script();
const TestUtils = React.addons.TestUtils;
const stub = {
    Actions: {
        getResults: function () {}
    },
    StatusStore: {}
};
const Search = Proxyquire('../../../../../../client/pages/admin/components/statuses/search', {
    '../../actions/status': stub.Actions,
    '../../stores/status': stub.StatusStore
});


lab.experiment('Admin Status Search', () => {

    lab.test('it renders', (done) => {

        const ComponentWithContext = StubRouterContext(Search, {});
        const SearchEl = React.createElement(ComponentWithContext, {});
        const search = TestUtils.renderIntoDocument(SearchEl);

        Code.expect(search).to.exist();
        done();
    });


    lab.test('it handles unmounting', (done) => {

        const container = global.document.createElement('div');
        const ComponentWithContext = StubRouterContext(Search, {});
        const SearchEl = React.createElement(ComponentWithContext, {});

        ReactDOM.render(SearchEl, container);
        ReactDOM.unmountComponentAtNode(container);

        done();
    });


    lab.test('it receives new props', (done) => {

        const ComponentWithContext = StubRouterContext(Search, {});
        const SearchEl = React.createElement(ComponentWithContext, {});
        const search = TestUtils.renderIntoDocument(SearchEl);

        search.setProps({ foo: 'bar' });

        Code.expect(search).to.exist();
        done();
    });


    lab.test('it handles a store change', (done) => {

        const ComponentWithContext = StubRouterContext(Search, {});
        const SearchEl = React.createElement(ComponentWithContext, {});

        TestUtils.renderIntoDocument(SearchEl);
        stub.StatusStore.emitChange();

        done();
    });


    lab.test('it handles a filter change (from a submit event)', (done) => {

        const ComponentWithContext = StubRouterContext(Search, {});
        const SearchEl = React.createElement(ComponentWithContext, {});
        const search = TestUtils.renderIntoDocument(SearchEl);
        const target = TestUtils.findRenderedComponentWithType(search, Search);
        const form = TestUtils.findRenderedDOMComponentWithTag(target.refs.filters, 'form');

        target.transitionTo = function () {};

        TestUtils.Simulate.submit(form.getDOMNode());

        Code.expect(search).to.exist();
        done();
    });


    lab.test('it handles a filter change (from an input event)', (done) => {

        const ComponentWithContext = StubRouterContext(Search, {});
        const SearchEl = React.createElement(ComponentWithContext, {});
        const search = TestUtils.renderIntoDocument(SearchEl);
        const target = TestUtils.findRenderedComponentWithType(search, Search);
        const selects = TestUtils.scryRenderedDOMComponentsWithTag(target, 'select');
        const limit = selects[selects.length - 1];

        target.transitionTo = function () {};

        TestUtils.Simulate.change(limit, { target: { value: 10 } });

        Code.expect(search).to.exist();
        done();
    });


    lab.test('it handles a page change', (done) => {

        const ComponentWithContext = StubRouterContext(Search, {});
        const SearchEl = React.createElement(ComponentWithContext, {});
        const search = TestUtils.renderIntoDocument(SearchEl);
        const target = TestUtils.findRenderedComponentWithType(search, Search);

        target.setState({
            results: {
                data: [],
                pages: {
                    current: 2,
                    prev: 1,
                    hasPrev: true,
                    next: 3,
                    hasNext: true,
                    total: 3
                },
                items: {
                    limit: 10,
                    begin: 11,
                    end: 20,
                    total: 30
                }
            }
        });

        const next = target.refs.paging.refs.next;

        target.transitionTo = function () {};

        TestUtils.Simulate.click(next.getDOMNode());

        Code.expect(search).to.exist();
        done();
    });


    lab.test('it handles a create new click', (done) => {

        const ComponentWithContext = StubRouterContext(Search, {});
        const SearchEl = React.createElement(ComponentWithContext, {});
        const search = TestUtils.renderIntoDocument(SearchEl);
        const target = TestUtils.findRenderedComponentWithType(search, Search);
        const createNew = target.refs.createNew;

        TestUtils.Simulate.click(createNew.getDOMNode());

        Code.expect(search).to.exist();
        done();
    });
});

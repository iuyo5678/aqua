'use strict';
const Code = require('code');
const Lab = require('lab');
const NavBar = require('../../../../../client/pages/admin/components/navbar');
const React = require('react');
const StubRouterContext = require('../../../fixtures/StubRouterContext');


const lab = exports.lab = Lab.script();
const TestUtils = React.addons.TestUtils;


lab.experiment('Admin NavBar', () => {

    lab.test('it renders', (done) => {

        const ComponentWithContext = StubRouterContext(NavBar, {});
        const NavBarEl = React.createElement(ComponentWithContext, {});
        const mainElement = TestUtils.renderIntoDocument(NavBarEl);

        Code.expect(mainElement).to.exist();
        done();
    });


    lab.test('it toggles the menu', (done) => {

        const ComponentWithContext = StubRouterContext(NavBar, {});
        const NavBarEl = React.createElement(ComponentWithContext, {});
        const mainElement = TestUtils.renderIntoDocument(NavBarEl);
        const button = TestUtils.findRenderedDOMComponentWithTag(mainElement, 'button');
        const menuDiv = TestUtils.findRenderedDOMComponentWithClass(mainElement, 'navbar-collapse');
        const menuDivNode = menuDiv.getDOMNode();

        Code.expect(menuDivNode.className).to.equal('navbar-collapse collapse');
        TestUtils.Simulate.click(button.getDOMNode());

        Code.expect(menuDivNode.className).to.equal('navbar-collapse');

        done();
    });


    lab.test('it receives new props', (done) => {

        const ComponentWithContext = StubRouterContext(NavBar, {});
        const NavBarEl = React.createElement(ComponentWithContext, {});
        const mainElement = TestUtils.renderIntoDocument(NavBarEl);

        mainElement.setProps({ foo: 'bar' });

        Code.expect(mainElement).to.exist();
        done();
    });
});

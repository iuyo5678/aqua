'use strict';
const Code = require('code');
const Footer = require('../../../../../client/pages/admin/components/footer');
const Lab = require('lab');
const React = require('react');


const lab = exports.lab = Lab.script();
const TestUtils = React.addons.TestUtils;


lab.experiment('Admin Footer', () => {

    lab.test('it renders', (done) => {

        const FooterEl = React.createElement(Footer, {});
        const footer = TestUtils.renderIntoDocument(FooterEl);

        Code.expect(footer).to.exist();
        done();
    });
});

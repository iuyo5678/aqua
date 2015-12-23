'use strict';
const Code = require('code');
const Component = require('../../../../../../client/pages/admin/components/home/controller');
const Lab = require('lab');
const React = require('react');
const ReactDOM = require('react-dom');


const lab = exports.lab = Lab.script();
const container = global.document.createElement('div');


lab.experiment('Admin Home Component', () => {

    lab.test('it renders', (done) => {

        const ComponentEl = React.createElement(Component, {});

        ReactDOM.render(ComponentEl, container, (component) => {

            Code.expect(component).to.exist();
            done();
            ReactDOM.unmountComponentAtNode(container);
        });
    });


    lab.test('it refreshes the time with interval handler', (done) => {

        const realSetInterval = setInterval;

        setInterval = function (handler, time) {

            return realSetInterval(() => {

                handler();
                setInterval = realSetInterval;
                done();
                ReactDOM.unmountComponentAtNode(container);
            });
        };

        const ComponentEl = React.createElement(Component, {});

        ReactDOM.render(ComponentEl, container);
    });
});

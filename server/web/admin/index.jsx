'use strict';
const Layout = require('../layouts/plain');
const React = require('react');


class Component extends React.Component {
    render() {

        const neck = [
            <link key="layout" rel="stylesheet" href="/public/layouts/default.min.css" />,
            <link key="page" rel="stylesheet" href="/public/pages/admin.min.css" />
        ];
        const feet = <script src="/public/pages/admin.min.js"></script>;

        return (
            <Layout
                title="Admin"
                neck={neck}
                feet={feet}>

                <div id="app-mount"></div>
            </Layout>
        );
    }
}


module.exports = Component;

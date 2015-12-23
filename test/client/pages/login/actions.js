'use strict';
const Code = require('code');
const Constants = require('../../../../client/pages/login/constants');
const Lab = require('lab');
const Proxyquire = require('proxyquire');


const lab = exports.lab = Lab.script();
const stub = {
    Fetch: function () {

        stub.Fetch.mock.apply(null, arguments);
    },
    ReturnUrlActions: {
        clearReturnUrl: function () {}
    },
    Store: {

        dispatch: function () {

            stub.Store.dispatch.mock.apply(null, arguments);
        }
    }
};
const Actions = Proxyquire('../../../../client/pages/login/actions', {
    '../../helpers/json-fetch': stub.Fetch,
    '../../actions/return-url': stub.ReturnUrlActions,
    './stores/forgot': stub.Store,
    './stores/login': stub.Store,
    './stores/logout': stub.Store,
    './stores/reset': stub.Store
});


lab.experiment('Login Actions', () => {

    lab.test('it handles forgot successfully', (done) => {

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.FORGOT) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.FORGOT_RESPONSE) {
                Code.expect(action.err).to.not.exist();
                Code.expect(action.response).to.exist();

                done();
            }
        };

        stub.Fetch.mock = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.forgot({});
    });


    lab.test('it handles forgot when xhr fails', (done) => {

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.FORGOT) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.FORGOT_RESPONSE) {
                Code.expect(action.err).to.exist();
                Code.expect(action.response).to.not.exist();

                done();
            }
        };

        stub.Fetch.mock = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('sorry pal'));
        };

        Actions.forgot({});
    });


    lab.test('it handles login successfully (redirect to returnUrl)', (done) => {

        const returnUrl = '/deep/link';
        const localStorage = global.window.localStorage;
        const windowLocation = global.window.location;

        global.window.localStorage = {
            getItem: function () {

                global.window.localStorage = localStorage;

                return returnUrl;
            }
        };

        Object.defineProperty(global.window.location, 'href', {
            configurable: true,
            set: function (value) {

                global.window.location = windowLocation;

                Code.expect(value).to.equal(returnUrl);

                done();
            }
        });

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.LOGIN) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.LOGIN_RESPONSE) {
                Code.expect(action.err).to.not.exist();
                Code.expect(action.response).to.exist();
            }
        };

        stub.Fetch.mock = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {
                user: {
                    roles: {
                        admin: {}
                    }
                }
            });
        };

        Actions.login({});
    });


    lab.test('it handles login successfully (redirect to admin)', (done) => {

        const localStorage = global.window.localStorage;
        const windowLocation = global.window.location;

        global.window.localStorage = {
            getItem: function () {

                global.window.localStorage = localStorage;

                return undefined;
            }
        };

        Object.defineProperty(global.window.location, 'href', {
            configurable: true,
            set: function (value) {

                global.window.location = windowLocation;

                Code.expect(value).to.equal('/admin');

                done();
            }
        });

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.LOGIN) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.LOGIN_RESPONSE) {
                Code.expect(action.err).to.not.exist();
                Code.expect(action.response).to.exist();
            }
        };

        stub.Fetch.mock = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {
                user: {
                    roles: {
                        admin: {}
                    }
                }
            });
        };

        Actions.login({});
    });


    lab.test('it handles login successfully (redirect to account)', (done) => {

        const localStorage = global.window.localStorage;
        const windowLocation = global.window.location;

        global.window.localStorage = {
            getItem: function () {

                global.window.localStorage = localStorage;

                return undefined;
            }
        };

        Object.defineProperty(global.window.location, 'href', {
            configurable: true,
            set: function (value) {

                global.window.location = windowLocation;

                Code.expect(value).to.equal('/account');

                done();
            }
        });

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.LOGIN) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.LOGIN_RESPONSE) {
                Code.expect(action.err).to.not.exist();
                Code.expect(action.response).to.exist();
            }
        };

        stub.Fetch.mock = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {
                user: {
                    roles: {
                        account: {}
                    }
                }
            });
        };

        Actions.login({});
    });


    lab.test('it handles login when xhr fails', (done) => {

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.LOGIN) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.LOGIN_RESPONSE) {
                Code.expect(action.err).to.exist();
                Code.expect(action.response).to.not.exist();

                done();
            }
        };

        stub.Fetch.mock = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('sorry pal'));
        };

        Actions.login({});
    });


    lab.test('it handles logout successfully', (done) => {

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.LOGOUT) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.LOGOUT_RESPONSE) {
                Code.expect(action.err).to.not.exist();
                Code.expect(action.response).to.exist();

                done();
            }
        };

        stub.Fetch.mock = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.logout({});
    });


    lab.test('it handles logout when xhr fails', (done) => {

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.LOGOUT) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.LOGOUT_RESPONSE) {
                Code.expect(action.err).to.exist();
                Code.expect(action.response).to.not.exist();

                done();
            }
        };

        stub.Fetch.mock = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('sorry pal'));
        };

        Actions.logout({});
    });


    lab.test('it handles reset successfully', (done) => {

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.RESET) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.RESET_RESPONSE) {
                Code.expect(action.err).to.not.exist();
                Code.expect(action.response).to.exist();

                done();
            }
        };

        stub.Fetch.mock = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.reset({});
    });


    lab.test('it handles reset when xhr fails', (done) => {

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.RESET) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.RESET_RESPONSE) {
                Code.expect(action.err).to.exist();
                Code.expect(action.response).to.not.exist();

                done();
            }
        };

        stub.Fetch.mock = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('sorry pal'));
        };

        Actions.reset({});
    });
});

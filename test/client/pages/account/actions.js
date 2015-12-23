'use strict';
const Code = require('code');
const Constants = require('../../../../client/pages/account/constants');
const FluxConstant = require('flux-constant');
const Lab = require('lab');
const Proxyquire = require('proxyquire');


const lab = exports.lab = Lab.script();
const ActionTypes = Constants.ActionTypes;
const stub = {
    Fetch: function () {

        stub.Fetch.guts.apply(null, arguments);
    },
    Dispatcher: {
        handleAction: function () {

            stub.Dispatcher.handleAction.guts.apply(null, arguments);
        }
    },
    MeActions: {
        saveMe: function () {}
    }
};
const Actions = Proxyquire('../../../../client/pages/account/actions', {
    'flux-dispatcher': stub.Dispatcher,
    '../../helpers/json-fetch': stub.Fetch,
    '../../actions/Me': stub.MeActions
});


lab.experiment('Account Actions', () => {

    lab.test('it handles getAccountSettings successfully', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.GET_ACCOUNT_SETTINGS_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.getAccountSettings({});
    });


    lab.test('it handles getAccountSettings when xhr fails', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.GET_ACCOUNT_SETTINGS_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('Blamo'), {});
        };

        Actions.getAccountSettings({});
    });


    lab.test('it handles saveAccountSettings successfully', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.SAVE_ACCOUNT_SETTINGS_RESPONSE) {
                Code.expect(data.success).to.be.true();
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.saveAccountSettings({});
    });


    lab.test('it handles saveAccountSettings when xhr fails', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.SAVE_ACCOUNT_SETTINGS_RESPONSE) {
                Code.expect(data.success).to.not.exist();
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('Blamo'), {});
        };

        Actions.saveAccountSettings({});
    });


    lab.test('it handles getUserSettings successfully', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.GET_USER_SETTINGS_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.getUserSettings({});
    });


    lab.test('it handles getUserSettings when xhr fails', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.GET_USER_SETTINGS_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('Blamo'), {});
        };

        Actions.getUserSettings({});
    });


    lab.test('it handles saveUserSettings successfully', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.SAVE_USER_SETTINGS_RESPONSE) {
                Code.expect(data.success).to.be.true();
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.saveUserSettings({});
    });


    lab.test('it handles saveUserSettings when xhr fails', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.SAVE_USER_SETTINGS_RESPONSE) {
                Code.expect(data.success).to.not.exist();
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('Blamo'), {});
        };

        Actions.saveUserSettings({});
    });


    lab.test('it handles savePasswordSettings successfully', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.SAVE_PASSWORD_SETTINGS_RESPONSE) {
                Code.expect(data.success).to.be.true();
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.savePasswordSettings({});
    });


    lab.test('it handles savePasswordSettings when xhr fails', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.SAVE_PASSWORD_SETTINGS_RESPONSE) {
                Code.expect(data.success).to.not.exist();
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('Blamo'), {});
        };

        Actions.savePasswordSettings({});
    });


    lab.test('it handles savePasswordSettings when passwords do not match', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.SAVE_PASSWORD_SETTINGS_RESPONSE) {
                Code.expect(data.success).to.not.exist();
                done();
            }
        };

        Actions.savePasswordSettings({
            password: 'hi',
            passwordConfirm: 'hey'
        });
    });
});

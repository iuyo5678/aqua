'use strict';
const Code = require('code');
const Constants = require('../../../../../client/pages/admin/constants/admin-group');
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
const Actions = Proxyquire('../../../../../client/pages/admin/actions/admin-group', {
    'flux-dispatcher': stub.Dispatcher,
    '../../../helpers/json-fetch': stub.Fetch
});


lab.experiment('Admin Admin Group Actions', () => {

    lab.test('it handles getResults successfully', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.GET_RESULTS_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.getResults({});
    });


    lab.test('it handles getResults when xhr fails', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.GET_RESULTS_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('Blamo'), {});
        };

        Actions.getResults({});
    });


    lab.test('it handles getDetails successfully', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.GET_DETAILS_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.getDetails({});
    });


    lab.test('it handles getDetails when xhr fails', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.GET_DETAILS_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('Blamo'), {});
        };

        Actions.getDetails({});
    });


    lab.test('it handles showCreateNew', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.SHOW_CREATE_NEW) {
                done();
            }
        };

        Actions.showCreateNew({});
    });


    lab.test('it handles hideCreateNew', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.HIDE_CREATE_NEW) {
                done();
            }
        };

        Actions.hideCreateNew({});
    });


    lab.test('it handles createNew successfully (without caller)', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.CREATE_NEW_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.createNew({});
    });


    lab.test('it handles createNew successfully (with caller)', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.CREATE_NEW_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        const mockCaller = {
            getCurrentQuery: function () {}
        };

        Actions.createNew({}, mockCaller);
    });


    lab.test('it handles createNew when xhr fails', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.CREATE_NEW_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('Blamo'), {});
        };

        Actions.createNew({});
    });


    lab.test('it handles saveDetails successfully', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.SAVE_DETAILS_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.saveDetails({});
    });


    lab.test('it handles saveDetails when xhr fails', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.SAVE_DETAILS_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('Blamo'), {});
        };

        Actions.saveDetails({});
    });


    lab.test('it handles savePermissions successfully', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.SAVE_PERMISSIONS_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.savePermissions({});
    });


    lab.test('it handles savePermissions when xhr fails', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.SAVE_PERMISSIONS_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('Blamo'), {});
        };

        Actions.savePermissions({});
    });


    lab.test('it handles delete successfully (without caller)', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.DELETE_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };


        Actions.delete({});
    });


    lab.test('it handles delete successfully (with caller)', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.DELETE_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };


        const mockCaller = {
            transitionTo: function () {}
        };

        Actions.delete({}, mockCaller);
    });


    lab.test('it handles delete when xhr fails', (done) => {

        stub.Dispatcher.handleAction.guts = function (source, type, data) {

            Code.expect(type).to.be.an.instanceOf(FluxConstant);

            if (type === ActionTypes.DELETE_RESPONSE) {
                done();
            }
        };

        stub.Fetch.guts = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(new Error('Blamo'), {});
        };

        Actions.delete({});
    });
});

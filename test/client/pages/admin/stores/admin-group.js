'use strict';
const Code = require('code');
const Constants = require('../../../../../client/pages/admin/constants/admin-group');
const Dispatcher = require('flux-dispatcher');
const Lab = require('lab');
const Store = require('../../../../../client/pages/admin/stores/admin-group');


const lab = exports.lab = Lab.script();
const ActionTypes = Constants.ActionTypes;


lab.experiment('Admin Admin Group Store', () => {

    lab.test('it returns default state', (done) => {

        Store.reset();

        const state = Store.getState();
        Code.expect(state.results).to.be.an.object();
        Code.expect(state.createNew).to.be.an.object();
        Code.expect(state.details).to.be.an.object();
        Code.expect(state.delete).to.be.an.object();

        done();
    });


    lab.test('it returns default results state', (done) => {

        Store.resetResults();

        const state = Store.getResults();
        Code.expect(state.hydrated).to.be.false();
        Code.expect(state.loading).to.be.false();
        Code.expect(state.success).to.be.false();
        Code.expect(state.error).to.equal(undefined);
        Code.expect(state.data).to.be.an.array();
        Code.expect(state.pages).to.be.an.object();
        Code.expect(state.items).to.be.an.object();

        done();
    });


    lab.test('it returns default create new state', (done) => {

        Store.resetCreateNew();

        const state = Store.getCreateNew();
        Code.expect(state.show).to.be.false();
        Code.expect(state.loading).to.be.false();
        Code.expect(state.error).to.equal(undefined);
        Code.expect(state.hasError).to.be.an.object();
        Code.expect(state.help).to.be.an.object();
        Code.expect(state._id).to.equal(undefined);
        Code.expect(state.pivot).to.equal(undefined);
        Code.expect(state.name).to.equal(undefined);

        done();
    });


    lab.test('it returns default details state', (done) => {

        Store.resetDetails();

        const state = Store.getDetails();
        Code.expect(state.hydrated).to.be.false();
        Code.expect(state.fetchFailure).to.be.false();
        Code.expect(state.loading).to.be.false();
        Code.expect(state.success).to.be.false();
        Code.expect(state.error).to.equal(undefined);
        Code.expect(state.hasError).to.be.an.object();
        Code.expect(state.help).to.be.an.object();
        Code.expect(state._id).to.equal(undefined);
        Code.expect(state.pivot).to.equal(undefined);
        Code.expect(state.name).to.equal(undefined);

        done();
    });


    lab.test('it returns default permissions state', (done) => {

        Store.resetPermissions();

        const state = Store.getPermissions();
        Code.expect(state.loading).to.be.false();
        Code.expect(state.success).to.be.false();
        Code.expect(state.error).to.equal(undefined);

        done();
    });


    lab.test('it returns default delete state', (done) => {

        Store.resetDelete();

        const state = Store.getDelete();
        Code.expect(state.loading).to.be.false();
        Code.expect(state.error).to.equal(undefined);

        done();
    });


    lab.test('it returns default delete state', (done) => {

        Store.resetDelete();

        const state = Store.getDelete();
        Code.expect(state.loading).to.be.false();
        Code.expect(state.error).to.equal(undefined);

        done();
    });


    lab.test('it handles a GET_RESULTS action', (done) => {

        Dispatcher.handleAction(ActionTypes.GET_RESULTS, {});

        const state = Store.getResults();
        Code.expect(state.loading).to.be.true();
        Code.expect(state.hydrated).to.be.false();

        done();
    });


    lab.test('it handles a GET_RESULTS_RESPONSE action', (done) => {

        Dispatcher.handleAction(ActionTypes.GET_RESULTS_RESPONSE, {});

        const state = Store.getResults();
        Code.expect(state.loading).to.be.false();
        Code.expect(state.hydrated).to.be.true();

        done();
    });


    lab.test('it handles a SHOW_CREATE_NEW action', (done) => {

        Dispatcher.handleAction(ActionTypes.SHOW_CREATE_NEW, {});

        const state = Store.getCreateNew();
        Code.expect(state.show).to.be.true();

        done();
    });


    lab.test('it handles a HIDE_CREATE_NEW action', (done) => {

        Dispatcher.handleAction(ActionTypes.HIDE_CREATE_NEW, {});

        const state = Store.getCreateNew();
        Code.expect(state.show).to.be.false();

        done();
    });


    lab.test('it handles a CREATE_NEW action', (done) => {

        Dispatcher.handleAction(ActionTypes.CREATE_NEW, {});

        const state = Store.getCreateNew();
        Code.expect(state.loading).to.be.true();

        done();
    });


    lab.test('it handles a CREATE_NEW_RESPONSE action (success)', (done) => {

        Dispatcher.handleAction(ActionTypes.CREATE_NEW_RESPONSE, {
            _id: 'group-id'
        });

        const state = Store.getCreateNew();
        Code.expect(state.loading).to.be.false();

        done();
    });


    lab.test('it handles a CREATE_NEW_RESPONSE action (failure)', (done) => {

        Dispatcher.handleAction(ActionTypes.CREATE_NEW_RESPONSE, {});

        const state = Store.getCreateNew();
        Code.expect(state.loading).to.be.false();

        done();
    });


    lab.test('it handles a GET_DETAILS action', (done) => {

        Dispatcher.handleAction(ActionTypes.GET_DETAILS, {});

        const state = Store.getDetails();
        Code.expect(state.loading).to.be.true();
        Code.expect(state.hydrated).to.be.false();
        Code.expect(state.success).to.be.false();

        done();
    });


    lab.test('it handles a GET_DETAILS_RESPONSE action', (done) => {

        Dispatcher.handleAction(ActionTypes.GET_DETAILS_RESPONSE, {
            success: true,
            fetchFailure: true,
            _id: 'name',
            name: 'Name'
        });

        const state = Store.getDetails();
        Code.expect(state.loading).to.be.false();
        Code.expect(state.hydrated).to.be.true();
        Code.expect(state.fetchFailure).to.be.true();
        Code.expect(state.success).to.be.true();
        Code.expect(state._id).to.equal('name');
        Code.expect(state.name).to.equal('Name');

        done();
    });


    lab.test('it handles a SAVE_DETAILS action', (done) => {

        Dispatcher.handleAction(ActionTypes.SAVE_DETAILS, {});

        const state = Store.getDetails();
        Code.expect(state.loading).to.be.true();

        done();
    });


    lab.test('it handles a SAVE_DETAILS_RESPONSE action (success)', (done) => {

        const realSetTimeout = setTimeout;

        setTimeout = function (handler) {

            setTimeout = realSetTimeout;

            handler();

            const state = Store.getDetails();
            Code.expect(state.loading).to.be.false();
            Code.expect(state.success).to.not.exist();

            done();
        };

        Dispatcher.handleAction(ActionTypes.SAVE_DETAILS_RESPONSE, {
            success: true
        });
    });


    lab.test('it handles a SAVE_DETAILS_RESPONSE action (failure)', (done) => {

        Dispatcher.handleAction(ActionTypes.SAVE_DETAILS_RESPONSE, {});

        const state = Store.getDetails();
        Code.expect(state.loading).to.be.false();

        done();
    });


    lab.test('it handles a SAVE_PERMISSIONS action', (done) => {

        Dispatcher.handleAction(ActionTypes.SAVE_PERMISSIONS, {});

        const state = Store.getPermissions();
        Code.expect(state.loading).to.be.true();

        done();
    });


    lab.test('it handles a SAVE_PERMISSIONS_RESPONSE action (success)', (done) => {

        const realSetTimeout = setTimeout;

        setTimeout = function (handler) {

            setTimeout = realSetTimeout;

            handler();

            const state = Store.getPermissions();
            Code.expect(state.loading).to.be.false();
            Code.expect(state.success).to.not.exist();

            done();
        };

        Dispatcher.handleAction(ActionTypes.SAVE_PERMISSIONS_RESPONSE, {
            success: true
        });
    });


    lab.test('it handles a SAVE_PERMISSIONS_RESPONSE action (failure)', (done) => {

        Dispatcher.handleAction(ActionTypes.SAVE_PERMISSIONS_RESPONSE, {});

        const state = Store.getPermissions();
        Code.expect(state.loading).to.be.false();

        done();
    });


    lab.test('it handles a DELETE action', (done) => {

        Dispatcher.handleAction(ActionTypes.DELETE, {});

        const state = Store.getDelete();
        Code.expect(state.loading).to.be.true();

        done();
    });


    lab.test('it handles a DELETE_RESPONSE action (success)', (done) => {

        Dispatcher.handleAction(ActionTypes.DELETE_RESPONSE, {
            success: true
        });

        const state = Store.getDelete();
        Code.expect(state.loading).to.be.false();

        done();
    });


    lab.test('it handles a DELETE_RESPONSE action (failure)', (done) => {

        const realSetTimeout = setTimeout;

        setTimeout = function (handler) {

            setTimeout = realSetTimeout;

            handler();

            const state = Store.getDetails();
            Code.expect(state.loading).to.be.false();
            Code.expect(state.success).to.not.exist();

            done();
        };

        Dispatcher.handleAction(ActionTypes.DELETE_RESPONSE, {
            success: false
        });
    });


    lab.test('it handles validation errors (validation keys)', (done) => {

        Store.handleValidationErrors('details', {
            validation: {
                source: 'payload',
                keys: ['name']
            },
            message: 'name is required'
        });

        const state = Store.getDetails();
        Code.expect(state.hasError.name).to.be.true();
        Code.expect(state.help.name).to.equal('name is required');

        done();
    });


    lab.test('it handles validation errors (general)', (done) => {

        Store.handleValidationErrors('details', {
            message: 'something no worky'
        });

        const state = Store.getDetails();
        Code.expect(state.error).to.equal('something no worky');

        done();
    });
});

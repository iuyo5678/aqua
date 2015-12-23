'use strict';
const Code = require('code');
const Constants = require('../../../../../client/pages/account/constants');
const Dispatcher = require('flux-dispatcher');
const Lab = require('lab');
const Store = require('../../../../client/pages/account/stores/account');


const lab = exports.lab = Lab.script();
const ActionTypes = Constants.ActionTypes;


lab.experiment('Account Account Store', () => {

    lab.test('it returns default state', (done) => {

        Store.reset();

        const state = Store.getState();
        Code.expect(state.hydrated).to.be.false();
        Code.expect(state.loading).to.be.false();
        Code.expect(state.success).to.be.false();
        Code.expect(state.error).to.equal(undefined);
        Code.expect(state.hasError).to.be.an.object();
        Code.expect(state.help).to.be.an.object();
        Code.expect(state.name).to.be.an.object();
        Code.expect(state.timeCreated).to.equal(undefined);

        done();
    });


    lab.test('it handles a GET_ACCOUNT_SETTINGS action', (done) => {

        Dispatcher.handleAction(ActionTypes.GET_ACCOUNT_SETTINGS, {});

        const state = Store.getState();
        Code.expect(state.loading).to.be.true();
        Code.expect(state.hydrated).to.be.false();

        done();
    });


    lab.test('it handles a GET_ACCOUNT_SETTINGS_RESPONSE action (success)', (done) => {

        Dispatcher.handleAction(ActionTypes.GET_ACCOUNT_SETTINGS_RESPONSE, {});

        const state = Store.getState();
        Code.expect(state.loading).to.be.false();
        Code.expect(state.hydrated).to.be.true();

        done();
    });


    lab.test('it handles a GET_ACCOUNT_SETTINGS_RESPONSE action (validation errors)', (done) => {

        Dispatcher.handleAction(ActionTypes.GET_ACCOUNT_SETTINGS_RESPONSE, {
            success: false,
            validation: {
                keys: ['name']
            },
            message: 'name is required'
        });

        const state = Store.getState();
        Code.expect(state.loading).to.be.false();
        Code.expect(state.success).to.be.false();
        Code.expect(Object.keys(state.hasError).length).to.be.above(0);
        Code.expect(Object.keys(state.help).length).to.be.above(0);

        done();
    });


    lab.test('it handles a GET_ACCOUNT_SETTINGS_RESPONSE action (other error)', (done) => {

        Dispatcher.handleAction(ActionTypes.GET_ACCOUNT_SETTINGS_RESPONSE, {
            success: false,
            message: 'something else failed'
        });

        const state = Store.getState();
        Code.expect(state.loading).to.be.false();
        Code.expect(state.success).to.be.false();
        Code.expect(state.error).to.equal('something else failed');

        done();
    });


    lab.test('it handles a SAVE_ACCOUNT_SETTINGS action', (done) => {

        Dispatcher.handleAction(ActionTypes.SAVE_ACCOUNT_SETTINGS, {});

        const state = Store.getState();
        Code.expect(state.loading).to.be.true();

        done();
    });


    lab.test('it handles a SAVE_ACCOUNT_SETTINGS_RESPONSE action (success)', (done) => {

        Dispatcher.handleAction(ActionTypes.SAVE_ACCOUNT_SETTINGS_RESPONSE, {});

        const state = Store.getState();
        Code.expect(state.loading).to.be.false();

        done();
    });


    lab.test('it sets a timeout to clear the success field after successful save', (done) => {

        const realSetTimeout = setTimeout;

        setTimeout = function (handler) {

            setTimeout = realSetTimeout;

            handler();

            const state = Store.getState();
            Code.expect(state.success).to.not.exist();

            done();
        };

        Dispatcher.handleAction(ActionTypes.SAVE_ACCOUNT_SETTINGS_RESPONSE, {
            success: true
        });
    });
});

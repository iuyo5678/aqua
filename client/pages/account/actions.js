'use strict';
const Constants = require('./constants');
const Fetch = require('../../helpers/json-fetch');
const Store = require('./store/index');


class Actions {
    static getAccountSettings(data) {

        const request = {
            method: 'GET',
            url: '/api/accounts/my',
            data,
            useAuth: true
        };

        Store.dispatch({
            type: Constants.GET_ACCOUNT_SETTINGS,
            request
        });

        Fetch(request, (err, response) => {

            Store.dispatch({
                type: Constants.GET_ACCOUNT_SETTINGS_RESPONSE,
                err,
                response
            });
        });
    }

    static saveAccountSettings(data) {

        const request = {
            method: 'PUT',
            url: '/api/accounts/my',
            data,
            useAuth: true
        };

        Store.dispatch({
            type: Constants.SAVE_ACCOUNT_SETTINGS,
            request
        });

        Fetch(request, (err, response) => {

            Store.dispatch({
                type: Constants.SAVE_ACCOUNT_SETTINGS_RESPONSE,
                err,
                response
            });

            if (!err) {
                setTimeout(Actions.hideAccountSaveSuccess, 2500);
            }
        });
    }

    static hideAccountSaveSuccess() {

        Store.dispatch({
            type: Constants.HIDE_ACCOUNT_SAVE_SUCCESS
        });
    }

    static getUserSettings(data) {

        const request = {
            method: 'GET',
            url: '/api/users/my',
            data
        };

        Store.dispatch({
            type: Constants.GET_USER_SETTINGS,
            request
        });

        Fetch(request, (err, response) => {

            Store.dispatch({
                type: Constants.GET_USER_SETTINGS_RESPONSE,
                err,
                response
            });
        });
    }

    static saveUserSettings(data) {

        const request = {
            method: 'PUT',
            url: '/api/users/my',
            data,
            useAuth: true
        };

        Store.dispatch({
            type: Constants.SAVE_USER_SETTINGS,
            request
        });

        Fetch(request, (err, response) => {

            Store.dispatch({
                type: Constants.SAVE_USER_SETTINGS_RESPONSE,
                err,
                response
            });

            if (!err) {
                setTimeout(Actions.hideUserSaveSuccess, 2500);
            }
        });
    }

    static hideUserSaveSuccess() {

        Store.dispatch({
            type: Constants.HIDE_USER_SAVE_SUCCESS
        });
    }

    static savePasswordSettings(data) {

        if (data.password !== data.passwordConfirm) {
            Store.dispatch({
                type: Constants.SAVE_PASSWORD_SETTINGS_RESPONSE,
                err: new Error('password mismatch'),
                response: {
                    message: 'Passwords do not match.'
                }
            });

            return;
        }

        delete data.passwordConfirm;

        const request = {
            method: 'PUT',
            url: '/api/users/my/password',
            data,
            useAuth: true
        };

        Store.dispatch({
            type: Constants.SAVE_PASSWORD_SETTINGS,
            request
        });

        Fetch(request, (err, response) => {

            Store.dispatch({
                type: Constants.SAVE_PASSWORD_SETTINGS_RESPONSE,
                err,
                response
            });

            if (!err) {
                setTimeout(Actions.hidePasswordSaveSuccess, 2500);
            }
        });
    }

    static hidePasswordSaveSuccess() {

        Store.dispatch({
            type: Constants.HIDE_PASSWORD_SAVE_SUCCESS
        });
    }
}


module.exports = Actions;

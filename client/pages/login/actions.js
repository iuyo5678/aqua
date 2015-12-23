/* global window */
'use strict';
const Constants = require('./constants');
const Fetch = require('../../helpers/json-fetch');
const ReturnUrlActions = require('../../actions/return-url');
const ForgotStore = require('./stores/forgot');
const LoginStore = require('./stores/login');
const LogoutStore = require('./stores/logout');
const ResetStore = require('./stores/reset');


class Actions {
    static forgot(data) {

        const request = {
            method: 'POST',
            url: '/api/login/forgot',
            data
        };

        ForgotStore.dispatch({
            type: Constants.FORGOT,
            request
        });

        Fetch(request, (err, response) => {

            ForgotStore.dispatch({
                type: Constants.FORGOT_RESPONSE,
                err,
                response
            });
        });
    }

    static login(data) {

        const request = {
            method: 'POST',
            url: '/api/login',
            data
        };

        LoginStore.dispatch({
            type: Constants.LOGIN,
            request
        });

        Fetch(request, (err, response) => {

            LoginStore.dispatch({
                type: Constants.LOGIN_RESPONSE,
                err,
                response
            });

            if (!err) {
                const returnUrl = window.localStorage.getItem('returnUrl');

                if (returnUrl) {
                    ReturnUrlActions.clearReturnUrl();
                    window.location.href = returnUrl;
                }
                else if (response.user.roles.admin) {
                    window.location.href = '/admin';
                }
                else {
                    window.location.href = '/account';
                }
            }
        });
    }

    static logout(data) {

        const request = {
            method: 'DELETE',
            url: '/api/logout',
            data,
            useAuth: true
        };

        LogoutStore.dispatch({
            type: Constants.LOGOUT,
            request
        });

        Fetch(request, (err, response) => {

            LogoutStore.dispatch({
                type: Constants.LOGOUT_RESPONSE,
                err,
                response
            });
        });
    }

    static reset(data) {

        const request = {
            method: 'POST',
            url: '/api/login/reset',
            data
        };

        ResetStore.dispatch({
            type: Constants.RESET,
            request
        });

        Fetch(request, (err, response) => {

            ResetStore.dispatch({
                type: Constants.RESET_RESPONSE,
                err,
                response
            });
        });
    }
}


module.exports = Actions;

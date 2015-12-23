/* global window */
'use strict';
const Constants = require('./constants');
const Fetch = require('../../helpers/json-fetch');
const Store = require('./store');


class Actions {
    static sendRequest(data) {

        const request = {
            method: 'POST',
            url: '/api/signup',
            data
        };

        Store.dispatch({
            type: Constants.REGISTER,
            request
        });

        Fetch(request, (err, response) => {

            Store.dispatch({
                type: Constants.REGISTER_RESPONSE,
                err,
                response
            });

            if (!err) {
                window.location.href = '/account';
            }
        });
    }
};


module.exports = Actions;

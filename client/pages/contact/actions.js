'use strict';
const Constants = require('./constants');
const Fetch = require('../../helpers/json-fetch');
const Store = require('./store');


class Actions {
    static sendMessage(data) {

        const request = {
            method: 'POST',
            url: '/api/contact',
            data
        };

        Store.dispatch({
            type: Constants.SEND_MESSAGE,
            request
        });

        Fetch(request, (err, response) => {

            Store.dispatch({
                type: Constants.SEND_MESSAGE_RESPONSE,
                err,
                response
            });
        });
    }
}


module.exports = Actions;

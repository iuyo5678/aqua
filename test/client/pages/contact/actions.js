'use strict';
const Code = require('code');
const Constants = require('../../../../client/pages/contact/constants');
const Lab = require('lab');
const Proxyquire = require('proxyquire');


const lab = exports.lab = Lab.script();
const stub = {
    Fetch: function () {

        stub.Fetch.mock.apply(null, arguments);
    },
    Store: {

        dispatch: function () {

            stub.Store.dispatch.mock.apply(null, arguments);
        }
    }
};
const Actions = Proxyquire('../../../../client/pages/contact/actions', {
    '../../helpers/json-fetch': stub.Fetch,
    './store': stub.Store
});


lab.experiment('Contact Actions', () => {

    lab.test('it handles sendMessage successfully', (done) => {

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.SEND_MESSAGE) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.SEND_MESSAGE_RESPONSE) {
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

        Actions.sendMessage({});
    });


    lab.test('it handles sendMessage when xhr fails', (done) => {

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.SEND_MESSAGE) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.SEND_MESSAGE_RESPONSE) {
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

        Actions.sendMessage({});
    });
});

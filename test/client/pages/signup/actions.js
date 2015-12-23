'use strict';
const Code = require('code');
const Constants = require('../../../../client/pages/signup/constants');
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
const Actions = Proxyquire('../../../../client/pages/signup/actions', {
    '../../helpers/json-fetch': stub.Fetch,
    './store': stub.Store
});


lab.experiment('Sign Up Actions', () => {

    lab.test('it handles sendRequest successfully', (done) => {

        const windowLocation = global.window.location;

        Object.defineProperty(global.window.location, 'href', {
            set: function () {

                global.window.location = windowLocation;

                done();
            }
        });

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.REGISTER) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.REGISTER_RESPONSE) {
                Code.expect(action.err).to.not.exist();
                Code.expect(action.response).to.exist();
            }
        };

        stub.Fetch.mock = function (options, callback) {

            Code.expect(options).to.be.an.object();
            Code.expect(callback).to.be.a.function();

            callback(null, {});
        };

        Actions.sendRequest({});
    });


    lab.test('it handles sendRequest when xhr fails', (done) => {

        stub.Store.dispatch.mock = function (action) {

            if (action.type === Constants.REGISTER) {
                Code.expect(action.request).to.exist();
            }

            if (action.type === Constants.REGISTER_RESPONSE) {
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

        Actions.sendRequest({});
    });
});

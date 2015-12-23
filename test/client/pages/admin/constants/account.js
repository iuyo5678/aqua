'use strict';
const Code = require('code');
const Constants = require('../../../../../client/pages/admin/constants/account');
const Lab = require('lab');


const lab = exports.lab = Lab.script();


lab.experiment('Admin Account Constants', () => {

    lab.test('it loads', (done) => {

        Code.expect(Constants).to.exist();
        done();
    });
});

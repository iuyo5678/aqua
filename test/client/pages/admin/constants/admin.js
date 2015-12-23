'use strict';
const Code = require('code');
const Constants = require('../../../../../client/pages/admin/constants/admin');
const Lab = require('lab');


const lab = exports.lab = Lab.script();


lab.experiment('Admin Admin Constants', () => {

    lab.test('it loads', (done) => {

        Code.expect(Constants).to.exist();
        done();
    });
});

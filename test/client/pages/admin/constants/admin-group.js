'use strict';
const Code = require('code');
const Constants = require('../../../../../client/pages/admin/constants/admin-group');
const Lab = require('lab');


const lab = exports.lab = Lab.script();


lab.experiment('Admin Admin Group Constants', () => {

    lab.test('it loads', (done) => {

        Code.expect(Constants).to.exist();
        done();
    });
});

'use strict';
const Code = require('code');
const Lab = require('lab');
const Routes = require('../../../../client/pages/admin/routes');


const lab = exports.lab = Lab.script();


lab.experiment('Admin Routes', () => {

    lab.test('it loads', (done) => {

        Code.expect(Routes).to.exist();
        done();
    });
});

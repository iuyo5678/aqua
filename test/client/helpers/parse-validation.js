'use strict';
const Code = require('code');
const Lab = require('lab');
const ParseValidation = require('../../../client/helpers/parse-validation');


const lab = exports.lab = Lab.script();


lab.experiment('Parse Validation Helper', () => {

    lab.test('it handles no validation errors', (done) => {

        const result = ParseValidation();

        Code.expect(result.error).to.not.exist();
        Code.expect(result.hasError).to.be.an.object();
        Code.expect(result.hasError).to.have.length(0);
        Code.expect(result.help).to.be.an.object();
        Code.expect(result.help).to.have.length(0);

        done();
    });


    lab.test('it handles validation errors with keys', (done) => {

        const data = {
            validation: {
                keys: ['name']
            },
            message: 'name is required'
        };
        const result = ParseValidation(data);

        Code.expect(result.error).to.not.exist();
        Code.expect(result.hasError).to.be.an.object();
        Code.expect(result.hasError.name).to.be.true();
        Code.expect(result.help).to.be.an.object();
        Code.expect(result.help.name).to.equal('name is required');

        done();
    });


    lab.test('it handles validation errors with keys (matching the because pattern)', (done) => {

        const data = {
            validation: {
                keys: ['name']
            },
            message: 'name failed because [name is required]'
        };
        const result = ParseValidation(data);

        Code.expect(result.error).to.not.exist();
        Code.expect(result.hasError).to.be.an.object();
        Code.expect(result.hasError.name).to.be.true();
        Code.expect(result.help).to.be.an.object();
        Code.expect(result.help.name).to.equal('name is required');

        done();
    });


    lab.test('it handles validation errors without keys', (done) => {

        const data = {
            validation: {},
            message: 'something else happened'
        };
        const result = ParseValidation(data);

        Code.expect(result.error).to.equal('something else happened');
        Code.expect(result.hasError).to.be.an.object();
        Code.expect(Object.keys(result.hasError).length).to.equal(0);
        Code.expect(result.help).to.be.an.object();
        Code.expect(Object.keys(result.help).length).to.equal(0);

        done();
    });
});

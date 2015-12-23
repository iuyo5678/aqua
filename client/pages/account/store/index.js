'use strict';
const Account = require('./account');
const Password = require('./password');
const Redux = require('redux');
const User = require('./user');


module.exports = Redux.createStore(
    Redux.combineReducers({
        account: Account,
        password: Password,
        user: User
    })
);

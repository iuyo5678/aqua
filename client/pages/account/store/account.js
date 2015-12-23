'use strict';
const Constants = require('../constants');
const ObjectAssign = require('object-assign');
const ParseValidation = require('../../../helpers/parse-validation');


const initialState = {
    hydrated: false,
    loading: false,
    showSaveSuccess: false,
    error: undefined,
    hasError: {},
    help: {},
    name: {
        first: '',
        middle: '',
        last: ''
    }
};
const reducer = function (state = initialState, action) {

    if (action.type === Constants.GET_ACCOUNT_SETTINGS) {
        return ObjectAssign({}, state, {
            loading: true,
            hydrated: false
        });
    }

    if (action.type === Constants.GET_ACCOUNT_SETTINGS_RESPONSE) {
        const validation = ParseValidation(action.response);

        return ObjectAssign({}, state, {
            loading: false,
            hydrated: true,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help,
            name: action.response.name
        });
    }

    if (action.type === Constants.SAVE_ACCOUNT_SETTINGS) {
        return ObjectAssign({}, state, {
            loading: true,
            name: action.request.data.name
        });
    }

    if (action.type === Constants.SAVE_ACCOUNT_SETTINGS_RESPONSE) {
        const validation = ParseValidation(action.response);

        const updatedState = {
            loading: false,
            showSaveSuccess: !action.err,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help
        };

        if (!action.err) {
            updatedState.name = action.response.name;
        }

        return ObjectAssign({}, state, updatedState);
    }

    if (action.type === Constants.HIDE_ACCOUNT_SAVE_SUCCESS) {
        return ObjectAssign({}, state, {
            showSaveSuccess: false
        });
    }

    return state;
};


module.exports = reducer;

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
    username: '',
    email: ''
};
const reducer = function (state = initialState, action) {

    if (action.type === Constants.GET_USER_SETTINGS) {
        return ObjectAssign({}, state, {
            loading: true,
            hydrated: false
        });
    }

    if (action.type === Constants.GET_USER_SETTINGS_RESPONSE) {
        const validation = ParseValidation(action.response);

        return ObjectAssign({}, state, {
            loading: false,
            hydrated: true,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help,
            username: action.response.username,
            email: action.response.email
        });
    }

    if (action.type === Constants.SAVE_USER_SETTINGS) {
        return ObjectAssign({}, state, {
            loading: true,
            username: action.request.data.username,
            email: action.request.data.email
        });
    }

    if (action.type === Constants.SAVE_USER_SETTINGS_RESPONSE) {
        const validation = ParseValidation(action.response);

        const updatedState = {
            loading: false,
            showSaveSuccess: !action.err,
            error: validation.error,
            hasError: validation.hasError,
            help: validation.help
        };

        if (!action.err) {
            updatedState.username = action.response.username;
            updatedState.email = action.response.email;
        }

        return ObjectAssign({}, state, updatedState);
    }

    if (action.type === Constants.HIDE_USER_SAVE_SUCCESS) {
        return ObjectAssign({}, state, {
            showSaveSuccess: false
        });
    }

    return state;
};


module.exports = reducer;

'use strict';
const ObjectAssign = require('object-assign');


/**
 * To be used with `onChange` handlers for form elements.
 * Usage: `onChange={LinkState.bind(this)}`
 */
module.exports = function linkState(event) {

    const data = {};

    if (event.target.name.indexOf('.') === -1) {
        data[event.target.name] = event.target.value;
        this.setState(data);
        return;
    }

    const path = event.target.name.split('.');

    data[path[0]] = ObjectAssign({}, this.state[path[0]]);

    path.reduce((memo, part, idx) => {

        if (idx === path.length - 1) {
            memo[part] = event.target.value;
        }
        else if (memo[part] === undefined || typeof memo[part] !== 'object') {
            memo[part] = {};
        }

        return memo[part];
    }, data);

    this.setState(data);
};

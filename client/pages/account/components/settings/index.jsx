'use strict';
const AccountForm = require('./account-form.jsx');
const Actions = require('../../actions');
const PasswordForm = require('./password-form.jsx');
const React = require('react');
const Store = require('../../store/index');
const UserForm = require('./user-form.jsx');


class Component extends React.Component {
    constructor(props) {

        super(props);

        Actions.getAccountSettings();
        Actions.getUserSettings();

        this.state = Store.getState();
    }

    componentDidMount() {

        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {

        this.unsubscribeStore();
    }

    onStoreChange() {

        this.setState(Store.getState());
    }

    render() {

        return (
            <section className="section-settings container">
                <h1 className="page-header">Account settings</h1>
                <div className="row">
                    <div className="col-sm-6">
                        <AccountForm {...this.state.account} />
                        <UserForm {...this.state.user} />
                        <PasswordForm {...this.state.password} />
                    </div>
                </div>
            </section>
        );
    }
}


module.exports = Component;

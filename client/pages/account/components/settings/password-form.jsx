'use strict';
const Actions = require('../../actions');
const Button = require('../../../../components/form/button.jsx');
const ControlGroup = require('../../../../components/form/control-group.jsx');
const LinkState = require('../../../../helpers/link-state');
const React = require('react');
const Spinner = require('../../../../components/form/spinner.jsx');
const TextControl = require('../../../../components/form/text-control.jsx');


const propTypes = {
    loading: React.PropTypes.bool,
    showSaveSuccess: React.PropTypes.bool,
    error: React.PropTypes.string,
    hasError: React.PropTypes.object,
    help: React.PropTypes.object,
    password: React.PropTypes.string,
    passwordConfirm: React.PropTypes.string
};


class Component extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            password: props.password,
            passwordConfirm: props.passwordConfirm
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            password: nextProps.password,
            passwordConfirm: nextProps.passwordConfirm
        });
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.savePasswordSettings({
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        });
    }

    render() {

        const alerts = [];

        if (this.props.showSaveSuccess) {
            alerts.push(<div key="success" className="alert alert-success">
                Success. New password set.
            </div>);
        }
        else if (this.props.error) {
            alerts.push(<div key="danger" className="alert alert-danger">
                {this.props.error}
            </div>);
        }

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                    <legend>Password</legend>
                    {alerts}
                    <TextControl
                        name="password"
                        type="password"
                        label="New password"
                        value={this.state.password}
                        onChange={LinkState.bind(this)}
                        hasError={this.props.hasError.password}
                        help={this.props.help.password}
                        disabled={this.props.loading}
                    />
                    <TextControl
                        name="passwordConfirm"
                        type="password"
                        label="Confirm new password"
                        value={this.state.passwordConfirm}
                        onChange={LinkState.bind(this)}
                        hasError={this.props.hasError.passwordConfirm}
                        help={this.props.help.passwordConfirm}
                        disabled={this.props.loading}
                    />
                    <ControlGroup hideLabel={true} hideHelp={true}>
                        <Button
                            type="submit"
                            inputClasses={{ 'btn-primary': true }}
                            disabled={this.props.loading}>

                            Set password
                            <Spinner
                                space="left"
                                show={this.props.loading}
                            />
                        </Button>
                    </ControlGroup>
                </fieldset>
            </form>
        );
    }
}

Component.propTypes = propTypes;


module.exports = Component;

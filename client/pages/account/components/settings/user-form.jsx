'use strict';
const Actions = require('../../actions');
const Button = require('../../../../components/form/button.jsx');
const ControlGroup = require('../../../../components/form/control-group.jsx');
const LinkState = require('../../../../helpers/link-state');
const React = require('react');
const Spinner = require('../../../../components/form/spinner.jsx');
const TextControl = require('../../../../components/form/text-control.jsx');


const propTypes = {
    hydrated: React.PropTypes.bool,
    loading: React.PropTypes.bool,
    showSaveSuccess: React.PropTypes.bool,
    error: React.PropTypes.string,
    hasError: React.PropTypes.object,
    help: React.PropTypes.object,
    username: React.PropTypes.string,
    email: React.PropTypes.string
};


class Component extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            username: props.username,
            email: props.email
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            username: nextProps.username,
            email: nextProps.email
        });
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.saveUserSettings({
            username: this.state.username,
            email: this.state.email
        });
    }

    render() {

        const alerts = [];

        if (this.props.showSaveSuccess) {
            alerts.push(<div key="success" className="alert alert-success">
                Success. Identity settings saved.
            </div>);
        }
        else if (this.props.error) {
            alerts.push(<div key="danger" className="alert alert-danger">
                {this.props.error}
            </div>);
        }

        let notice;

        if (!this.props.hydrated) {
            notice = <div className="alert alert-info">
                Loading identity data...
            </div>;
        }

        let formElements;

        if (this.props.hydrated) {
            formElements = (
                <fieldset>
                    <legend>Identity</legend>
                    {alerts}
                    <TextControl
                        name="username"
                        label="Username"
                        value={this.state.username}
                        onChange={LinkState.bind(this)}
                        hasError={this.props.hasError.username}
                        help={this.props.help.username}
                        disabled={this.props.loading}
                    />
                    <TextControl
                        name="email"
                        label="Email"
                        value={this.state.email}
                        onChange={LinkState.bind(this)}
                        hasError={this.props.hasError.email}
                        help={this.props.help.email}
                        disabled={this.props.loading}
                    />
                    <ControlGroup hideLabel={true} hideHelp={true}>
                        <Button
                            type="submit"
                            inputClasses={{ 'btn-primary': true }}
                            disabled={this.props.loading}>

                            Update identity
                            <Spinner
                                space="left"
                                show={this.props.loading}
                            />
                        </Button>
                    </ControlGroup>
                </fieldset>
            );
        }

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                {notice}
                {formElements}
            </form>
        );
    }
}

Component.propTypes = propTypes;


module.exports = Component;

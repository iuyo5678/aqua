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
    name: React.PropTypes.shape({
        first: React.PropTypes.string,
        middle: React.PropTypes.string,
        last: React.PropTypes.string
    })
};


class Component extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            name: props.name
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            name: nextProps.name
        });
    }

    handleSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.saveAccountSettings({
            name: this.state.name
        });
    }

    render() {

        let notice;

        if (!this.props.hydrated) {
            notice = <div className="alert alert-info">
                Loading contact info data...
            </div>;
        }

        const alerts = [];

        if (this.props.showSaveSuccess) {
            alerts.push(<div key="success" className="alert alert-success">
                Success. Contact info settings saved.
            </div>);
        }

        if (this.props.error) {
            alerts.push(<div key="danger" className="alert alert-danger">
                {this.props.error}
            </div>);
        }

        let formElements;

        if (this.props.hydrated) {
            formElements = (
                <fieldset>
                    <legend>Contact info</legend>
                    {alerts}
                    <TextControl
                        name="name.first"
                        label="First name"
                        value={this.state.name.first}
                        onChange={LinkState.bind(this)}
                        hasError={this.props.hasError['name.first']}
                        help={this.props.help['name.first']}
                        disabled={this.props.loading}
                    />
                    <TextControl
                        name="name.middle"
                        label="Middle name"
                        value={this.state.name.middle}
                        onChange={LinkState.bind(this)}
                        hasError={this.props.hasError['name.middle']}
                        help={this.props.help['name.middle']}
                        disabled={this.props.loading}
                    />
                    <TextControl
                        name="name.last"
                        label="Last name"
                        value={this.state.name.last}
                        onChange={LinkState.bind(this)}
                        hasError={this.props.hasError['name.last']}
                        help={this.props.help['name.last']}
                        disabled={this.props.loading}
                    />
                    <ControlGroup hideLabel={true} hideHelp={true}>
                        <Button
                            type="submit"
                            inputClasses={{ 'btn-primary': true }}
                            disabled={this.props.loading}>

                            Update contact info
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

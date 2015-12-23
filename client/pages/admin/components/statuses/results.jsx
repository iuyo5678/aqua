'use strict';
const React = require('react');
const ReactRouter = require('react-router');


const Link = ReactRouter.Link;
const defaultProps = {
    data: []
};
const propTypes = {
    data: React.PropTypes.object
};


class Component extends React.Component {
    render() {

        const rows = this.props.data.map((record) => {

            return (
                <tr key={record._id}>
                    <td>
                        <Link
                            className="btn btn-default btn-sm"
                            to={`/admin/statuses/${record._id}`}>

                            Edit
                        </Link>
                    </td>
                    <td>{record.pivot}</td>
                    <td>{record.name}</td>
                    <td className="nowrap">{record._id}</td>
                </tr>
            );
        });

        return (
            <div className="table-responsive">
                <table className="table table-striped table-results">
                    <thead>
                        <tr>
                            <th></th>
                            <th>pivot</th>
                            <th className="stretch">name</th>
                            <th>id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

Component.defaultProps = defaultProps;
Component.propTypes = propTypes;


module.exports = Component;

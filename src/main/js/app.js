"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const ReactTable = require('react-table').default;
const fetch = require('node-fetch');

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TaskExecutionList/>
        )
    }
}

class TableWithRefresh extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoRefreshRate: -1
        };

        this.setAutoRefresh = this.setAutoRefresh.bind(this);
    }

    updateTableData = () => this.table.fireFetchData();

    setAutoRefresh(event) {
        const autoRefreshRate = parseInt(event.target.value);
        this.setState({autoRefreshRate: autoRefreshRate});

        if (this.interval) {
            clearInterval(this.interval);
        }

        if (autoRefreshRate > 0) {
            this.interval = setInterval(this.updateTableData, autoRefreshRate);
            console.log("interval set for " + autoRefreshRate + "ms.");
        }
    };

    render() {
        return (
            <div>
                <div className="auto-refresh">
                    <label className="auto-refresh-label">Auto refresh:</label>
                    <select className="auto-refresh-select" value={this.state.autoRefreshRate} onChange={this.setAutoRefresh}>
                        <option value="-1">Off</option>
                        <option value="5000">5 seconds</option>
                        <option value="10000">10 seconds</option>
                        <option value="15000">15 seconds</option>
                        <option value="20000">20 seconds</option>
                    </select>
                </div>
                <ReactTable
                    {...this.props}
                    ref={(instance) => { this.table = instance; }}
                />
            </div>
        );
    }
}

class TaskExecutionList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pages: 0,
            loading: true
        };
    }

    serializeToQueryString(arrayOfFilters) {
        const str = [];
        arrayOfFilters.forEach(filter =>
            str.push(encodeURIComponent(filter.id) + "=" + encodeURIComponent(filter.value))
        );
        return str.join("&");
    }

    render() {

        const columns = [{
            Header: 'Task config name',
            accessor: 'taskConfigName'
        }, {
            Header: 'Duration',
            accessor: 'durationInSeconds',
            filterable: false
        }, {
            Header: 'Status',
            accessor: 'status',
            Filter: ({ filter, onChange }) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : ""}
                >
                    <option value="">All</option>
                    <option value="STARTED">STARTED</option>
                    <option value="SUCCESS">SUCCESS</option>
                    <option value="ERROR">ERROR</option>
                </select>
        }, {
            Header: 'Transported files',
            accessor: 'transportedFiles'
        }, {
            Header: 'Message',
            accessor: 'message'
        }, {
            Header: 'Email error sent',
            id: 'emailErrorSent',
            accessor: d => d.emailErrorSent ? "Yes" : "No",
            Filter: ({ filter, onChange }) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : ""}
                >
                    <option value="">Both</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
        }, {
            Header: 'Start date',
            accessor: 'startDate',
            filterable: false
        }, {
            Header: 'End date',
            accessor: 'endDate',
            filterable: false
        }, {
            Header: 'In progress copy detected',
            id: 'inProgressCopyDetected',
            accessor: d => d.inProgressCopyDetected ? "Yes" : "No",
            Filter: ({ filter, onChange }) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : ""}
                >
                    <option value="">Both</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
        }, {
            Header: 'nbrCheckInProgressCopy',
            accessor: 'nbrCheckInProgressCopy',
            filterable: false
        }];

        return <TableWithRefresh
            data={this.state.data}
            pages={this.state.pages}
            loading={this.state.loading}
            defaultPageSize={10}
            filterable={true}
            columns={columns}
            manual
            onFetchData={(state, instance) => {
                this.setState({loading: true});
                let uri = '/api/pageableTaskExecution?' +
                    'page=' + state.page +
                    '&size=' + state.pageSize;

                if (state.sorted.length > 0) {
                    uri += '&sort=' + state.sorted[0].id + (state.sorted[0].desc ? ',desc' : '');
                }

                if (state.filtered.length > 0) {
                    uri += '&' + this.serializeToQueryString(state.filtered);
                }

                console.log(uri);

                fetch(uri)
                    .then(res => res.json())
                    .then(json => {
                        // Update react-table
                        this.setState({
                            data: json.content,
                            pages: json.totalPages,
                            loading: false
                        })
                    })
            }}
        />
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
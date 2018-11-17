import React, {
    PureComponent
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import FlexTableRow from './flex-table-row';

import {
    SortDirection 
} from './flex-table-constants';
import naturalSort from './flex-table-util';

import './flex-table.scss';

class FlexTable extends PureComponent {

    constructor(props) {

        super(props);

        this.state = {
            rows: this.props.data.rows.content,
            sortColumn: -1,
            sortDirection: SortDirection.DIR_ASC,
        };

        this.handleSort = this.handleSort.bind(this);

    }

    componentWillReceiveProps(nextProps) {

        const {
            sortColumn, sortDirection, 
        } = this.state;

        if ((this.state.rows !== nextProps.data.rows.content)) {

            this.setState({
                rows: nextProps.data.rows.content.filter((row) => {

                    if (row) {

                        return true;

                    }

                    return false;

                }),
                sortColumn: -1,
            }, () => {

                if (sortColumn > -1) {

                    this.handleSort(sortColumn, sortDirection);

                }

            });

        }

    }

    handleSort(sortBy, sortDir) {

        const {
            rows, sortColumn, sortDirection, 
        } = this.state;
        let updatedState = {
            rows: rows.sort((a, b) => {

                return naturalSort(a[sortBy].value, b[sortBy].value);

            }),
            sortColumn: sortBy,
        };

        if (sortDir !== undefined) {

            updatedState.sortDirection = sortDir;

        } else if (sortBy !== sortColumn) {

            updatedState.sortDirection = SortDirection.DIR_ASC;

        } else {

            updatedState.sortDirection = sortDirection === SortDirection.DIR_ASC ? SortDirection.DIR_DESC : SortDirection.DIR_ASC;

        }

        if (updatedState.sortDirection === SortDirection.DIR_DESC) {

            updatedState.rows = updatedState.rows.reverse();

        }

        this.setState(updatedState);

    }

    maybeRenderRows() {

        const {
            data, 
        } = this.props;
        const {
            rows, 
        } = this.state;
        // let rows = data.rows.content;

        if (rows !== undefined) {

            return rows.map((row, i) => {

                if (row) {

                    return (
                        <FlexTableRow
                            key={i}
                            className={rows.className}
                            columns={data.columns}
                            data={row}
                        />
                    );

                }

                return null;

            });

        }

        return (
            <div className="flex-table__row--no-data">
                {data.rows.noDataMessage !== undefined ? data.rows.noDataMessage : 'No Data'}
            </div>
        );

    }

    renderFromChildren() {

        const {
            children, className, 
        } = this.props;
        const flexTableClasses = cx('flex-table', className);

        return (
            <div className={flexTableClasses}>
                {children}
            </div>
        );

    }

    renderFromData() {

        const {
            className, data, 
        } = this.props;
        const flexTableClasses = cx('flex-table', className);

        return (
            <div className={flexTableClasses}>
                <FlexTableRow
                    data={data}
                    handleSort={this.handleSort}
                    isHeaderRow
                    sortColumn={this.state.sortColumn}
                    sortDirection={this.state.sortDirection}
                />
                {this.maybeRenderRows()}
            </div>
        );

    }

    render() {

        return this.props.data !== undefined ? this.renderFromData() : this.renderFromChildren();

    }

}

FlexTable.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    className: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
    data: PropTypes.object,
};

export default FlexTable;

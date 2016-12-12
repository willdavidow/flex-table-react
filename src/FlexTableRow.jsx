import React, { PropTypes } from 'react';
import cx from 'classnames';

import FlexTableCell from './FlexTableCell';

import { SortDirection } from './FlexTableConstants';

class FlexTableRow extends React.Component {
    maybeRenderRowData() {
        const { columns, data, handleSort, isHeaderRow, sortColumn, sortDirection } = this.props;

        let rowData;

        switch (isHeaderRow) {
            case true:
                rowData = data.columns.content;
            break;

            default:
                rowData = data;
        }

        return rowData.map((cell, i) => {
            let props = {
                key: i,
                col: i,
                colName: isHeaderRow ? cell.value : columns.content[i].value,
                data: cell,
                isHeaderRow,
                sortable: cell.sortable
            };

            if (isHeaderRow) {
                if (cell.sortable && handleSort !== undefined && typeof handleSort === 'function') {
                    props.className = {
                        'flex-table__cell--header': isHeaderRow,
                        'flex-table__cell--sort': cell.sortable,
                        'flex-table__cell--sort-asc': cell.sortable && i === sortColumn && sortDirection === SortDirection.DIR_ASC,
                        'flex-table__cell--sort-desc': cell.sortable && i === sortColumn && sortDirection === SortDirection.DIR_DESC
                    };

                    props.handleSort = () => {
                        handleSort(i);
                    };

                    props.sortable = true;
                }
            }

            return <FlexTableCell {...props} />;
        });
    }

    renderFromChildren() {
        const { children, className, isHeaderRow } = this.props;
        const flexTableRowClasses = cx('flex-table__row', className, {
            'flex-table__row--header': isHeaderRow
        });

        return (
            <div className={flexTableRowClasses}>
                {children}
            </div>
        );
    }

    renderFromData() {
        const { className, isHeaderRow } = this.props;
        const flexTableRowClasses = cx('flex-table__row', className, {
            'flex-table__row--header': isHeaderRow
        });

        return (
            <div className={flexTableRowClasses}>
                {this.maybeRenderRowData()}
            </div>
        );
    }

    render() {
        return this.props.data !== undefined ? this.renderFromData() : this.renderFromChildren();
    }
}

FlexTableRow.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    className: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    columns: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    handleSort: PropTypes.func,
    isHeaderRow: PropTypes.bool,
    sortColumn: PropTypes.number,
    sortDirection: PropTypes.number
};

export default FlexTableRow;

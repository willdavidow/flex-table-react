import React, {
    PureComponent
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import FlexTableContent from './flex-table-content';

class FlexTableCell extends PureComponent {

    constructor() {

        super();

        this.handleSort = this.handleSort.bind(this);

    }

    handleSort() {

        const {
            handleSort, sortable, 
        } = this.props;

        if (sortable) {

            handleSort();

        }

    }

    renderFromChildren() {

        const {
            className, colName, 
        } = this.props;
        const flexTableCellClasses = cx('flex-table__cell', className);

        let props = {
            className: flexTableCellClasses,
        };

        if (colName !== undefined) {

            props['data-col-name'] = colName;

        }

        return (
            <div {...props}>
                {this.props.children}
            </div>
        );

    }

    renderCellData() {

        const {
            data, isHeaderRow, 
        } = this.props;

        return (
            <FlexTableContent isHeaderRow={isHeaderRow}>
                {data.render !== undefined ? data.render : data.value}
            </FlexTableContent>
        );

    }

    renderFromData() {

        const {
            className, colName, isHeaderRow, 
        } = this.props;

        let props = {
            className: cx('flex-table__cell', className, {
                'flex-table__cell--header': isHeaderRow,
            }),
        };

        if (colName !== undefined) {

            props['data-col-name'] = colName;

        }

        return (
            <div {...props} onClick={this.handleSort}>
                {this.renderCellData()}
            </div>
        );

    }

    render() {

        return this.props.data !== undefined ? this.renderFromData() : this.renderFromChildren();

    }

}

FlexTableCell.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
    ]),
    className: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
    colName: PropTypes.string,
    data: PropTypes.object,
    handleSort: PropTypes.func,
    isHeaderRow: PropTypes.bool,
    sortable: PropTypes.bool,
};

export default FlexTableCell;

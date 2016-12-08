import React, { PropTypes } from 'react';
import cx from 'classnames';

import 'styles/components/FlexTable.scss';

const SORT_DIR_ASC = 1;
const SORT_DIR_DESC = -1;

// Natural Sort Function, Credit: https://github.com/Bill4Time/javascript-natural-sort
function naturalSort (a, b) {
	"use strict";
	var re = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
		sre = /(^[ ]*|[ ]*$)/g,
		dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
		hre = /^0x[0-9a-f]+$/i,
		ore = /^0/,
		i = function(s) { return naturalSort.insensitive && ('' + s).toLowerCase() || '' + s; },
		// convert all to strings strip whitespace
		x = i(a).replace(sre, '') || '',
		y = i(b).replace(sre, '') || '',
		// chunk/tokenize
		xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
		yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
		// numeric, hex or date detection
		xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && x.match(dre) && Date.parse(x)),
		yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
		oFxNcL, oFyNcL;
	// first try and sort Hex codes or Dates
	if (yD) {
		if ( xD < yD ) { return -1; }
		else if ( xD > yD ) { return 1; }
	}
	// natural sorting through split numeric strings and default strings
	for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
		// find floats not starting with '0', string or 0 if not defined (Clint Priest)
		oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
		oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
		// handle numeric vs string comparison - number < string - (Kyle Adams)
		if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
		// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
		else if (typeof oFxNcL !== typeof oFyNcL) {
			oFxNcL += '';
			oFyNcL += '';
		}
		if (oFxNcL < oFyNcL) { return -1; }
		if (oFxNcL > oFyNcL) { return 1; }
	}
	return 0;
};

export class FlexTableContent extends React.Component {
    render() {
        const { children, className, isHeaderRow } = this.props;
        const flexTableContentClasses = cx('flex-table__content', className, {
            'flex-table__content--header': isHeaderRow
        });

        return (
            <div className={flexTableContentClasses}>
                {children}
            </div>
        )
    }
};

export class FlexTableCell extends React.Component {
    constructor(props, context) {
        super();

        this.state = {
            sortDirection: 0
        };

        this.handleSort = this.handleSort.bind(this);
    }

    handleSort() {
        const { handleSort, sortable } = this.props;
        const { sortDirection } = this.state;
        let sortDir;

        if (sortable) {
            switch (sortDirection) {
                case SORT_DIR_ASC:
                    sortDir = SORT_DIR_DESC;
                    this.setState({
                        sortDirection: SORT_DIR_DESC
                    });
                break;

                case SORT_DIR_DESC:
                    sortDir = SORT_DIR_ASC;
                    this.setState({
                        sortDirection: SORT_DIR_ASC
                    });
                break;

                default:
                    sortDir = SORT_DIR_ASC;
                    this.setState({
                        sortDirection: SORT_DIR_ASC
                    });
            }

            handleSort(sortDir);
        }
    }

    renderFromChildren() {
        const { className, colName } = this.props;
        const flexTableCellClasses = cx('flex-table__cell', className);

        let props = {
            className: flexTableCellClasses
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
        const { data, isHeaderRow } = this.props;

        return (
            <FlexTableContent isHeaderRow={isHeaderRow}>
                {data.render !== undefined ? data.render : data.value}
            </FlexTableContent>
        );
    }

    renderFromData() {
        const { className, colName, column, isHeaderRow, sortable, sortColumn } = this.props;
        const { sortDirection } = this.state;

        let props = {
            className: cx('flex-table__cell', {
                'flex-table__cell--header': isHeaderRow,
                'flex-table__cell--sort': sortable,
                'flex-table__cell--sort-asc': column === sortColumn && sortable && sortDirection === SORT_DIR_ASC,
                'flex-table__cell--sort-desc': column === sortColumn && sortable && sortDirection === SORT_DIR_DESC
            })
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
};

export class FlexTableRow extends React.Component {
    constructor(props, context) {
        super();
    }

    maybeRenderRowData() {
        const { cols, data, handleSort, isHeaderRow, sortColumn } = this.props;
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
                column: i,
                colName: isHeaderRow ? cell.value : cols[i].value,
                data: cell,
                isHeaderRow,
                sortable: cell.sortable,
                sortColumn
            };

            if (isHeaderRow) {

                if (cell.sortable && handleSort !== undefined && typeof handleSort === 'function') {
                    props.handleSort = (sortDirection) => {
                        handleSort(i, sortDirection);
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
        )
    }

    renderFromData() {
        const { className, isHeaderRow, data } = this.props;
        const flexTableRowClasses = cx('flex-table__row', className, {
            'flex-table__row--header': isHeaderRow
        });

        return (
            <div className={flexTableRowClasses}>
                {this.maybeRenderRowData()}
            </div>
        )
    }

    render() {
        return this.props.data !== undefined ? this.renderFromData() : this.renderFromChildren();;
    }
};

export class FlexTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            data: this.props.data,
            rows: this.props.data.rows.content,
            sortColumn: -1
        };

        this.handleSort = this.handleSort.bind(this);
    }

    handleSort(sortBy, sortDirection) {
        const { rows, sortColumn } = this.state;

        let sortedRows = rows.sort((a, b) => {
            return naturalSort(a[sortBy].value, b[sortBy].value);
        });

        if (sortDirection === SORT_DIR_DESC) {
            sortedRows = sortedRows.reverse();
        }

        this.setState({
            rows: sortedRows,
            sortColumn: sortBy
        });
    }

    renderFromChildren() {
        const { children, className } = this.props;
        const flexTableClasses = cx('flex-table', className);

        return (
            <div className={flexTableClasses}>
                {children}
            </div>
        )
    }

    maybeRenderRows() {
        const { data, rows } = this.state;

        if (rows.length) {
            return rows.map((row, i) => {
                if (row) {
                    return (
                        <FlexTableRow
                            key={i}
                            className={rows.className}
                            cols={data.columns.content}
                            data={row} />
                    );
                }
            });
        }

        return (
            <div className="flex-table__row--no-data">
                {data.rows.noDataMessage !== undefined ? data.rows.noDataMessage : "No Data"}
            </div>
        );
    }

    renderFromData() {
        const { className, data } = this.props;
        const flexTableClasses = cx('flex-table', className);

        return (
            <div className={flexTableClasses}>
                <FlexTableRow
                    data={data}
                    handleSort={this.handleSort}
                    isHeaderRow={true}
                    sortColumn={this.state.sortColumn} />
                {this.maybeRenderRows()}
            </div>
        );
    }

    render() {
        return this.props.data !== undefined ? this.renderFromData() : this.renderFromChildren();
    }
};

export default FlexTable;

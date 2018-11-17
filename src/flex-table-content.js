import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const FlexTableContent = ({
    children,
    className,
    isHeaderRow, 
}) => (
    <div
        className={cx('flex-table__content', className, {
            'flex-table__content--header': isHeaderRow,
        })}
    >
        {children}
    </div>
);

FlexTableContent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
    ]),
    className: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
    isHeaderRow: PropTypes.bool,
};

export default FlexTableContent;

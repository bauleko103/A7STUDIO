import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    onPageChange: null,
};

function Pagination(props) {
    const { pagination, onPageChange } = props;
    const { currentPage, totalPage } = pagination;


    function handlePageChange(newPage) {
        if (onPageChange) {
            onPageChange(newPage);
        }
    }

    return (
        <div className='pagination pagination-pages'>
            {currentPage > 1 && (
                <button
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    P R E V
                </button>
            )}
            {currentPage <= 1 && (
                <button
                    disabled={true}
                >
                    &emsp;
                    &emsp;
                </button>
            )}
            <Typography>
                {currentPage > 1 && (
                    <button
                        className='button-page-number'
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        {currentPage - 1}
                    </button>
                )}
                &nbsp;&nbsp;
                <button>
                    {currentPage}
                </button >&nbsp;&nbsp;
                {currentPage < totalPage && (
                    <button
                        className='button-page-number'
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        {currentPage + 1}
                    </button>
                )}
            </Typography>
            {currentPage < totalPage && (
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    N E X T
                </button>
            )}
            {currentPage >= totalPage && (
                <button
                    disabled={true}
                >
                    &emsp;
                    &emsp;
                </button>
            )}

        </div>
    );
}

export default Pagination;
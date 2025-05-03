import './PaginationInput.scss';
import ChevronRightIcon from '../../icons/material/ChevronRightIcon';
import ChevronLeftIcon from '../../icons/material/ChevronLeftIcon';

type Props = {
    currentPage: number;
    totalPages: number;
    resultsPerPage: number;
    onChange: (page: number, resultsPerPage: number) => void;
}

export default function PaginationInput({currentPage, totalPages, resultsPerPage, onChange}: Props) {

    const onPageChange = (page: number) => {
        onChange(page, resultsPerPage);
    };

    const onResultsPerPageChange = (resultsPerPage: number) => {
        onChange(currentPage, resultsPerPage);
    };

    const pages: number[] = [];
    if (totalPages > 2) {
        for (let i: number = Math.max(1, currentPage - 4); i < Math.min(totalPages - 1, currentPage + 3); i++) {
            pages.push(i + 1);
        }
    }

    return (
            <div className="pagination-input__container">
                <div className="pagination-input__option-container">
                    <label>View</label>
                    <input
                            className="pagination-input__option"
                            type="number"
                            min={10}
                            max={100}
                            value={resultsPerPage}
                            onChange={(e) => onResultsPerPageChange(parseInt(e.target.value))}/>
                </div>

                <div className="pagination-input__option-container">
                    {totalPages > 1 && (
                            <>
                                <label>Page</label>
                                <button className={`pagination-input__page-button pagination-input__next-prev-button`}
                                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}>
                                    <ChevronLeftIcon/>
                                </button>
                                <button className={`pagination-input__page-button${currentPage === 1 ? ' disabled' : ''}`}
                                        onClick={() => onPageChange(1)}>{1}</button>
                                {pages.map((page) => (
                                        <button
                                                key={page}
                                                className={`pagination-input__page-button${currentPage === page ? ' disabled' : ''}`}
                                                onClick={() => onPageChange(page)}>{page}</button>
                                ))}
                                <button
                                        className={`pagination-input__page-button${currentPage === totalPages ? ' disabled' : ''}`}
                                        onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                                <button className={`pagination-input__page-button pagination-input__next-prev-button`}
                                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}>
                                    <ChevronRightIcon/>
                                </button>
                            </>
                    )}
                </div>
            </div>
    );
}
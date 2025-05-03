import './PageControls.scss';
import PaginationInput from '../../inputs/PaginationInput/PaginationInput';
import {scrollToTop} from '@app/utils';
import DoubleArrowUpIcon from '../../icons/material/DoubleArrowUpIcon';

export function PageControls({
                                 bottom = false,
                                 totalPages,
                                 currentPage,
                                 resultsPerPage,
                                 onPageChange,
                                 onResultsPerPageChange,
                             }: {
    bottom?: boolean;
    totalPages: number;
    currentPage: number;
    resultsPerPage: number;
    onPageChange: (page: number) => void;
    onResultsPerPageChange: (resultsPerPage: number) => void;
}) {
    const onChange = (page: number, resultsPerPage: number) => {
        onPageChange(page);
        onResultsPerPageChange(resultsPerPage);
    };
    return (
            <div className="page-controls">
                <PaginationInput
                        currentPage={currentPage}
                        totalPages={totalPages}
                        resultsPerPage={resultsPerPage}
                        onChange={onChange}
                />
                {bottom && (
                        <button className="page-controls__to-top" onClick={scrollToTop}>
                            <DoubleArrowUpIcon/>
                        </button>
                )}
            </div>
    );
}
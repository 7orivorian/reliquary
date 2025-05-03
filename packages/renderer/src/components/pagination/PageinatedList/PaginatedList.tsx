import './PaginatedList.scss';
import {usePreferences} from '../../../context/PreferenceContext';
import {PageControls} from '../PageControls/PageControls';
import {ReactNode} from 'react';

type Props = {
    totalResults: number;
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    children: ReactNode;
};

export default function PaginatedList({
                                          totalResults,
                                          totalPages,
                                          currentPage,
                                          setCurrentPage,
                                          children,
                                      }: Props) {
    const {preferences, setSearchResultsPerPage} = usePreferences();

    return (
            <div className="paginated-list">
                <p className="paginated-list__header">{totalResults} Results</p>
                <PageControls
                        totalPages={totalPages}
                        currentPage={currentPage}
                        resultsPerPage={preferences.searchResultsPerPage}
                        onPageChange={setCurrentPage}
                        onResultsPerPageChange={setSearchResultsPerPage}
                />
                <div className="paginated-list__cards">
                    {children}
                </div>
                {totalResults > preferences.searchResultsPerPage && preferences.searchResultsPerPage >= 15 && (
                        <PageControls
                                bottom={true}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                resultsPerPage={preferences.searchResultsPerPage}
                                onPageChange={setCurrentPage}
                                onResultsPerPageChange={setSearchResultsPerPage}
                        />
                )}
            </div>
    );
}
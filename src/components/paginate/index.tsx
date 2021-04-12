import * as React from 'react';
import { ReactElement, useState } from 'react';
import PagerCalculations from '../../helpers/PagerCalculations';
import useStyles from './paginate.style';

export interface Props {
    data: Array<ReactElement>;
    pageSize?: number;
}

const Paginate = ({ data, pageSize = 5 }: Props): React.ReactElement | null => {
    if (!data) {
        return null;
    }

    const pagesCount = PagerCalculations.pagesCount(data.length, pageSize);
    const stylesClasses = useStyles();
    const [currentPage, setCurrentPage] = useState(1);

    const renderList = () => {
        return data.map((element, index) =>
            PagerCalculations.canDisplayElement(index, currentPage, pageSize) ? element : null,
        );
    };

    const goToPage = (index: number) => {
        setCurrentPage(index);
    };

    const setPrevPage = () => {
        const prevPage = currentPage - 1;

        if (prevPage < 1) {
            return;
        }

        goToPage(prevPage);
    };

    const setNextPage = () => {
        const nextPage = currentPage + 1;

        if (nextPage > pagesCount) {
            return;
        }

        goToPage(nextPage);
    };

    const renderPaginationButtons = () => {
        const buttons: Array<ReactElement> = [];

        for (let i = 1; i <= pagesCount; i++) {
            buttons.push(
                <li className={i === currentPage ? stylesClasses.active : ''}>
                    <button onClick={() => goToPage(i)}>{i}</button>
                </li>,
            );
        }

        return (
            <ul className={`krp__pagination-list ${stylesClasses.pagination}`}>
                <li>
                    <button onClick={setPrevPage}>prev</button>
                </li>
                {buttons}
                <li>
                    <button onClick={setNextPage}>next</button>
                </li>
            </ul>
        );
    };

    return (
        <div className={'krp'}>
            <div className={'krp__list'}>{renderList()}</div>
            <div className={'krp__pagination'}>{renderPaginationButtons()}</div>
        </div>
    );
};

export default Paginate;

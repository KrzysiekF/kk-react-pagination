import { SET_PAGE, SET_PAGES_COUNT } from './types';

export function setPageAction(page, pagerName) {
    return {
        type: SET_PAGE,
        name: pagerName,
        payload: { currentPage: page }
    };
}

export function setPagesCountAction(count, pagerName) {
    return {
        type: SET_PAGES_COUNT,
        name: pagerName,
        payload: { pagesCount: count }
    };
}
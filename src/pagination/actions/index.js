import { SET_PAGE, SET_PAGES_COUNT, SET_DATA } from './types';

export function setPageAction(page, pagerName) {
  return {
    type: SET_PAGE,
    name: pagerName,
    payload: { currentPage: page },
  };
}

export function setPagesCountAction(count, pagerName) {
  return {
    type: SET_PAGES_COUNT,
    name: pagerName,
    payload: { pagesCount: count },
  };
}

export function setDataAction(data, page, pagerName) {
  return {
    type: SET_DATA,
    name: pagerName,
    payload: { 
      [`page-${page}`]: data,
    },
  };
}

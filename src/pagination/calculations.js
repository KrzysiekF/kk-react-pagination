class PagerCalc {
  static pagesCount(elementsCount, pageSize) {
    return Math.ceil(elementsCount / pageSize);
  }

  static calcStartRange(currentPage, pageSize) {
    return (currentPage - 1) * pageSize + 1;
  }

  static calcEndRange(currentPage, pageSize) {
    return currentPage * pageSize;
  }

  static canDisplayElement(key, currentPage, pageSize) {
    return (key + 1) >= this.calcStartRange(currentPage, pageSize) &&
        (key + 1) <= this.calcEndRange(currentPage, pageSize);
  }
}

export default PagerCalc;

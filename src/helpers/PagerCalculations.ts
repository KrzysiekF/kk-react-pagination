class PagerCalculations {
    static pagesCount(elementsCount: number, pageSize: number): number {
        return Math.ceil(elementsCount / pageSize);
    }

    static calcStartRange(currentPage: number, pageSize: number): number {
        return (currentPage - 1) * pageSize + 1;
    }

    static calcEndRange(currentPage: number, pageSize: number): number {
        return currentPage * pageSize;
    }

    static canDisplayElement(index: number, currentPage: number, pageSize: number): boolean {
        return (
            index + 1 >= this.calcStartRange(currentPage, pageSize) &&
            index + 1 <= this.calcEndRange(currentPage, pageSize)
        );
    }
}

export default PagerCalculations;

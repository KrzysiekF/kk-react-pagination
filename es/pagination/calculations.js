function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PagerCalc = function () {
    function PagerCalc() {
        _classCallCheck(this, PagerCalc);
    }

    PagerCalc.pagesCount = function pagesCount(elementsCount, pageSize) {
        return Math.ceil(elementsCount / pageSize);
    };

    PagerCalc.calcStartRange = function calcStartRange(currentPage, pageSize) {
        return (currentPage - 1) * pageSize + 1;
    };

    PagerCalc.calcEndRange = function calcEndRange(currentPage, pageSize) {
        return currentPage * pageSize;
    };

    PagerCalc.canDisplayElement = function canDisplayElement(key, currentPage, pageSize) {
        return key + 1 >= this.calcStartRange(currentPage, pageSize) && key + 1 <= this.calcEndRange(currentPage, pageSize);
    };

    return PagerCalc;
}();

export default PagerCalc;
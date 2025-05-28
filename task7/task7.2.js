
/**
 * @param {string} date
 * @return {number}
 */
var dayOfYear = function (date) {
    const currentDate = new Date(date);
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

    const diffInMilliseconds = currentDate - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;

    return Math.floor(diffInMilliseconds / oneDay) + 1;
};
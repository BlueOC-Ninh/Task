/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    const result = []
    function chunkArr(arr, depth) {
        for (let val of arr) {
            if (Array.isArray(val) && depth < n)
                chunkArr(val, depth + 1)
            else {
                result.push(val)
            }
        }
        return result
    }

    return chunkArr(arr, 0)
};
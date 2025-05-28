/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function (arr, size) {
    if (!Array.isArray(arr) || JSON.stringify(arr).length < 2 || JSON.stringify(arr).length > (10 ** 5))
        return []

    if (size < 1 || size > arr.length + 1)
        return []


    const result = []

    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size))
    }

    return result
};
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {
    const arr = [...arr1];

    for (let i = 0; i < arr2.length; i++) {
        let isFounded = false

        for (j = 0; j < arr.length; j++) {
            if (arr[j].id === arr2[i].id) {
                arr[j] = { ...arr[j], ...arr2[i] }
                isFounded = true;
                break;
            }

        }

        if (!isFounded)
            arr.push(arr2[i])
    }

    return arr;
};
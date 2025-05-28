/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function (obj) {
    if (typeof obj !== 'object' || obj === null)
        return obj;

    if (Array.isArray(obj)) {
        const result = [];
        for (let i = 0; i < obj.length; i++) {
            const val = compactObject(obj[i]);
            if (val) result.push(val);
        }
        return result;
    } else {
        for (const key in obj) {
            const val = compactObject(obj[key]);
            if (!val) {
                delete obj[key];
            } else {
                obj[key] = val;
            }
        }
        return obj;
    }
};
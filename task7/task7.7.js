/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if (!digits.length) return [];

    const data = {
        2: ["a", "b", "c"],
        3: ["d", "e", "f"],
        4: ["g", "h", "i"],
        5: ["j", "k", "l"],
        6: ["m", "n", "o"],
        7: ["p", "q", "r", "s"],
        8: ["t", "u", "v"],
        9: ["w", "x", "y", "z"],
    };

    let result = [''];

    for (const digit of digits) {
        const letters = data[digit];
        const temp = [];
        for (const prefix of result) {
            for (const letter of letters) {
                temp.push(prefix + letter);
            }
        }
        result = temp;
    }

    return result;
};

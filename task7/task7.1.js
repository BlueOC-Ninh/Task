/**
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function (emails) {
    let totalDifferenceEmail = [];

    function formatEmail(email) {
        if (email.length > 100 || email.length < 1) return;

        const parts = email.split("@");
        if (parts.length !== 2) return;
        const [local, domain] = parts;

        if (local.trim().length === 0 || local.startsWith("+")) return;

        if (!domain.endsWith(".com") || domain.length < 4) return;

        const formatLocal = [];
        for (let letter of local) {
            if (letter === "+") break;
            if (letter !== ".") formatLocal.push(letter);
        }

        return `${formatLocal.join("")}@${domain}`;
    }

    emails.forEach((item) => {
        let email = formatEmail(item);
        if (!totalDifferenceEmail.includes(email))
            totalDifferenceEmail.push(email);
    });

    return totalDifferenceEmail.length;
};

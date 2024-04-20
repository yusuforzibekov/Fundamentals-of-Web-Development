const { promises } = require('fs');

async function checkIfFileExist(path) {
    return !!(await promises.stat(path).catch(e => false));
}

module.exports = { checkIfFileExist };
